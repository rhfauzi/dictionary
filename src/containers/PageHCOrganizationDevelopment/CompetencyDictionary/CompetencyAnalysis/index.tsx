/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import ModalCompetencyAnalysis from '../component/ModalCompetencyAnalysis'

const optionCompetencyPage0 = [{
  title: 'What competency you want to analyze?',
  subTitle: 'Choose the method that best suits your needs.',
  option: [
    { id: 0, name: 'Behaviour Competency', action: { status: 'next', url: 0 } },
    { id: 1, name: 'Technical Competency', action: { status: 'next', url: 1 } },
  ],
}]

const optionCompetencyPage1 = [
  {
    title: 'Behaviour Competency',
    subTitle: 'Choose the method you want to use to complete the analyze.',
    option: [
      { id: 0, name: 'Competency Analysis Step by Step', action: { status: 'topage', url: 'organization-development/competency-dictionary/behaviour-competency' } },
      { id: 1, name: 'Upload File From Excel', action: { status: 'function', url: 'organization-development/competency-dictionary/behaviour-competency' } },
    ],
  },
  {
    title: 'Technical Competency',
    subTitle: 'Choose the method you want to use to complete the analyze.',
    option: [
      { id: 0, name: 'Competency Analysis Step by Step', action: { status: 'topage', url: 'organization-development/competency-dictionary/technical-competency' } },
      { id: 1, name: 'Upload File From Excel', action: { status: 'function', url: 'organization-development/competency-dictionary/technical-competency' } },
    ],
  },
]

export default function CompetencyAnalysis({
  onCancel,
  showModal = false,
}) {
  const router = useRouter()
  const [page, setPage] = useState<number>(0)
  const [tesType, setTesType] = useState<number>(0)

  const handleData = () => {
    switch (page) {
      case 0:
        return optionCompetencyPage0[tesType]
      case 1:
        return optionCompetencyPage1[tesType]
      default:
        return optionCompetencyPage0[0]
    }
  }

  return (
    <CompetencyAnalysisPage>
      <ModalCompetencyAnalysis
        showModal={showModal}
        page={page}
        data={handleData()}
        onChange={(val: any) => {
          setTesType(val?.action?.url ?? 0)

          if (val?.action?.status === 'prev') {
            if (page > 0) { setPage(page - 1) }
          } else if (val?.action?.status === 'next') {
            setPage(page + 1)
          } else if (val?.action?.status === 'topage') {
            localStorage.removeItem('behaviour_competency')
            localStorage.removeItem('technical_competency')
            router.push(`/${val?.action?.url}`)
          }
        }}
        onCancel={onCancel}
      />
    </CompetencyAnalysisPage>
  )
}

const CompetencyAnalysisPage = styled.div`
.hc-button { background-color: #2771C7; border: 1px solid #2771C7 }
.hc-button: hover { background-color: #164b89; border: 1px solid #164b89 }
.hc-button: disabled { background-color: #DDDDDD; border: 1px solid #DDDDDD }
.hc-button-tertiary { background-color: #FFFFFF; border: 2px solid #2771C7; color: #2771C7 }
.hc-button-tertiary: hover { border: 2px solid #114480; color: #114480 }
.hc-button-tertiary: disabled { background-color: #DDDDDD; border: 2px solid #DDDDDD }
` as any