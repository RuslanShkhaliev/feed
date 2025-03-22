import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

enum HttpMethods {
	Get = 'get',
	Post = 'post',
	Put = 'put',
	Delete = 'delete',
	Patch = 'patch',
}

export class AxiosClient {
	static create(options?: CreateAxiosDefaults): AxiosClient {
		const axiosClient = axios.create(options);

		return new AxiosClient(axiosClient);
	}

	public readonly axios: AxiosInstance;

	constructor(httpClient: AxiosInstance) {
		this.axios = httpClient;
	}

	public async request<T, R = AxiosResponse<T>, D>(
		url: string,
		options: AxiosRequestConfig<D> = {},
	): Promise<R> {
		const response = await this.axios.request<T, R, D>({
			url,
			...options,
		});

		return response;
	}

	public async get<T, R = AxiosResponse<T>, D>(
		url: string,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return this.request(url, {
			method: HttpMethods.Get,
			...config,
		});
	}

	public async post<T, R = AxiosResponse<T>, D>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return this.request(url, {
			method: HttpMethods.Post,
			data,
			...config,
		});
	}
	public async patch<T, R = AxiosResponse<T>, D >(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return this.request(url, {
			method: HttpMethods.Patch,
			data,
			...config,
		});
	}
	public async delete<T, R = AxiosResponse<T>, D>(
		url: string,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return this.request(url, {
			method: HttpMethods.Delete,
			...config,
		});
	}
}
