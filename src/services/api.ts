import axios, { AxiosError } from 'axios'

export const Api = axios.create({
  baseURL: 'http://localhost:8081',
})

export function catchAxiosError(error: AxiosError) {
  if (error.response) {
    // eslint-disable-next-line no-console
    console.error(error.response)
  } else if (error.request) {
    // eslint-disable-next-line no-console
    console.error(error.request)
  } else {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export default Api
