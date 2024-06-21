/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const config = {
  apiBase: process.env.NEXT_PUBLIC_API_BASE_DEV,
};

export const getInterceptorsRequest = (config) => {
  const token = localStorage.getItem('token');

  if (token) config.headers.authorization = `Bearer ${token}`;

  config.headers['X-User-Id'] = localStorage.getItem('userId') ?? 0;
  config.headers['X-Screen-Id'] = 'fico.accounting.create';
  config.headers['X-Partner-Id'] = localStorage.getItem('partnerId') ?? 0;

  config.params = config.params ?? {};
  // config.params.company_code = localStorage.getItem('companyCode');
  // config.params.company_id = localStorage.getItem('companyId');
    
  return config;
};
