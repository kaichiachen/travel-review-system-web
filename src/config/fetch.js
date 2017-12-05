import baseUrl from './env';

export default async (router = '', data = {}, method = 'GET', type = 'json') => {
  const reqMethod = method.toUpperCase();
  const reqUrl = baseUrl + router;
  const requestConfig = {
    method: reqMethod,
  };
  if (type === 'json') {
    Object.defineProperty(requestConfig, 'Content-Type', {
      value: 'application/json',
    });

    if (method === 'POST') {
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
    if (response === undefined) {
      responseJson.msg = 'Unknown Error';
      reject(responseJson);
    } else if (response.status !== 200) {
      if (!('msg' in responseJson)) {
        responseJson.msg = 'Unknown Error';
      }
      reject(responseJson);
    } else {
      resolve(responseJson);
    }
  });
};
