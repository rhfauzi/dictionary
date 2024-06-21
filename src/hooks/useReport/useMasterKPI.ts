/* eslint-disable camelcase */
import { useQuery } from 'react-query';
import { getClient } from './changeClient';

const apiPath = 'v1/master-data/kpi-active';

const doFetchKPIActive = async ({ query = {} }) => {
    const client  = getClient();
    const res = await client(`/${apiPath}`, {
        params: {
            company_id: localStorage.getItem("companyCode"),
            ...query,
        },
    });

    return res.data || [];
};

export const useQueryMasterDataKPIActive = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath}/kpi-active`, query], () => doFetchKPIActive({ query }), {
        keepPreviousData: true,
        onSuccess,
        onError,
        enabled,
    })


const apiPath2 = 'v1/master-data/kpi/lists';

const doFetchKPIList = async ({ query = {} }) => {
    const fil = JSON.parse(localStorage.getItem('filter_all'));
    const client  = getClient();
    const res = await client(`/${apiPath2}`, {
        params: {
            company_id: localStorage.getItem("companyCode"),
            depo: fil.depo,
            periode: fil.depo.periode,
            ...query,
        },
    });

    return res?.data || [];
};

export const useQueryMasterDataKPIHistory = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath2}/kpi-history`, query], () => doFetchKPIList({ query }), {
        keepPreviousData: true,
        onSuccess,
        onError,
        enabled,
    })