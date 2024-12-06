import SpidermanGif from '@/assets/images/spiderman-error.gif'
import React from 'react'
import styles from './ErrorDisplay.module.css'

interface ErrorDisplayProps {
  errorMessage?: string
  resourceName?: string
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  resourceName = 'data',
}) => {
  return (
    <div className={styles.errorContainer}>
      <img src={SpidermanGif} alt="Error" className={styles.errorImage} />
      <h1 className={styles.errorTitle}>Oops! Something went wrong.</h1>
      <p className={styles.errorMessage}>
        {`We couldn't load the ${resourceName}. Please reload the page.`}
      </p>
    </div>
  )
}

export default ErrorDisplay
