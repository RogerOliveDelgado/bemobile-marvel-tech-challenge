import { useLoading } from '@/contexts/LoadingContext'
import React from 'react'
import styles from './LoadingBar.module.css'

const LoadingBar: React.FC = () => {
  const { isLoading } = useLoading()

  return (
    <div
      className={`${styles.loadingBar} ${isLoading ? styles.loading : ''}`}
    ></div>
  )
}

export default LoadingBar
