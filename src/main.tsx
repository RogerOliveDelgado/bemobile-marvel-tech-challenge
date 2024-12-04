import '@/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx'
import { CharacterProvider } from './contexts/CharacterContext.tsx'
import { FavoritesProvider } from './contexts/FavoritesContext.tsx'
import { LoadingProvider } from './contexts/LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <FavoritesProvider>
        <CharacterProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </CharacterProvider>
      </FavoritesProvider>
    </ErrorBoundary>
  </StrictMode>
)
