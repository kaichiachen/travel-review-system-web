import baseUrl from './env';

export default async (router = '', data = {}, method = 'GET', type = 'json') => {
  const reqMethod = method.toUpperCase();
  let bu = baseUrl;
  if (router === 'article') {
    bu = 'http://localhost:8081/';
  }
  const reqUrl = bu + router;
  /* eslint no-console: ["error", { allow: ["debug"] }] */
  console.debug(reqUrl);
  const requestConfig = {
    method: reqMethod,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (type === 'json') {
    if (method === 'POST' || method === 'PUT') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data),
      });
    }
  }

  let responseJson = {};
  let response;
  try {
    response = await fetch(reqUrl, requestConfig);
    responseJson = await response.json();
  } catch (error) {
    /* if response body is null, it will catch error */
    /* eslint no-empty: "error" */
  }
  return new Promise((resolve, reject) => {
    /* eslint no-console: ["error", { allow: ["debug"] }] */
    console.debug(response);
    if (response.status === 200) {
      resolve(responseJson);
    } else {
      reject(responseJson);
    }
  });
};
