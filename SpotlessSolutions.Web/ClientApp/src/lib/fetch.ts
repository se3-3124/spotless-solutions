import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios'

export function createInstance (headers?: AxiosHeaders, config?: AxiosRequestConfig): AxiosInstance {
    return axios.create({
        baseURL: window.location.origin,
        headers: (headers !== null ? headers : {}) as AxiosHeaders,
        ...(config !== null ? config : {}) as AxiosRequestConfig
    })
}

export async function authenticationRequest<T> (requestFunc: <T>(instance: AxiosInstance, ...args: any[]) => Promise<T>, ...args: any[]): Promise<T> {
    const token = localStorage.getItem('sst') ?? ''

    const instance = axios.create({
        baseURL: window.location.origin,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await requestFunc<T>(instance, ...args)
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

