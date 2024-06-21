export const baseFetch = async (method = 'GET', url = '', data = {}) => {
  const options: any = {
    method,
    mode: 'cors', // Use 'cors' to allow cross-origin requests
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'strict-origin-when-cross-origin',
  }

  if (method !== 'GET') {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options);

  if (response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }
  throw new Error(`HTTP error! status: ${response.status}`);
}