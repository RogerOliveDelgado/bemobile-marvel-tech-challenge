import useDebounce from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Character } from '@/pages/Home/Home'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

interface CharacterState {
  initialCharacters: Character[] | null
  selectedCharacter: Character | null
  characters: Character[]
  searchResults: Character[]
  searchTerm: string
  error: string | null
}

type CharacterAction =
  | { type: 'SET_INITIAL_CHARACTERS'; payload: Character[] | null }
  | { type: 'SET_SELECTED_CHARACTER'; payload: Character | null }
  | { type: 'SET_CHARACTERS'; payload: Character[] }
  | { type: 'RESET_CHARACTERS' }
  | { type: 'SET_SEARCH_RESULTS'; payload: Character[] }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }

const initialState: CharacterState = {
  initialCharacters: null,
  selectedCharacter: null,
  characters: [],
  searchResults: [],
  searchTerm: '',
  error: null,
}

function characterReducer(
  state: CharacterState,
  action: CharacterAction
): CharacterState {
  switch (action.type) {
    case 'SET_INITIAL_CHARACTERS':
      return { ...state, initialCharacters: action.payload }
    case 'SET_SELECTED_CHARACTER':
      return { ...state, selectedCharacter: action.payload }
    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload }
    case 'RESET_CHARACTERS': {
      return { ...state, characters: state.initialCharacters || [] }
    }
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

interface CharacterContextValue extends CharacterState {
  dispatch: React.Dispatch<CharacterAction>
}

const CharacterContext = createContext<CharacterContextValue | undefined>(
  undefined
)

interface CharacterProviderProps {
  children: ReactNode
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(characterReducer, initialState)
  const { setStoredValue } = useLocalStorage<Character[]>('character-list', [])

  const params = useMemo(() => ({ orderBy: 'name', limit: 50 }), [])
  const { data, error: fetchError } = useFetch<{
    data: { results: Character[] }
  }>('/characters', params)

  const searchParams = useMemo(() => {
    return state.searchTerm
      ? { nameStartsWith: state.searchTerm, limit: 50 }
      : { orderBy: 'name', limit: 50 }
  }, [state.searchTerm])

  const {
    refetch: fetchSearchResults,
    data: searchData,
    error: searchError,
  } = useFetch<{ data: { results: Character[] } }>(
    '/characters',
    searchParams,
    {
      autoFetch: false,
    }
  )

  useDebounce(
    state.searchTerm,
    1000,
    useCallback(() => {
      if (state.searchTerm) {
        fetchSearchResults()
      } else {
        dispatch({ type: 'RESET_CHARACTERS' })
      }
    }, [state.searchTerm, fetchSearchResults])
  )

  useEffect(() => {
    if (data?.data?.results) {
      if (!state.initialCharacters) {
        dispatch({ type: 'SET_INITIAL_CHARACTERS', payload: data.data.results })
      }
      dispatch({ type: 'SET_CHARACTERS', payload: data.data.results })
      setStoredValue(data.data.results)
    }
    if (fetchError) {
      dispatch({ type: 'SET_ERROR', payload: fetchError })
    }
  }, [data, fetchError, setStoredValue, state.initialCharacters])

  useEffect(() => {
    if (searchData?.data?.results) {
      dispatch({ type: 'SET_CHARACTERS', payload: searchData.data.results })
    } else if (searchData?.data?.results?.length === 0) {
      dispatch({ type: 'SET_CHARACTERS', payload: [] }) // Show empty when no results
    }
    if (searchError) {
      dispatch({ type: 'SET_ERROR', payload: searchError })
    }
  }, [searchData, searchError])

  return (
    <CharacterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacter = (): CharacterContextValue => {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider')
  }
  return context
}
