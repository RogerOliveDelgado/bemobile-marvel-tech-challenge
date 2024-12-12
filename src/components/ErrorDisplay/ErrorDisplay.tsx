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
    <section className={styles.errorDisplay}>
      <img
        src={SpidermanGif}
        alt="Error illustration"
        className={styles.errorDisplay__image}
      />
      <h1 className={styles.errorDisplay__title}>
        Oops! Something went wrong.
      </h1>
      <p className={styles.errorDisplay__message}>
        {`We couldn't load the ${resourceName}. Please reload the page.`}
      </p>
    </section>
  )
}

export default ErrorDisplay
