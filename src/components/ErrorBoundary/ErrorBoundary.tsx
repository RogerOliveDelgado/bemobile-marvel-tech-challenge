import spidermanErrorGif from '@/assets/images/spiderman-error.gif'
import React, { Component, ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleReload = (): void => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <img
            src={spidermanErrorGif}
            alt="Spider-Man Error GIF"
            className={styles.errorImage}
          />
          <h1 className={styles.errorTitle}>Oops! Something went wrong.</h1>
          <p className={styles.errorMessage}>
            {
              "We're sorry for the inconvenience. Please try reloading the page or return to the home page."
            }
          </p>
          <button className={styles.reloadButton} onClick={this.handleReload}>
            Reload
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
