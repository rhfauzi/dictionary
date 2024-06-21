export interface PropsGetList {
  readonly search?: string
  readonly limit?: string
  readonly page?: string
  readonly sort_by?: string
  readonly sort_order?: string
  readonly onSuccess?: (e: any) => void
}
