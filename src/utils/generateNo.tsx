export const generateNo = (record, index) => {
  const { limit, page } = record

  return page > 1 ? (((page * limit + index) - limit) + 1) : index + 1
}
