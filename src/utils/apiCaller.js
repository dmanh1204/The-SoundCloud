import axios from 'axios';
import { API_URL, TOKEN_API } from '../constants/urlApi';

const customInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

//config header Authorization each sent request
customInstance.interceptors.request.use(
  //Handle before request sent
  config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${TOKEN_API}`;
    }
  },
  //Handle request error
  error => {
    Promise.reject(error);
  }
);

//handle response request
customInstance.interceptors.response.use(
  response => response.data,
  error => {
    //The request was made and the server res with a status code falls out of the range 2xx
    if (error.response) {
      return Promise.reject(error.response);
    }
    //The request was made but no res was received
    else if (error.request) {
      return Promise.reject(error.message);
    }
    //Something happen in setting up the req that trigger an error
    else {
      return Promise.reject(error.message);
    }
  }
);

export async function fetchApi(
  endpoint,
  method = 'GET',
  body,
  params = {},
  sourceToken = null
) {
  return customInstance({
    method: method,
    url: endpoint,
    data: body,
    params: params,
    cancelToken: sourceToken,
  });
}

//fetch multiple request
export async function fetchAll(requests = []) {
  return axios.all(requests);
}
