import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IRequestConfig  extends AxiosRequestConfig{
onFailure?: (error:AxiosError)=> void
onSuccess?: (response:AxiosResponse)=> void
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const refreshSubscribers:Array<(token:string)=>void> = [];
let failedRequest:Array<IRequestConfig> = [];
let isRefreshing = false;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token:token-timeScheduling');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => response, async (error: AxiosError | unknown) => {
  const originalRequest = (error as AxiosError).config as IRequestConfig;

  if (error instanceof AxiosError && error.response?.status === 401) {

    if (error.response.data && error.response.data.code === 'token.expired') {
if(!isRefreshing){
      try {
        
        const refresh = localStorage.getItem('refresh_Token:token-timeScheduling')
        const response = await api.post('/refresh', { refresh_Token: refresh });
        const { token, refresh_Token } = response.data;
  
        localStorage.setItem('token:token-timeScheduling', token);
        localStorage.setItem('token:token-timeScheduling', refresh_Token);
        isRefreshing = false;
        onRefreahed(token)
  
        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return axios(originalRequest)
      } catch (error) {
        failedRequest.forEach((request)=>{
          request.onFailure?.(error as AxiosError)
        });
        failedRequest = [];
      }
    }
      return new Promise((resolve, reject)=>{
        failedRequest.push({
          ...originalRequest,
          onSuccess:(response)=>resolve(response),
        onFailure:(error)=>reject(error),
        });
      });
    }
  }else {
    localStorage.removeItem('token:token-timeScheduling');
    localStorage.removeItem('refresh_token:token-timeScheduling');
    localStorage.removeItem('user:token-timeScheduling')
  }
return Promise.reject(error);
});

function onRefreahed(token:string){
refreshSubscribers.forEach((callback)=> callback(token));
}

export { api }