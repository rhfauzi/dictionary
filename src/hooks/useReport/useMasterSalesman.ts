/* eslint-disable camelcase */
import { useQuery } from 'react-query';
import { getClient } from './changeClient';

const apiPath = 'v1/report-sales/param-detail';

const doFetchList = async ({ query = {} }) => {
  const client  = getClient();
  const res = await client(`/${apiPath}`, {
    params: {
      company_code: localStorage.getItem('companyCode'),
      field_name: 'salesman',
      ...query,
    },
  });

  return res.data || [];
};

export const useQueryMasterSalesman = ({
  query = {},
  onSuccess = () => {},
  onError = () => {},
}) => useQuery([`${apiPath}/salesman`, query], () => doFetchList({ query }), {
  onSuccess,
  onError,
});
