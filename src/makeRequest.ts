import axios from 'axios'

export const makeRequest = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: 'Bearer ' + process.env.NEXT_STRAPI_TOKEN,
  },
})