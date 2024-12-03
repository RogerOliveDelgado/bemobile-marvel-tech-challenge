import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

interface LoadingContextProps {
  isLoading: boolean
  setLoading: (state: boolean) => void
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = useCallback((state: boolean) => {
    setIsLoading(state)
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
