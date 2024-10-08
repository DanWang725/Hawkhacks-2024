/* eslint-disable no-restricted-imports */
/* eslint-disable no-undef */
import axios from 'axios';
process.env;
export const Axios = axios.create({
  baseURL: process.env?.REACT_APP_FASTAPI_URL ?? 'http://localhost:3000', // use env variable to determine url to retrieve from
  withCredentials: true,
  timeout: 30000,
});
