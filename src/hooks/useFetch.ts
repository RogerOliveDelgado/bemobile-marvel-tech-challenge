import marvelService from '@/api/marvelService'
import { useCallback, useEffect, useState } from 'react'

interface UseFetchResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

interface UseFetchConfig {
  autoFetch?: boolean
}

export function useFetch<T>(
  initialEndpoint: string,
  initialParams = {},
  { autoFetch = true }: UseFetchConfig = {}
): UseFetchResult<T> & {
  updateFetch: (newEndpoint: string, newParams?: object) => void
} {
  const [endpoint, setEndpoint] = useState(initialEndpoint)
  const [params, setParams] = useState(initialParams)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await marvelService.get<T>(endpoint, { params })
      setData(response.data)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [endpoint, params])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch, fetchData])

  const updateFetch = useCallback(
    (newEndpoint?: string, newParams?: object) => {
      if (newEndpoint) setEndpoint(newEndpoint)
      if (newParams) setParams(newParams)
    },
    []
  )

  return { data, isLoading, error, refetch: fetchData, updateFetch }
}
