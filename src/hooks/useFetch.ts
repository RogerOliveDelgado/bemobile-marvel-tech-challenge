import marvelService from '@/api/marvelService'
import { useCallback, useEffect, useState } from 'react'

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseFetchConfig {
  autoFetch?: boolean
}

export function useFetch<T>(
  endpoint: string,
  params = {},
  { autoFetch = true }: UseFetchConfig = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

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

  return { data, loading, error, refetch: fetchData }
}
