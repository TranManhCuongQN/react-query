import axios, { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'
export const useQueyString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  return searchParamsObject
}

// error có kiển unknown chưa xác định được
// muốn khi gọi isAxiosError(error) nó return true thì error ko còn giá trị unknown nữa mà giá trị của nó là 1 AxiosError. (error is AxiosError<T>)
// khi truyền vào cái generic type cho ông AxiosError thì cái generic type này cái T chính là data
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
