/* eslint-disable camelcase */
import { useQuery } from 'react-query';
import { getClient } from './changeClient';

const apiPath = 'v1/report-sales/param-detail';

const doFetchList = async ({ query = {} }) => {
  const client  = getClient();
  const res = await client(`/${apiPath}`, {
    params: {
      company_code: localStorage.getItem('companyCode'),
      field_name: 'periode',
      ...query,
    },
  });

  return res.data || [];
};

export const useQueryMasterPeriode = ({
  query = {},
  onSuccess = () => {},
  onError = () => {},
}) => useQuery([`${apiPath}/periode`, query], () => doFetchList({ query }), {
  onSuccess,
  onError,
});
