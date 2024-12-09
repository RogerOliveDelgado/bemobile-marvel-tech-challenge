import React from 'react'
import styles from './LoadingBar.module.css'

interface LoadingBarProps {
  isLoading: boolean
}

const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  return (
    <div
      className={`${styles.loadingBar} ${isLoading ? styles.loading : ''}`}
    ></div>
  )
}

export default LoadingBar
