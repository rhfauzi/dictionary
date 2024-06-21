/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react'
import { Card, Row, Col, Radio } from 'antd'
import { Spacer, Text, TextArea } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { ICArrowLeft } from 'src/assets'
import styled from 'styled-components'
import { If, Then } from 'react-if';
import { DebounceSelect } from 'src/components'
import SectionButton from './section/SectionButton'
import SectionSidebarList from './section/SectionSidebarList'
import { ConfirmSubmit, ConfirmSuccessSubmit } from './section/alerts'
import { dataQuestions } from './dummyData'
import SelectWithCheckbox from './components/selectCheckbox'
import SelectStars from './components/selectStars'

const JobAnalysis = () => {
  const router = useRouter()
  const [questionStep, setQuestionStep] = useState(1)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const [dataSelected, setDataSelected] = useState<any>({})
  const [fieldData, setFieldData] = useState<any>([])

  useEffect(() => {
    const payload = localStorage.getItem('job_analysis') ?? '';
    const prevData = payload !== '' ? JSON.parse(payload) : {};
    const step = prevData?.step ?? 1
    setQuestionStep(step)
    setDataSelected(dataQuestions[step - 1] ?? {})

    if (prevData?.payload?.length > 0) {
      const data = prevData?.payload ?? []
      setFieldData(data)
    } else {
      const data = []
      dataQuestions.forEach((item: any, index: number) => {
        if (item?.data?.length < 1) {
          data.push({ id: index + 1, value: null, label: null })
        } else {
          const subData = []
          item.data.forEach((_, idx: number) => {
            subData.push({ id: idx + 1, value: null, label: null })
          })
          data.push(subData)
        }
      })
      localStorage.setItem('job_analysis', JSON.stringify({ payload: data, step }))
      setFieldData(data)
    }
  }, [])

  const handleUpdateInputData = (value: any, index: number) => {
    const step = questionStep - 1
    const payload = [...fieldData];
    if (payload[step] && payload[step][index]) {
      payload[step][index] = {
        ...payload[step][index],
        value,
        label: dataSelected?.title ?? '',
      }
    }
    setFieldData(payload)
    localStorage.setItem('job_analysis', JSON.stringify({ payload, step: questionStep }))
  }

  const handleSubmitQuestion = () => {
    console.log('handleSubmitQuestion', fieldData)
    // localStorage.removeItem('job_analysis')
    setIsSuccessSubmit(true)
  }

  return (
    <div style={{ height: '85vh' }}>
    <Spacer size={20} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row align="middle" justify="space-between">
          <Row align="middle">
            <ICArrowLeft
              onClick={() => router.push('/organization-development/job-analysis-and-evaluation')}
              style={{ cursor: 'pointer' }}
            />
            <Text variant="headingLarge" style={{ fontWeight: 'bold' }}>Job Analysis</Text>
          </Row>
        </Row>
      </Card>

      <Spacer size={20}/>
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={8}>
          <SectionSidebarList
            dataQuestions={dataQuestions ?? []}
            questionStep={questionStep}
            handleChange={(step: number) => {
              if (step > 0 && step <= dataQuestions?.length) {
                setQuestionStep(step)
                setDataSelected(dataQuestions?.[step - 1])
                localStorage.setItem('job_analysis', JSON.stringify({ payload: fieldData, step }))
              }
            }}
          />
        </Col>

        <Col xs={24} xl={16}>
          <QuestionCard>
            <RowCustom>
              <div style={{ width: '100%' }}>
                <Col span={24} style={{ display: 'flex' }}>
                  <div style={{ width: '35px' }}>
                    <QuestionText variant="headingLarge">{questionStep}.</QuestionText>
                  </div>
                  <div style={{ width: 'calc(100% - 35px)' }}>
                    <QuestionText variant="headingLarge">
                      {dataSelected?.questionEng} {!dataSelected?.require && (<span style={{ fontWeight: '400', fontSize: '20px' }}>(Optional)</span>)}
                    </QuestionText>
                    <QuestionText variant="headingLarge" style={{ fontStyle: 'italic' }}>
                      {dataSelected?.questionInd} {!dataSelected?.require && (<span style={{ fontWeight: '400', fontSize: '20px' }}>(Optional)</span>)}
                    </QuestionText>
                  </div>
                </Col>

                <Col span={24}>
                  <Spacer size={20} />
                  <If condition={dataSelected?.data?.length > 0}>
                    <Then>
                    {dataSelected?.data?.map((item: any, index: number) => {
                      const datas = fieldData[questionStep - 1][index]

                      let selectStarsvalue = datas?.value
                      if (datas?.value === null || datas?.value?.length <= 0) {
                        selectStarsvalue = item?.options.map((el: any) => ({ ...el, rank: 0, checked: false })) ?? []
                      }

                      return (
                        <div
                          key={index}
                          style={{
                            width: item?.labelEng ? 'calc(100% - 50px)' : '100%',
                            marginBottom: '20px',
                            marginLeft: item?.labelEng ? '35px' : '0px',
                          }}
                        >
                        {item?.labelEng && (
                          <div style={{ fontWeight: '600', fontSize: '14px', color: '#444444' }}>
                            {index + 1} {item?.labelEng} {item?.require && (<span>(Optional)</span>)}
                          </div>
                        )}
                        {item?.labelInd && (
                          <div
                            style={{
                              fontWeight: '600',
                              fontSize: '14px',
                              color: '#444444',
                              marginLeft: '13px',
                              marginBottom: '10px',
                              fontStyle: 'italic',
                            }}
                          >
                            {item?.labelInd} {item?.require && (<span>(Optional)</span>)}
                          </div>
                        )}

                        <If condition={item?.type === 'select'}>
                          <Then>
                            <DebounceSelect
                              placeholder={'Select'}
                              type="select"
                              label=""
                              allowClear={false}
                              onChange={(val: any) => {
                                handleUpdateInputData(val?.label, index)
                              }}
                              options={item?.options}
                              value={datas?.value}
                              style={{ width: '100%', height: '38px', paddingTop: '4px' }}
                            />
                          </Then>
                        </If>
                        <If condition={item?.type === 'input'}>
                          <Then>
                            <DebounceSelect
                              placeholder={'Type here...'}
                              type="input"
                              label=""
                              allowClear={false}
                              onChange={(e: any) => {
                                handleUpdateInputData(e?.target?.value, index)
                              }}
                              value={datas?.value}
                              style={{ width: '100%', height: '38px', paddingTop: '4px', marginTop: '10px' }}
                            />
                          </Then>
                        </If>
                        <If condition={item?.type === 'textarea'}>
                          <Then>
                            <TextArea
                              rows={4}
                              title=""
                              label=""
                              onChange={(e: any) => {
                                handleUpdateInputData(e?.target?.value, index)
                              }}
                              value={datas?.value}
                            />
                          </Then>
                        </If>
                        <If condition={item?.type === 'radio'}>
                          <Then>
                            <Radio.Group
                              style={{ marginLeft: '50px' }}
                              onChange={(e: any) => {
                                handleUpdateInputData(e?.target?.value, index)
                              }}
                              value={datas?.value}
                            >
                              <Radio value={'Yes'}>Yes</Radio>
                              <Radio value={'No'}>No</Radio>
                            </Radio.Group>
                          </Then>
                        </If>
                        <If condition={item?.type === 'selectCheckbox'}>
                          <Then>
                            <SelectWithCheckbox
                              options={item?.options ?? []}
                              checkedList={datas?.value ?? []}
                              handleChangeValue={(val) => {
                                handleUpdateInputData(val, index)
                              }}
                            />
                          </Then>
                        </If>
                        <If condition={item?.type === 'selectStars'}>
                          <Then>
                            <SelectStars
                              options={item?.options ?? []}
                              value={selectStarsvalue}
                              handleChangeValue={(val) => {
                                handleUpdateInputData(val, index)
                              }}
                            />
                          </Then>
                        </If>
                        </div>)
                    })}
                    </Then>
                  </If>
                </Col>
              </div>
              <Col span={24}>
                <Spacer size={20} />
                <SectionButton
                  step={questionStep}
                  handleChange={(_: string, step: number) => {
                    if (step > 0 && step <= dataQuestions?.length) {
                      setQuestionStep(step)
                      setDataSelected(dataQuestions?.[step - 1])

                      localStorage.setItem('job_analysis', JSON.stringify({ payload: fieldData, step }))
                    }

                    if (step > dataQuestions?.length) {
                      setIsSubmit(true)
                    }
                  }}
                />
              </Col>
            </RowCustom>
          </QuestionCard>
        </Col>
      </Row>

      <ConfirmSubmit
        open={isSubmit}
        closable={false}
        maskClosable={false}
        onClose={() => setIsSubmit(false)}
        onSubmit={() => {
          setIsSubmit(false)
          handleSubmitQuestion()
        }}
      />

      <ConfirmSuccessSubmit
        open={isSuccessSubmit}
        closable={false}
        maskClosable={false}
        onClose={() => setIsSuccessSubmit(false)}
      />
    </div>
  )
}

export default JobAnalysis

const QuestionCard = styled(Card)`
  border-radius: 8px;
  min-height: 180px;
`

const QuestionText = styled(Text)`
  font-weight: 400;
  font-size: 20px;
  color: #444444;
`

const RowCustom = styled(Row)`
.slide-up, .slide-down {
  overflow:hidden;
}
.slide-up > div, .slide-down > div {
  transform: translateY(-100%);
  transition: .4s ease-in-out;
}
.slide-down > div {            
  transform: translateY(0);
}
` as any