export interface PropsGetList {
  readonly employee_id?: string
  readonly company_id?: string
  readonly division_id?: string
  readonly country_id?: string
  readonly department_id?: string
  readonly job_id?: string
  readonly onSuccess?: (e: any) => void
}

export interface PropsGetDetail {
  readonly id: string
  readonly onSuccess?: (e: any) => void
}
