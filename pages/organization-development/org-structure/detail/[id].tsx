import { useRouter } from 'next/router'
import React from 'react'
import PageODOrganizationStructureDetail from 'src/containers/PageHCOrganizationDevelopment/Detail'

const Index = () => {
  const router = useRouter()
  const { id }: any = router.query

  return <PageODOrganizationStructureDetail id_employee={id} />
}

export default Index
