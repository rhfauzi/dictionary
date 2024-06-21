/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import masterData from 'src/api/master-data'
import { getDetailSalesOrder } from 'src/api/sales-order'
import { useTableProduct } from 'src/components/TableProduct/hooks'
import { PATH } from 'src/configs/menus'
import { concatString } from 'src/utils/concatString'
import { DispatchType } from './reducer'
import { StateType } from './state'
import { getDetailCustomerNOO } from 'src/api/customer-noo'
import NotificationGeneral from 'src/components/NotificationGeneral'
import { message } from 'antd'
import { getListSlocman } from 'src/api/logistic/sloc-salesman'
import { UserContext } from 'src/contexts/UserContext'

export function useHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  const { getCustomerByFilter, getDocTypeByCategory } = masterData()
  const { dataForm, optionsOrderType, fetching, custType } = state
  const router = useRouter()
  const splitString = (data: string) => data.split(' - ')[0]
  const { menuActived } = useContext(UserContext)

  function setDataForm(payload: StateType['dataForm']) {
    dispatch({
      type: 'dataForm',
      payload,
    })
  }

  function onChangeForm(field: keyof StateType['dataForm'], value: any) {
    dispatch({
      type: 'dataForm',
      payload: { ...dataForm, [field]: value },
    })
  }

  function dataSubmitted(status_id: number) {
    return {
      ...dataForm,
      order_type_id: splitString(dataForm.order_type_id),
      customer_id: splitString(dataForm.customer_id),
      ship_to_id: splitString(dataForm.ship_to_id),
      sales_org_id: splitString(dataForm.sales_org_id),
      branch_id: splitString(dataForm.branch_id),
      salesman_id: splitString(dataForm.salesman_id),
      status_id: status_id.toString(),
      customer_ref:
        dataForm.customer_ref === '' || dataForm.customer_ref ? '-' : dataForm.customer_ref,
    }
  }

  function runProcess(payload: string) {
    dispatch({
      type: 'processing',
      payload,
    })
  }

  function stopProcess() {
    dispatch({ type: 'processing', payload: undefined })
  }

  function setSalesOrderId(payload: string) {
    dispatch({
      type: 'salesOrderId',
      payload,
    })
  }

  function setBlockConfig(payload: string) {
    dispatch({
      type: 'soBlock',
      payload,
    })
  }

  function setIsPartial(payload: boolean) {
    dispatch({
      type: 'isPartial',
      payload,
    })
  }

  function configPartial(payload: boolean) {
    dispatch({
      type: 'partialConfig',
      payload,
    })
  }
  function showConfirm(payload: 'newSO' | 'draftSO' | 'cancel' | 'cancelDraft' | 'succes-cancel' | 'newDO') {
    dispatch({
      type: 'confirm',
      payload,
    })
  }

  function unShowConfirm() {
    dispatch({
      type: 'confirm',
      payload: undefined,
    })
  }

  function setOptionsOrderType(payload: any[]) {
    dispatch({
      type: 'optionsOrderType',
      payload,
    })
  }

  function setOptionsSalesman(payload: any[]) {
    dispatch({
      type: 'optionsSalesman',
      payload,
    })
  }

  function setOptionsSalesOrg(payload: any[]) {
    dispatch({
      type: 'optionsSalesOrg',
      payload,
    })
  }
  function setTypeCust(payload: string) {
    dispatch({
      type: 'custType',
      payload,
    })
  }
  function setCustClass(payload: string) {
    dispatch({
      type: 'custClass',
      payload,
    })
  }
  function setDraftNoo(payload: string) {
    dispatch({
      type: 'draftNoo',
      payload,
    })
  }
  function outOfStock(payload: boolean) {
    dispatch({
      type: 'outStock',
      payload,
    })
  }
  function setOptionsBranch(payload: any[]) {
    dispatch({
      type: 'optionsBranch',
      payload,
    })
  }

  function setFetching(payload: 'customer' | 'load-options' | 'order_type' | 'customer-noo') {
    dispatch({
      type: 'fetching',
      payload,
    })
  }

  function stopFetching() {
    dispatch({ type: 'fetching', payload: undefined })
  }

  function setCanSave(payload: boolean) {
    dispatch({
      type: 'canSave',
      payload,
    })
  }

  function setCanSaveAsDraft(payload: boolean) {
    dispatch({
      type: 'canSaveAsDraft',
      payload,
    })
  }

  function getDataFromDetail(table: ReturnType<typeof useTableProduct>) {
    const now = new Date().toISOString()
    if (router.query.id && optionsOrderType?.length > 0 && !table.state.isLoading) {
      getDetailSalesOrder({ id: router.query.id as string })
        .then((response) => {
          const { data } = response
          setCustClass(data?.customer_classification)
          setDraftNoo(data?.customer_classification)
          setDataForm({
            ...dataForm,
            company_id: localStorage.getItem('companyCode'),
            branch_id: concatString(data.branch_id, data.branch_name),
            source_id: data.source_id,
            order_date: data.order_date,
            delivery_date: data.delivery_date,
            pricing_date: data.pricing_date || now,
            order_type_id: concatString(data.order_type_id, data.doc_type_name),
            customer_id: concatString(data.customer_id, data.customer_name),
            ship_to_id: concatString(data.customer_id, data.customer_name),
            salesman_id: concatString(data.salesman_id, data.salesman_name),
            sales_org_id: concatString(data.sales_org_id, data.sales_org_name),
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            customer_ref: data.customer_ref,
            currency_id: 'IDR',
          })
          const dataItems: typeof table.state.data = data?.items?.map((p) => ({
            name: p?.description,
            order_qty: p?.order_qty,
            price: p?.price,
            product_id: p?.product_id,
            sub_total: p?.gross_value,
            uom_id: p?.uom_id,
            discOption: 'Rp',
            discount: p?.discount_value,
            remarks: p?.remarks,
          }))
          table.handler.getAllProduct(data?.order_type_id, data?.customer_id, data?.customer_sales?.price_group_id)
          table.handler.addDataFromFetch(dataItems)
          setFetching('load-options')
          if (data.status_id === '1') setCanSaveAsDraft(false)
        })
        .catch(() => router.push(`${PATH.SALES}/sales-order`))
    }
  }

  function handleFetching() {
    if (fetching) {
      // runProcess('Wait for load customer')
      if (fetching === 'customer-noo') {
        getDetailCustomerNOO({ id: router.query.cus_noo_id as string })
          .then((res) => {
            setCustClass(res?.data?.customer?.customer_class_id)
            setTypeCust(res?.data?.customer_sales_data?.price_group_id)
            const {
              data: {
                customer_sales_data: { sales_org_id, sales_org_name, branch_id, branch_name },
                ship_to_customer: { ship_to_customer_id, ship_to_customer_name },
                sold_to_customer: { sold_to_customer_id, sold_to_customer_name },
                salesman,
              },
            } = res
            const optionsSalesman = salesman.map((e) => ({
              label: concatString(e.salesman_id, e.salesman_name),
              value: concatString(e.salesman_id, e.salesman_name),
            }))
            dispatch({ type: 'optionsSalesman', payload: optionsSalesman })
            dispatch({
              type: 'dataForm',
              payload: {
                ...dataForm,
                customer_id: concatString(sold_to_customer_id, sold_to_customer_name),
                ship_to_id: concatString(ship_to_customer_id, ship_to_customer_name),
                sales_org_id: concatString(sales_org_id, sales_org_name),
                branch_id: concatString(branch_id, branch_name),
                salesman_id: optionsSalesman[0].value,
              },
            })
            stopProcess()
            stopFetching()
          })
          .catch(() => {
            stopProcess()
            stopFetching()
          })
      } else {
      // const customer_id = dataForm?.customer_id.split(' - ')[0]
      getCustomerByFilter({
        branch_id: '',
        customer_id: dataForm?.customer_id?.split(' - ')[0],
        sales_org_id: '',
        salesman_id: '',
        order_type: dataForm?.order_type_id?.split(' - ')[0]
      })
        .then((result) => {
          const { data } = result
          setTypeCust(data && data[0]?.price_group_id)
          const newOptions = {
            sales_org: [...data].map(({ sales_org_id, sales_org_name }) => ({
              label: [sales_org_id, sales_org_name].join(' - '),
              value: [sales_org_id, sales_org_name].join(' - '),
            })),
            branch: [...data].map(({ branch_id, branch_name }) => ({
              label: [branch_id, branch_name].join(' - '),
              value: [branch_id, branch_name].join(' - '),
            })),
          }
          const newSalesman = {
            salesman:
            data.filter((s) => newOptions?.sales_org[0]?.value.split(' - ')[0].includes(s.sales_org_id) )
            .map(({ salesman_id, salesman_name, sales_org_id }) => ({
             label: [salesman_id, salesman_name].join(' - '),
             value: [salesman_id, salesman_name].join(' - '),
             key: [sales_org_id]
           })),
          }
       
          setOptionsSalesman(newSalesman.salesman)
          setOptionsSalesOrg(newOptions.sales_org)
          setOptionsBranch(newOptions.branch)
          onChangeForm('ship_to_id', dataForm?.customer_id)
          if (fetching === 'customer') {
            if (dataForm.order_type_id.split('-')[0].includes('ZCR1')) {
              getListSlocman({
                filters: [
                  {
                    field: 'company_id',
                    option: 'EQ',
                    from_value: menuActived,
                    data_type: 'S',
                  },
                  {
                    field: 'branch_id',
                    option: 'EQ',
                    from_value: newOptions.branch[0].value.split('-')[0],
                    data_type: 'S',
                  },
                  {
                    field: 'status',
                    option: 'EQ',
                    from_value: '1',
                    data_type: 'S',
                  },
                ],
                limit: 20,
                page: 1,
              }).then((result) => {
                const data = result.data.result
                const newSalesmanSloc = {
                  salesman: data.map(({ salesman_id, salesman_name }) => ({
                    label: [salesman_id, salesman_name].join(' - '),
                    value: [salesman_id, salesman_name].join(' - '),
                    key: [salesman_id],
                  })),
                }
                setOptionsSalesman(newSalesmanSloc.salesman)
                dispatch({
                  type: 'dataForm',
                  payload: {
                    ...dataForm,
                    ship_to_id: dataForm?.customer_id,
                    sales_org_id:
                      newOptions.sales_org.length > 0 ? newOptions.sales_org[0].value : '',
                    branch_id: newOptions.branch.length > 0 ? newOptions.branch[0].value : '',
                    salesman_id:
                      newSalesmanSloc.salesman.length > 0
                        ? newSalesmanSloc.salesman[0].value
                        : '',
                  },
                })
              })
            } else {
              dispatch({
                type: 'dataForm',
                payload: {
                  ...dataForm,
                  ship_to_id: dataForm?.customer_id,
                  sales_org_id: newOptions.sales_org[0].value,
                  branch_id: newOptions.branch[0].value,
                  salesman_id: newSalesman.salesman[0].value,
                },
              })
            } 
          }
          if (fetching === 'order_type') {
            dispatch({
              type: 'dataForm',
              payload: {
                ...dataForm,
                customer_id: '',
                ship_to_id: '',
                sales_org_id: '',
                branch_id: '',
                salesman_id: '',
              },
            })
          }
          stopProcess()
          stopFetching()
        })
        .catch((err) => {
          stopProcess()
          stopFetching()
          if (err?.response) {
            message.error(err?.response?.data?.data?.message || 'network error')
          } 
        })
      
    }}
  }

  function handleCanSubmit() {
    const requiredFields = [
      dataForm?.branch_id,
      dataForm?.order_type_id,
      dataForm?.customer_id,
      dataForm?.ship_to_id,
      dataForm?.salesman_id,
      dataForm?.sales_org_id,
    ]
    const fieldAreRequired = requiredFields.filter((e) => e === '' || e === undefined).length === 0
    const productNotNull = dataForm?.items?.filter((e) => e.product_id === '').length === 0
    if (fieldAreRequired && productNotNull) {
      setCanSave(true)
    } else {
      setCanSave(false)
    }
  }

  function getDocType() {
    runProcess('Wait for get order type')
    async function api() {
      await getDocTypeByCategory('C').then((response) => {
        const { data } = response
        const options = data.map(({ id, name }) => ({
          label: concatString(id, name),
          value: concatString(id, name),
        }))
        onChangeForm('order_type_id', options.find(({ value }) => value.includes('ZOP1'))?.value)
        setOptionsOrderType(options)
      })
    }
    api()
      .then(() => stopProcess())
      .catch(() => stopProcess())
  }

  return {
    setDataForm,
    onChangeForm,
    dataSubmitted,
    runProcess,
    stopProcess,
    setCanSave,
    setFetching,
    stopFetching,
    setSalesOrderId,
    showConfirm,
    unShowConfirm,
    setOptionsBranch,
    setOptionsOrderType,
    setOptionsSalesOrg,
    setOptionsSalesman,
    setCanSaveAsDraft,
    getDataFromDetail,
    handleFetching,
    getDocType,
    handleCanSubmit,
    setBlockConfig,
    setIsPartial,
    configPartial,
    outOfStock
  }
}
