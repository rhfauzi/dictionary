export interface IUseConfigPagination {
  page?: number,
  itemsPerPage?: number,
  maxPageItems?: number,
  numbers?: boolean,
  arrows?: boolean,
  totalItems?: number,
}

export function useConfigPagination(props?: IUseConfigPagination) {
  const configPagination = {
    page: 1,
    itemsPerPage: 20,
    maxPageItems: Infinity,
    numbers: true,
    arrows: true,
    totalItems: 1,
    ...props,
  };

  return {
    configPagination,
  };
}
