import marvelService from '@/api/marvelService'
import { useLoading } from '@/contexts/LoadingContext'
import { useCallback, useEffect, useState } from 'react'

interface UseFetchResult<T> {
  data: T | null
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
  const [error, setError] = useState<string | null>(null)
  const { setLoading } = useLoading()

  const memoizedSetLoading = useCallback(
    (state: boolean) => setLoading(state),
    [setLoading]
  )

  const fetchData = useCallback(async () => {
    memoizedSetLoading(true)
    setError(null)
    try {
      const response = await marvelService.get<T>(endpoint, { params })
      setData(response.data)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      memoizedSetLoading(false)
    }
  }, [endpoint, params, memoizedSetLoading])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch, fetchData])

  return { data, error, refetch: fetchData }
}
