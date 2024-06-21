import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const subUrl = {
  downloadUrl: 'v1/master/export/',
}

export const downloadExcel = async (payload: any, url, replace = '') => {
  let newUrl = `${subUrl.downloadUrl}`;
  const isDifferentUrl = replace === 'replace'

  if (replace !== '') {
    newUrl = newUrl.replaceAll('master/export/', '');
    newUrl += url;
  } else {
    newUrl += url
  }

  const response = await call({
    method: METHODS.POST,
    options: { responseType: 'blob' },
    subUrl: isDifferentUrl ? url : newUrl,
    data: payload,
  })

  return response.data
}