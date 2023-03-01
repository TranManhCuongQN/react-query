import { useSearchParams } from 'react-router-dom'
export const useQueyString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  return searchParamsObject
}
