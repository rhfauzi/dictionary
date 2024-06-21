/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Steps } from 'antd'
import { Spacer, Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { If, Then } from 'react-if'
import { ICArrowLeft, ICAngleSmallLeft, ICAngleSmallRightWhite } from 'src/assets'
import {
  updateCompetency,
  getDetailCompetency,
} from 'src/api/competency-dictionary/behaviour-competency'
import { ConfirmSubmit, ConfirmSuccessSubmit } from '../../alerts'
import Step1 from '../components/step-1'
import Step2 from '../components/step-2'
import Step3 from '../components/step-3'

const { Step } = Steps

export default function BehaviourCompetency({ id_competency }) {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [allDataForm, setAllDataForm] = useState<any>({
    payload: {
      definition: '',
      name: '',
      country_code: undefined,
      legal_entity_code: undefined,
      job_family_code: undefined,
      sub_job_family_code: undefined,
      job_title_id: undefined,
      type: 'behaviour',
      competency_detail: [],
      proficiency_level: 1,
    },
    step: 0,
  })
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isSuccessSubmit, setIsSuccessSubmit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const handleGetDataTable = async () => {
    if (id_competency) {
      setLoading(true)
      try {
        const res = await getDetailCompetency(id_competency)
        if (res?.status === 200) {
          const { data } = res.data
          const details = data?.competency_detail.map((item: any) => ({ level: item.data }))

          const payload = {
            ...data,
            country: data?.country_code ?? undefined,
            legal_entity: data?.legal_entity_code ?? undefined,
            job_family: data?.job_family_code ?? undefined,
            sub_job_family: data?.sub_job_family_code ?? undefined,
            job_title: data?.job_title_id ?? undefined,
            type: 'behaviour',
            proficiency_level: data?.competency_detail?.length ?? 1,
            competency_detail: details ?? [],
          }

          localStorage.setItem('behaviour_competency', JSON.stringify({ payload, step: 1 }))
          setAllDataForm({ payload, step: 1 })
          setStep(1)
          setError(false)
          setLoading(false)
        } else {
          localStorage.removeItem('behaviour_competency')
          setStep(0)
          setError(true)
          setLoading(false)
        }
      } catch {
        localStorage.removeItem('behaviour_competency')
        setStep(0)
        setError(true)
        setLoading(false)
      }
    }
  }

  const handleStep = () => {
    switch (step) {
      case 0:
        return <Step1 onChangeDisableButton={setDisableButton} />
      case 1:
        return (
          <Step2
            onChangeDisableButton={setDisableButton}
            setAllDataForm={(payload) => {
              setAllDataForm({ ...allDataForm, payload })
            }}
            allDataForm={allDataForm}
            type={'details'}
            isLoading={loading}
          />
        )
      case 2:
        return (
          <Step3
            onChangeDisableButton={setDisableButton}
            setAllDataForm={(competency_detail) => {
              setAllDataForm({
                ...allDataForm,
                payload: { ...allDataForm?.payload, competency_detail },
              })
            }}
            allDataForm={allDataForm}
          />
        )
      default:
        return <Step1 onChangeDisableButton={setDisableButton} />
    }
  }

  useEffect(() => {
    handleGetDataTable()
  }, [])

  const handleUpdateStorage = (steps: number) => {
    const prevData = JSON.parse(localStorage.getItem('behaviour_competency'))
    localStorage.setItem(
      'behaviour_competency',
      JSON.stringify({
        ...prevData,
        payload: { ...prevData?.payload, ...allDataForm?.payload },
        step: steps,
      }),
    )
  }

  const handleSubmitForm = async () => {
    const { payload } = allDataForm

    const competency_detail = payload?.competency_detail.map((item: any, index: number) => ({
      level: index + 1,
      data: item.level,
    }))

    try {
      const res = await updateCompetency({ ...payload, competency_detail }, id_competency)
      if (res?.status === 200 || res?.status === 201) {
        setIsSuccessSubmit(true)
      } else {
        setIsSuccessSubmit(false)
      }
    } catch (e) {
      setIsSuccessSubmit(false)
    }
  }

  return (
    <CompetencyAnalysisPage>
      <Spacer size={20} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row align="middle" justify="space-between">
          <Col xs={2} xl={2}>
            <ICArrowLeft
              onClick={() =>
                router.push('/organization-development/competency-dictionary/dictionary')
              }
              style={{ cursor: 'pointer' }}
            />
          </Col>
          <Col xs={22} xl={22}>
            <Steps className="hc-step" current={step}>
              <Step title="Behaviour Competency" />
              <Step title="Behaviour Competency Design" />
              <Step title="Key Behaviour & Activity" />
            </Steps>
          </Col>
        </Row>
      </Card>

      <Spacer size={20} />
      {handleStep()}

      <Spacer size={20} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row gutter={[20, 20]} justify="end">
          <If condition={step > 0}>
            <Then>
              <Button
                size="big"
                variant="tertiary"
                className="hc-button-tertiary "
                onClick={() => {
                  setStep(step - 1)
                  handleUpdateStorage(step - 1)
                }}
              >
                <ICAngleSmallLeft /> Previous
              </Button>
            </Then>
          </If>

          <Button
            size="big"
            variant="tertiary"
            className="hc-button"
            disabled={error || loading || disableButton}
            onClick={() => {
              let steps = step
              if (step < 2) {
                setStep(step + 1)
                steps = step + 1
              } else {
                setIsSubmit(true)
              }
              handleUpdateStorage(steps)
            }}
          >
            {step < 2 ? 'Next' : 'Submit'} <ICAngleSmallRightWhite />
          </Button>
        </Row>
      </Card>

      <ConfirmSubmit
        open={isSubmit}
        closable={false}
        maskClosable={false}
        title="Are you sure to submit the Behaviour Competency Analysis?"
        subTitle="Please check your data before submit. "
        onClose={() => setIsSubmit(false)}
        onSubmit={() => {
          setIsSubmit(false)
          handleSubmitForm()
        }}
      />

      <ConfirmSuccessSubmit
        open={isSuccessSubmit}
        closable={false}
        maskClosable={false}
        title="Your behaviour competency analysis has been succesfully submitted."
        onClose={(val: boolean) => {
          setIsSuccessSubmit(val)
          // localStorage.removeItem('behaviour_competency')
          router.push('/organization-development/competency-dictionary/dictionary')
        }}
      />
    </CompetencyAnalysisPage>
  )
}

const CompetencyAnalysisPage = styled.div`
.hc-button { background-color: #2771C7; border: 1px solid #2771C7; color: white; }
.hc-button: hover { background-color: #164b89; border: 1px solid #164b89; }
.hc-button: disabled { background-color: #DDDDDD; border: 1px solid #DDDDDD; }
.hc-button-tertiary { background-color: #FFFFFF; border: 2px solid #2771C7; color: #2771C7; margin-right: 20px; }
.hc-button-tertiary: hover { border: 2px solid #114480; color: #114480; }
.hc-button-tertiary: disabled { background-color: #DDDDDD; border: 2px solid #DDDDDD; }

.hc-step { width: 98%; }
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title,
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title,
.ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item:last-child .ant-steps-item-title,
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
  font-size: 14px;
  color: #2771C7;
  font-weight: 600;
}
.ant-steps-item-finish .ant-steps-item-icon,
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
  width: 14px;
  height: 14px;
  margin-top: 8px;
  background-color: #2771C7;
  border-color: #2771C7;
}
.ant-steps-item-icon .ant-steps-icon { top: -12.5px; }
.ant-steps-item-title::after { top: 14px; }
.hc-step .anticon svg {
  width: 10px;
  height: 10px;
  color: #ffff;
  margin-top: 14px;
}
.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon,
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon .ant-steps-icon,
.ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
  font-size: 0px;
}
.ant-steps-item-wait .ant-steps-item-icon {
  border-color: #9DB5D9;
  width: 14px;
  height: 14px;
  margin-top: 8px;
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
  background-color: #2771C7;
  height: 4px;
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after,
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
  background-color: #D4E4FC;
  height: 4px;
}
` as any