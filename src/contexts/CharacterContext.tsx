import { useFetch } from '@/hooks/useFetch'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Character } from '@/pages/Home/Home'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface CharacterContextType {
  selectedCharacter: Character | null
  setSelectedCharacter: (character: Character | null) => void
  characters: Character[]
  error: string | null
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
  const [characters, setCharacters] = useState<Character[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setStoredValue } = useLocalStorage<Character[] | undefined>(
    'character-list',
    []
  )

  const params = useMemo(() => ({ orderBy: 'name', limit: 50 }), [])
  const { data, error: fetchError } = useFetch<{
    data: { results: Character[] }
  }>('/characters', params)

  useEffect(() => {
    if (data?.data?.results) {
      setCharacters(data.data.results)
      setStoredValue(data.data.results)
    }
    if (fetchError) {
      setError(fetchError)
    }
  }, [data, fetchError, setStoredValue])

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacter,
        setSelectedCharacter,
        characters,
        error,
      }}
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
