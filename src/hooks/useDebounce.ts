import { useEffect, useRef, useState } from 'react'

function useDebounce<T>(
  value: T,
  delay: number,
  callback: (debouncedValue: T, cancelToken: AbortController) => void
) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const abortControllerRef = useRef<AbortController | null>(null)
  const initialRenderRef = useRef(true)

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false
      return
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const newAbortController = new AbortController()
    abortControllerRef.current = newAbortController

    const handler = setTimeout(() => {
      setDebouncedValue(value)
      callback(value, newAbortController)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, callback])

  return debouncedValue
}

export default useDebounce
