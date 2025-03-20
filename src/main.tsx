import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

axios.interceptors.request.use((req) => {
  document.body.classList.add("loading-indicator");
  const token = sessionStorage.getItem("token");

  const headers = {} as AxiosRequestHeaders;
  headers["Content-Type"] = "application/json";
  req.headers = headers;
  if (token) {
    if (!req.url?.includes('fup')) {
      req.headers.Authorization = "Bearer" + " " + token;
    }
  }
  console.log("Request to server:::::::::::::::::::");
  return req;
});


// Response interceptor
axios.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    if (
      res &&
      res.data &&
      (res.data.isSuccess === "true" ||
        res.data.isSuccess === null ||
        res.data.isSuccess === undefined)
    ) {
      document.body.classList.remove("loading-indicator");
      if (res.data == null) {

      }
      return res;
    } else {
      document.body.classList.remove("loading-indicator");
      return res; // Return the original response object
    }
  },
  (err) => {
    document.body.classList.remove("loading-indicator");
    return err;

  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
