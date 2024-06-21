import usePaginationLucas from "@lucasmogari/react-pagination";

// page?: number;
// arrows?: boolean;
// numbers?: boolean;
// totalItems: number;
// itemsPerPage?: number;
// maxPageItems?: number;
export function usePagination(props: any) {
  const configPagination = {
    page: 1,
    itemsPerPage: 10,
    maxPageItems: Infinity,
    numbers: true,
    arrows: true,
    totalItems: 0,
    ...props,
  };

  return usePaginationLucas(configPagination);
}
