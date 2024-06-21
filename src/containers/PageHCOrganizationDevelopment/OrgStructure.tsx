import { useContext, useEffect, useRef, useState } from 'react'

import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Row,
  Select,
  Switch,
} from 'antd'
import { useRouter } from 'next/router'

import { Spacer, Text } from 'pink-lava-ui'
import { ICArrowLeft } from 'src/assets'

import { OrganizationStructureAPI } from 'src/api/organization-structure'

import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  Panel,
  getNodesBounds,
  getRectOfNodes,
  getTransformForBounds,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow'

import styles from './Components/StructureOrganization.module.css'
import styled from 'styled-components'

import {
  CloseCircleOutlined,
  DownOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  HistoryOutlined,
  PrinterOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import Image from 'next/image'
import ReactToPrint from 'react-to-print'
import { FilterLegalEntityAPI } from 'src/api/filters/company'
import { FilterCountryAPI } from 'src/api/filters/country'
import { FiltersDepartmentAPI } from 'src/api/filters/department'
import { FiltersDivisionAPI } from 'src/api/filters/division'
import { FilterEmployeeAPI } from 'src/api/filters/employee'
import { FiltersJobAPI } from 'src/api/filters/job'
import { COLORS } from 'src/const/COLORS'
import Tag from './Components/Tag'
import { defaultEdgeOptions } from './Components/types/edge'
import { nodeTypes } from './Components/types/node'

import dagre from '@dagrejs/dagre'

import { toPng } from 'html-to-image'
import { StructureOrgContext } from 'src/contexts/StructureOrgContext'
import { Loader } from 'src/components'

const nodeWidth = 200
const nodeHeight = 100

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  if (nodes) {
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
    })
  }

  if (edges) {
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })
  }

  dagre.layout(dagreGraph)

  if (nodes) {
    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      node.targetPosition = isHorizontal ? 'left' : 'top'
      node.sourcePosition = isHorizontal ? 'right' : 'bottom'

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      }

      return node
    })
  }

  return { nodes, edges }
}

const OrgStructure = () => {
  const { Option } = Select
  const router = useRouter()
  const { id } = router.query

  const contentRef = useRef()
  const { getNodes } = useReactFlow()

  const { isEditStructure, setEditStructure } = useContext(StructureOrgContext)

  const [initialNodes, setInitialNodes] = useState<any>([])
  const [initialEdges, setInitialEdges] = useState<any>([])
  const [isDownloadMode, setDownloadMode] = useState<boolean>(false)
  // const [isEditStructure, setEditStructure] = useState<boolean>(false)
  const [date, setDate] = useState<any>(moment().format('DD MMMM YYYY'))
  const [loading, setLoading] = useState<boolean>(false)

  const [count, setCount] = useState<any>({})
  const [filter, setFilter] = useState<any>({
    country: null,
    entity: null,
    division: null,
    department: null,
    job: null,
    employee: id ? Number(id) : null,
  })
  const [filterLabel, setFilterLabel] = useState<any>({
    department: '',
    country: '',
    entity: '',
    division: '',
    job: '',
  })
  const [searchEmployee, SetSearchEmployee] = useState<string>('')
  const { employee, country, entity, division, department, job } = filter

  const imageWidthPNG = 1024
  const imageHeightPNG = 768

  function downloadPng(dataUrl) {
    console.log('dataUrl', dataUrl)
    const linkImagePng = document.createElement('a')
    linkImagePng.setAttribute('download', 'organization-structure.png')
    linkImagePng.setAttribute('href', dataUrl)
    linkImagePng.click()
    setDownloadMode(false)
  }

  const downloadImage = () => {
    setDownloadMode(true)
    setTimeout(() => {
      const nodesBounds = getNodesBounds(getNodes())
      const transform = getTransformForBounds(nodesBounds, imageWidthPNG, imageHeightPNG, 0, 1)
      toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
        backgroundColor: COLORS.white,
        width: imageWidthPNG,
        height: imageHeightPNG,
        style: {
          width: `${imageWidthPNG}`,
          height: `${imageHeightPNG}`,
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }).then(downloadPng)
    }, 100)
  }

  /**
   * @description
   * Fetch filters employee api from epc
   */
  const { data: DataEm, refetch: refetchEmployee } = FilterEmployeeAPI?.hooks?.GetList({
    onSuccess(e) {
      setLoading(false)
    },
    search: searchEmployee,
  })
  const DataEmployee = DataEm?.data

  /**
   * @description
   * Fetch filters department api
   */
  const { data: DataDepartment } = FiltersDepartmentAPI?.hooks?.GetList({
    onSuccess: (e: any) => {},
  })
  const RemoveDuplicateDataDepart: any[] = [
    ...new Map(DataDepartment?.data?.map((item) => [item['id'], item])).values(),
  ]
  const DataDepart = RemoveDuplicateDataDepart?.map((item) => {
    return { value: item?.id, label: item?.department_name }
  })

  /**
   * @description
   * Fetch filters division api
   */
  const { data: DataDiv } = FiltersDivisionAPI?.hooks?.GetList({ onSuccess: (e: any) => {} })
  const RemoveDuplicateDataDiv: any[] = [
    ...new Map(DataDiv?.data?.map((item) => [item['id'], item])).values(),
  ]
  const DataDivision = RemoveDuplicateDataDiv?.map((item) => {
    return { value: item?.id, label: item?.division_name }
  })

  /**
   * @description
   * Fetch filters country api from epc
   */
  const { data: DataCntry } = FilterCountryAPI?.hooks?.GetList({ onSuccess: (e: any) => {} })
  const DataCountry = DataCntry?.data?.map((item) => {
    return { value: item?.code, label: item?.name }
  })

  /**
   * @description
   * Fetch filters company api from epc
   */
  const { data: DataEntity } = FilterLegalEntityAPI?.hooks?.GetList({ onSuccess: (e: any) => {} })
  const DataLegalEntity = DataEntity?.data?.map((item) => {
    return { value: item?.code, label: item?.name }
  })

  /**
   * @description
   * Fetch filters job api
   */
  const { data: DataJ } = FiltersJobAPI?.hooks?.GetList({ onSuccess: (e: any) => {} })
  const RemoveDuplicateDataJ: any[] = [
    ...new Map(DataJ?.data?.map((item) => [item['id'], item])).values(),
  ]
  const DataJob = RemoveDuplicateDataJ?.map((item) => {
    return { value: item?.id, label: item?.job_name }
  })

  const onFilterHandler = (fieldName: string, id) => {
    let data = []
    if (fieldName === 'department') {
      data = DataDepart
    } else if (fieldName === 'division') {
      data = DataDivision
    } else if (fieldName === 'job') {
      data = DataJob
    } else if (fieldName === 'country') {
      data = DataCountry
    } else if (fieldName === 'company') {
      data = DataLegalEntity
    } else if (fieldName === 'employee') {
      data = DataEmployee
    }

    if (data) {
      const convertLabel = data.find((f) => f.value === id)
      setFilter((prevState) => ({ ...prevState, [fieldName]: id }))
      setFilterLabel((prevState) => ({ ...prevState, [fieldName]: convertLabel?.label }))
    }
  }

  /**
   * @description
   * fetching get list data
   */
  const {
    data: dataOrganizationStructure,
    refetch,
    isFetching,
  } = OrganizationStructureAPI?.hooks?.GetList({
    employee_id: employee ?? null,
    department_id: department,
    division_id: division,
    job_id: job,
    country_id: country,
    company_id: entity,
    onSuccess: (e: any) => {
      setLoading(false)
    },
  })

  const [isSearch, setIsSearch] = useState<boolean>(false)
  // Filter `option.label` match the user type `input`
  const filterOption = (input?: string, option?: { label?: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input?.toLowerCase())
  /**
   * @description
   * Logic search smart
   */
  useEffect(() => {
    setIsSearch(true)
    refetch()
  }, [employee, country, entity, job, department, division])

  useEffect(() => {
    if (searchEmployee?.length === 0 || searchEmployee?.length > 2) {
      setIsSearch(true)
      refetchEmployee()
    }
  }, [searchEmployee])

  const onClearFilter = () => {
    setFilter((prev) => ({
      ...prev,
      country: null,
      entity: null,
      department: null,
      division: null,
      job: null,
    }))
  }

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <ReactToPrint
          trigger={() => {
            return (
              <a href="#">
                <PrinterOutlined /> Print Preview
              </a>
            )
          }}
          content={() => contentRef.current}
          pageStyle="@page { size: A4 landscape; display: flex; flex-direction: column; align-self: center; justify-content: center; align-items: center; }"
        />
      ),
    },
    {
      key: '1',
      label: (
        <a
          href="#"
          onClick={() => {
            setEditStructure(false)
            downloadImage()
          }}
        >
          <FileImageOutlined /> Download PNG
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href="#" onClick={() => {}}>
          <FilePdfOutlined /> Download PDF
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a href="#" onClick={() => {}}>
          <FilePdfOutlined /> Download Testing
        </a>
      ),
    },
  ]

  // const myContent =
  //   typeof document !== 'undefined'
  //     ? document.querySelector('.react-flow__viewport')?.innerHTML
  //     : null

  useEffect(() => {
    let summary = { current: 0, vacant: 0, mt: 0 }
    const getEmployees = (employee: any) => {
      let child = []
      if (employee) {
        return employee
          .map((em: any) => {
            if (em.child && em.child.length) {
              child = [...child, ...em.child]
            }
            if (!em?.employee_name && !em?.is_management_trainee) {
              summary['vacant'] += 1
            } else if (!em?.is_management_trainee) {
              summary['current'] += 1
            } else {
              summary['mt'] += 1
            }
            let edgesEmployee = {
              id: `e${em.parent_id.toString()}-${em.id.toString()}`,
              source: `${em.parent_id.toString()}`,
              target: `${em.id.toString()}`,
              type: 'smoothstep',
              // animated: true
            }
            let nodesEmployee = {
              id: em.id.toString(),
              type: isDownloadMode ? 'print' : 'child',
              data: em,
              position: { x: 0, y: 0 },
              className: styles.baseCustomNodes,
            }
            return { nodesEmployee, edgesEmployee }
          })
          .concat(child.length ? getEmployees(child) : child)
      }
    }

    setCount(summary)
    const results = getEmployees(dataOrganizationStructure?.data)
    setInitialNodes(results?.map((result: any, _) => result.nodesEmployee))
    setInitialEdges(results?.map((result: any, _) => result.edgesEmployee))
    setNodes(results?.map((result: any, _) => result.nodesEmployee))
    setEdges(results?.map((result: any, _) => result.edgesEmployee))
  }, [dataOrganizationStructure, isDownloadMode])

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges,
  )

  const [nodes, setNodes] = useNodesState(layoutedNodes)
  const [edges, setEdges] = useEdgesState(layoutedEdges)

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  return (
    <>
      <div style={{ height: '85vh' }}>
        {isDownloadMode ? (
          <div
            style={{
              background: 'black',
              opacity: 0.7,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
              zIndex: 999999,
            }}
          >
            <Loader />
          </div>
        ) : (
          <></>
        )}
        <Card style={{ borderRadius: 20, flex: 1 }}>
          <Row align="middle" justify="space-between">
            <Row align="middle">
              <ICArrowLeft onClick={() => router.back()} style={{ cursor: 'pointer' }} />
              <Text variant="headingLarge">Organization Structure</Text>
              <Divider type="vertical" style={{ height: '2rem' }} />
              <Text variant="label" color="grey.regular">
                Last upadate on 5 February 2024, 09.21
              </Text>
            </Row>
            <Row>
              <div
                style={{
                  backgroundColor: COLORS.blue.regular,
                  padding: '0.5rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  borderRadius: '2rem',
                }}
              >
                <CustomDropdown menu={{ items }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none' }}>
                    <Row>
                      <Text style={{ color: COLORS.white }}>Export</Text>
                      <Spacer size={10} />
                      <DownOutlined />
                    </Row>
                  </a>
                </CustomDropdown>
              </div>
            </Row>
          </Row>
          <Spacer size={20} />
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
              <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
                Search
              </Text>
              <StyledSelect
                showSearch
                allowClear
                searchValue={searchEmployee}
                value={employee}
                placeholder="e.g. Name"
                optionFilterProp="children"
                filterOption={filterOption}
                onSearch={(e: any) => {
                  if (e !== undefined) {
                    SetSearchEmployee(e)
                  }
                }}
                onChange={(e: string) => onFilterHandler('employee', e)}
                optionLabelProp="label"
                dropdownStyle={{ minWidth: '25rem' }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Row align="middle" justify="center">
                      <Button
                        type="text"
                        onClick={() =>
                          router.push({
                            pathname: '/organization-development/org-structure/search',
                            query: { search: searchEmployee },
                          })
                        }
                        style={{ color: COLORS.blue.regular, fontWeight: 'bold', margin: '0.5rem' }}
                      >
                        See All
                      </Button>
                    </Row>
                  </>
                )}
              >
                {DataEmployee?.map((item) => (
                  <Option
                    value={item.id}
                    label={item?.employee_name ? item?.employee_name : 'Vacant'}
                    style={{ width: '25rem !important' }}
                  >
                    <Row justify="space-between">
                      <Row align="middle">
                        <SearchOutlined style={{ color: COLORS.grey.light }} />
                        <Spacer size={10} />
                        <Text style={{ fontSize: '0.8rem' }}>
                          {item?.employee_name ? item?.employee_name : 'Vacant'}
                        </Text>
                        <Divider type="vertical" style={{ height: '1rem' }} />
                        <Text variant="label" color="grey.regular" style={{ fontSize: '0.8rem' }}>
                          {truncateText(item.job_title, 30)}
                        </Text>
                      </Row>
                      <Row
                        style={{
                          width: 20,
                          height: 20,
                          overflow: 'hidden',
                          borderRadius: 100,
                          alignSelf: 'center',
                        }}
                      >
                        <Image
                          unoptimized
                          loader={() => item?.image_url ?? '/hc/images/vacant-default.png'}
                          src={item?.image_url ?? '/hc/images/vacant-default.png'}
                          alt=""
                          width={30}
                          height={30}
                        />
                      </Row>
                    </Row>
                  </Option>
                ))}
              </StyledSelect>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
              <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
                Country
              </Text>
              <StyledSelect
                allowClear
                value={country}
                placeholder="e.g. Indonesia"
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={(e: string) => onFilterHandler('country', e)}
                options={DataCountry}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
              <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
                Legal Entity
              </Text>
              <StyledSelect
                allowClear
                value={entity}
                placeholder="e.g KSNI"
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={(e: string) => onFilterHandler('company', e)}
                options={DataLegalEntity}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
              <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
                Division
              </Text>
              <StyledSelect
                allowClear
                value={division}
                placeholder="e.g IT Global"
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={(e: string) => onFilterHandler('division', e)}
                options={DataDivision}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
              <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
                Department
              </Text>
              <StyledSelect
                allowClear
                value={department}
                placeholder="IT Global"
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={(e: string) => onFilterHandler('department', e)}
                options={DataDepart}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
              <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
                Title
              </Text>
              <StyledSelect
                allowClear
                value={job}
                placeholder="IT"
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={(e: string) => onFilterHandler('job', e)}
                options={DataJob}
              />
            </Col>
          </Row>
          <Spacer size={10} />
          {(country || entity || department || division || job) && (
            <Row justify="start" align="middle" style={{ flex: 1 }}>
              <Button
                type="text"
                style={{ color: COLORS.blue.regular, fontWeight: 'bold' }}
                onClick={onClearFilter}
              >
                Clear All Filter
              </Button>
              {country && (
                <Tag
                  value={filterLabel.country}
                  onClear={() => setFilter((prev) => ({ ...prev, country: null }))}
                />
              )}
              {entity && (
                <Tag
                  value={filterLabel.entity}
                  onClear={() => setFilter((prev) => ({ ...prev, entity: null }))}
                />
              )}
              {division && (
                <Tag
                  value={filterLabel.division}
                  onClear={() => setFilter((prev) => ({ ...prev, division: null }))}
                />
              )}
              {department && (
                <Tag
                  value={filterLabel.department}
                  onClear={() => setFilter((prev) => ({ ...prev, department: null }))}
                />
              )}
              {job && (
                <Tag
                  value={filterLabel.job}
                  onClear={() => setFilter((prev) => ({ ...prev, job: null }))}
                />
              )}
            </Row>
          )}
        </Card>
        <Spacer style={{ flex: 1, height: '64vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            minZoom={0.1}
            defaultViewport={{ x: 0, y: 0, zoom: 0.1 }}
          >
            <Background gap={25} />
            <MiniMap />
            <Controls showZoom={false} showInteractive={false} />

            <Panel position="bottom-center">
              <Row>
                <Row align="middle">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: COLORS.blue.regular,
                    }}
                  />
                  <Spacer size={5} />
                  <Text variant="label" style={{ fontSize: '0.7rem' }}>
                    Current: {count.current || '-'}
                  </Text>
                </Row>
                <Spacer size={20} />
                <Row align="middle">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: COLORS.green.darker,
                    }}
                  />
                  <Spacer size={5} />
                  <Text variant="label" style={{ fontSize: '0.7rem' }}>
                    MT: {count.mt || '-'}
                  </Text>
                </Row>
                <Spacer size={20} />
                <Row align="middle">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: COLORS.red.regular,
                    }}
                  />
                  <Spacer size={5} />
                  <Text variant="label" style={{ fontSize: '0.7rem' }}>
                    Vacant: {count.vacant || '-'}
                  </Text>
                </Row>
              </Row>
            </Panel>

            <Panel position="top-right">
              <Row>
                <div onClick={() => setEditStructure(!isEditStructure)}>
                  <Row
                    style={{
                      background: isEditStructure ? COLORS.white : COLORS.blue.regular,
                      padding: '0.4rem 1rem',
                      borderRadius: '1rem',
                      boxShadow: `box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;`,
                      cursor: 'pointer',
                      border: `${isEditStructure ? `1px solid ${COLORS.blue.regular}` : ``}`,
                    }}
                  >
                    {isEditStructure ? (
                      <CloseCircleOutlined
                        style={{ color: isEditStructure ? COLORS.blue.regular : COLORS.white }}
                      />
                    ) : (
                      <SettingOutlined
                        style={{ color: isEditStructure ? COLORS.blue.regular : COLORS.white }}
                      />
                    )}
                    <Spacer size={10} />
                    <Text style={{ color: isEditStructure ? COLORS.blue.regular : COLORS.white }}>
                      Edit Structure
                    </Text>
                  </Row>
                </div>
                <Spacer size={10} />
                <Spacer
                  style={{
                    background: COLORS.blue.regular,
                    padding: '0.4rem 1rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;`,
                  }}
                  onClick={() => setEditStructure(!isEditStructure)}
                >
                  <HistoryOutlined style={{ color: COLORS.white }} />
                </Spacer>
              </Row>
            </Panel>
          </ReactFlow>
        </Spacer>
      </div>
    </>
  )
}

export default OrgStructure

const StyledSelect = styled(Select)`
  && {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;

    .ant-select-dropdown {
      width: 25rem !important;
    }
  }
`

const CustomDropdown = styled(Dropdown)`
  svg {
    color: white;
  }
`
