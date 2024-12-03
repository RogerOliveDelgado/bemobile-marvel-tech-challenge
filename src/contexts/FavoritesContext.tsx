import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Character {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
  description: string
}

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
  const [favorites, setFavorites] = useState<Character[]>([])

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
