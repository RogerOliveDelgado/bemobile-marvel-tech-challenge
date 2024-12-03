import '@/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CharacterProvider } from './contexts/CharacterContext.tsx'
import { FavoritesProvider } from './contexts/FavoritesContext.tsx'
import { LoadingProvider } from './contexts/LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <CharacterProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </CharacterProvider>
    </FavoritesProvider>
  </StrictMode>
)
