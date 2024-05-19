/* eslint-disable no-restricted-imports */
/* eslint-disable no-undef */
import axios from 'axios';
process.env;
export const Axios = axios.create({
  baseURL: process.env?.REACT_APP_FLASK_URL ?? 'http://localhost:3000', // use env variable to determine url to retrieve from
  timeout: 1000,
});
