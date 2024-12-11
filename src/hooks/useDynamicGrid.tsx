import { useCallback, useEffect, useRef, useState } from 'react'
import useDebounce from './useDebounce'

function useDynamicGrid(
  containerRef: React.RefObject<HTMLDivElement>,
  minWidth: number,
  gap: number
) {
  const [columns, setColumns] = useState(1)
  const previousWidthRef = useRef(0)

  const calculateColumns = useCallback(
    (containerWidth: number) => {
      if (containerWidth !== previousWidthRef.current) {
        previousWidthRef.current = containerWidth
        const calculatedColumns = Math.floor(
          (containerWidth + gap) / (minWidth + gap)
        )
        setColumns(calculatedColumns)
      }
    },
    [gap, minWidth]
  )

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        calculateColumns(containerRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [containerRef, calculateColumns])

  useEffect(() => {
    if (containerRef.current) {
      calculateColumns(containerRef.current.offsetWidth)
    }
  }, [containerRef, calculateColumns])

  return columns
}

export default useDynamicGrid
