import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

export interface HttpClientOptions {
  headers?: Record<string, string>
  baseURL?: string
  beforeRequest?: (context: RequestOptions) => Promise<void> | void
  afterResponse?: (context: {
    request: RequestOptions
    response: Response
    retry: (count?: number) => void
  }) => Promise<void> | void
}

enum HttpMethods {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
  Patch = 'patch',
}

interface RequestOptions extends RequestInit {
  headers: Headers
}
export class AxiosClient {
  static create(options?: CreateAxiosDefaults): AxiosClient {
    const axiosClient = axios.create(options)

    return new AxiosClient(axiosClient)
  }

  public readonly axios: AxiosInstance

  constructor(httpClient: AxiosInstance) {
    this.axios = httpClient
  }

  public async request<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    options: AxiosRequestConfig<D> = {},
  ): Promise<R> {
    const response = await this.axios.request<T, R, D>({
      url,
      ...options,
    })

    return response
  }

  public async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request(url, {
      method: HttpMethods.Get,
      ...config,
    })
  }

  public async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request(url, {
      method: HttpMethods.Post,
      data,
      ...config,
    })
  }
  public async patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request(url, {
      method: HttpMethods.Patch,
      data,
      ...config,
    })
  }
  public async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request(url, {
      method: HttpMethods.Delete,
      ...config,
    })
  }
}
