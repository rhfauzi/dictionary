export interface PropsGetList {
  readonly search?: string | string[]
  readonly job_id?: string
  readonly country_id?: string
  readonly company_id?: string
  readonly department_id?: string
  readonly division_id?: string
  readonly limit?: string
  readonly page?: string
  readonly sort_by?: string
  readonly sort_order?: string
  readonly onSuccess?: (e: any) => void
}
