import usePaginationLucas from '@lucasmogari/react-pagination';
import { IUseConfigPagination, useConfigPagination } from './useConfigPagination';

export function usePagination(props?: IUseConfigPagination) {
  const { configPagination } = useConfigPagination(props);
  return usePaginationLucas(configPagination);
}
