const FailingComponent = () => {
  throw new Error('Simulated error to test ErrorBoundary')
}

export default FailingComponent
