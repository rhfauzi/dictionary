export interface PropsGetList {
  readonly search?: string
  readonly limit?: string
  readonly account_id?: string
  readonly sort_by?: string
  readonly sort_order?: string
  readonly onSuccess?: (e: any) => void
}
