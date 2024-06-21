import { useRouter } from 'next/router'
import React from 'react'
import PageBehaviourCompetency from 'src/containers/PageHCOrganizationDevelopment/CompetencyDictionary/BehaviourCompetency/detail'

const Index = () => {
  const router = useRouter()
  const { id }: any = router.query

  return <PageBehaviourCompetency id_competency={id} />
}

export default Index
