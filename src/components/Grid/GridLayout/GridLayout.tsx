import React from 'react'
import styles from './GridLayout.module.css'

interface GridLayoutProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

const GridLayout = <T,>({ items, renderItem }: GridLayoutProps<T>) => {
  return (
    <div className={styles.gridContainer}>
      {items.map((item) => renderItem(item))}
    </div>
  )
}

export default GridLayout
