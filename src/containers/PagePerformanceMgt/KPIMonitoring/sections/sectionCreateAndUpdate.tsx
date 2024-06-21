/* eslint-disable no-use-before-define */
import { Modal, Tooltip } from 'antd'
import { Table } from 'pink-lava-ui'
import { COLORS } from 'src/const/COLORS'
import { useKPIMonitoringContext } from '../states'

export default function SectionCreateAndUpdate() {
  const {
    state: { showModal, dataForm, confirm, disableButton },
    handler: { handleModal, handleDataForm, handleConfirm, handleDisableButton, handleModalStatus },
  } = useKPIMonitoringContext()

  const data = [
    {
      name: '>100%',
      rating: 'A',
      flag: COLORS.blue.regular,
      definition: 'Star Performer',
      hav: 'High',
    },
    {
      name: '97.50%-100%',
      rating: 'B',
      flag: COLORS.green.dark,
      definition: 'High Performer',
      hav: 'High',
    },
    {
      name: '95%-97.50%',
      rating: 'C',
      flag: COLORS.green.light,
      definition: 'Moderate Performer',
      hav: 'Moderate',
    },
    {
      name: '90%-94.99%',
      rating: 'D',
      flag: COLORS.cheese.regular,
      definition: 'Low Performer',
      hav: 'Moderate',
    },
    {
      name: '85%-89.99%',
      rating: 'E',
      flag: COLORS.red.regular,
      definition: 'Poor Performer',
      hav: 'Low',
    },
    {
      name: '<85%',
      rating: 'F',
      flag: COLORS.black.regular,
      definition: 'Fail Performer',
      hav: 'Low',
    },
  ]

  const columns = [
    { title: 'Score Achievement', dataIndex: 'name' },
    { title: 'Rating', dataIndex: 'rating' },
    {
      title: 'Flag',
      dataIndex: 'flag',
      render: (_, record) => (
        <Tooltip title={record?.definition}>
          <div style={{ width: 10, height: 10, background: record.flag, borderRadius: 20 }} />
        </Tooltip>
      ),
    },
    { title: 'Definition', dataIndex: 'definition' },
    { title: 'HAV', dataIndex: 'hav' },
  ]

  return (
    <>
      <Modal
        zIndex={500}
        closable={true}
        title={'Score Definition'}
        open={showModal !== undefined}
        width={'65%'}
        onCancel={() => {
          handleModal(undefined)
          handleDataForm({})
          handleConfirm(undefined)
        }}
        footer={false}
      >
        <Table dataSource={data} columns={columns} pagination={false} />
      </Modal>
    </>
  )
}
