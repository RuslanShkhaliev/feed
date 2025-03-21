export interface HttpClient {
  get<T = any>(url: string): Promise<T>
  delete<T = any>(url: string): Promise<T>
  post<T, D = Record<string, any>>(url: string, options?: { body?: D } & RequestInit): Promise<T>
  put<T, D = Record<string, any>>(url: string, options?: { body?: D } & RequestInit): Promise<T>
  patch<T, D = Record<string, any>>(url: string, options?: { body?: D } & RequestInit): Promise<T>
}
