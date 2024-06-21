export interface PropsGetList {
  readonly search?: string
  readonly country_id?: string
  readonly company_id?: string
  readonly division_id?: string
  readonly onSuccess?: (e: any) => void
}
