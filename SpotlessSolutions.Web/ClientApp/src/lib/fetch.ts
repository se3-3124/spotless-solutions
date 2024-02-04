import axios, { type AxiosHeaders, type AxiosInstance, type AxiosRequestConfig } from 'axios'

export function createInstance (headers?: AxiosHeaders, config?: AxiosRequestConfig): AxiosInstance {
  return axios.create({
    baseURL: window.location.origin,
    headers: (headers !== null ? headers : {}) as AxiosHeaders,
    ...(config !== null ? config : {})
  })
}

export async function getRequest<T> (instance: AxiosInstance, endpoint: string): Promise<T> {
  const result = await instance.get<T>(endpoint)
  return result.data
}

export async function postRequest<T> (instance: AxiosInstance, endpoint: string, data: object): Promise<T> {
  const result = await instance.post<T>(endpoint, data)
  return result.data
}

export async function putRequest<T> (instance: AxiosInstance, endpoint: string, data: object): Promise<T> {
  const result = await instance.put<T>(endpoint, data)
  return result.data
}

export async function deleteRequest<T> (instance: AxiosInstance, endpoint: string): Promise<T> {
  const result = await instance.delete<T>(endpoint)
  return result.data
}
