import useLocalStorage from '@/hooks/useLocalStorage'
import { type Character } from '@/pages/Home/Home'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface FavoritesContextType {
  favorites: Character[]
  toggleFavorite: (character: Character) => void
  isFavorite: (characterId: number) => boolean
}

interface CharacterProviderProps {
  children: ReactNode
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

export const FavoritesProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const { storedValue, setStoredValue } = useLocalStorage<Character[]>(
    'favorites',
    []
  )
  const [favorites, setFavorites] = useState<Character[]>(storedValue || [])

  useEffect(() => {
    setStoredValue(favorites)
  }, [favorites, setStoredValue])

  const toggleFavorite = (character: Character) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === character.id)) {
        return prev.filter((fav) => fav.id !== character.id)
      } else {
        return [...prev, character]
      }
    })
  }

  const isFavorite = (characterId: number) => {
    return favorites.some((c) => c.id === characterId)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
