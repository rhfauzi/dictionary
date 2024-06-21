import React, { useEffect, useState } from 'react'
import { Spacer, Text } from 'pink-lava-ui'
import { Col, Row } from 'antd'
import { Card } from 'src/components'
import { ICArrowLeft } from 'src/assets'
import { useRouter } from 'next/router'
import { postEmployeeSelfService } from 'src/api/employee-self-service'
import SectionSidebarList from './section/SectionSidebarList'
import { ConfirmSubmit, ConfirmSuccessSubmit } from './section/alerts'
import QuestionCard from './QuestionCard'
import { dataQuestions } from './dummyData'

export default function PageRegistration() {
  const router = useRouter()
  const [questionStep, setQuestionStep] = useState<number>(1)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setQuestionStep(prevData?.questionStep ?? 1)
  }, [])

  const handleSubmitQuestion = async () => {
    const getAllData = JSON.parse(localStorage.getItem('employee_self_service'))
    delete getAllData.questionStep

    try {
      const response = await postEmployeeSelfService(getAllData)
      if (response?.status === 200 || response?.status === 201) {
        setIsSuccessSubmit(true)
        localStorage.removeItem('employee_self_service')
        localStorage.removeItem('employeeImageUrl')
        localStorage.removeItem('confidential_document')
        localStorage.removeItem('training_certificate')
        localStorage.removeItem('dataProvinces')
        localStorage.removeItem('dataDistricts')
        localStorage.removeItem('dataCities')
      } else {
        setIsSuccessSubmit(false)
      }
    } catch (err) {
      console.log('error', err)
      setIsSuccessSubmit(false)
    }
  }

  return (
    <div style={{ height: '85vh' }}>
      <Spacer size={20} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row align="middle" justify="space-between">
          <Row align="middle">
            <ICArrowLeft
              onClick={() => router.push('/employee-self-services')}
              style={{ cursor: 'pointer' }}
            />
            <Text variant="headingLarge" style={{ fontWeight: 'bold' }}>Registration</Text>
          </Row>
        </Row>
      </Card>

      <Spacer size={20} />
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={7}>
          <SectionSidebarList
            dataQuestions={dataQuestions ?? []}
            questionStep={questionStep}
          />
        </Col>

        <Col xs={24} xl={17}>
          <QuestionCard
            questionStep={questionStep}
            handleNext={questionStep}
            handleChange={(name: string, step: number, data: any) => {
              // console.log('data', data)
              if (name === 'next') {
                const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
                localStorage.setItem('employee_self_service', JSON.stringify({
                  ...prevData, ...data, questionStep: step,
                }))
              } else {
                const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
                localStorage.setItem('employee_self_service', JSON.stringify({
                  ...prevData, questionStep: step,
                }))
              }
              setQuestionStep(step)

              if (step > 13) {
                setIsSubmit(true)
              }
            }}
          />
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
        onClose={(val: boolean) => {
          setIsSuccessSubmit(val)
          router.push('/employee-self-services')
        }}
      />
    </div>
  )
}