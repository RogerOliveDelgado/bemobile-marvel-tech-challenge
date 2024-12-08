import useDynamicGrid from '@/hooks/useDynamicGrid'
import React, { useRef } from 'react'
import styles from './GridLayout.module.css'

interface GridLayoutProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

const GridLayout = <T,>({ items, renderItem }: GridLayoutProps<T>) => {
  const containerRef = useRef(null)
  const minWidth = 172.5
  const gap = 16
  const columns = useDynamicGrid(containerRef, minWidth, gap)

  return (
    <div
      ref={containerRef}
      className={styles.gridContainer}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {items.map((item) => renderItem(item))}
    </div>
  )
}

export default GridLayout
