import { type Character } from '@/pages/Home/Home'
import React, { createContext, ReactNode, useContext, useState } from 'react'

interface CharacterContextType {
  selectedCharacter: Character | null
  setSelectedCharacter: (character: Character | null) => void
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
)

interface CharacterProviderProps {
  children: ReactNode
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  )

  return (
    <CharacterContext.Provider
      value={{ selectedCharacter, setSelectedCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider')
  }
  return context
}
