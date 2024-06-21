import { useRouter } from 'next/router'
import React from 'react'
import PageTechnicalCompetency from 'src/containers/PageHCOrganizationDevelopment/CompetencyDictionary/TechnicalCompetency/detail'

const Index = () => {
  const router = useRouter()
  const { id }: any = router.query

  return <PageTechnicalCompetency id_competency={id} />
}

export default Index
