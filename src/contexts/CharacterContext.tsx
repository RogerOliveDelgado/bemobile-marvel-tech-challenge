import useDebounce from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Comic } from '@/pages/CharacterDetail/CharacterDetail'
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
  comics: Comic[]
  isLoadingCharacters: boolean
  isLoadingComics: boolean
  error: string | null
}

type CharacterAction =
  | { type: 'SET_INITIAL_CHARACTERS'; payload: Character[] }
  | { type: 'SET_SELECTED_CHARACTER'; payload: Character | null }
  | { type: 'SET_CHARACTERS'; payload: Character[] }
  | { type: 'RESET_CHARACTERS' }
  | { type: 'SET_SEARCH_RESULTS'; payload: Character[] }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_COMICS'; payload: Comic[] }
  | { type: 'SET_LOADING_CHARACTERS'; payload: boolean }
  | { type: 'SET_LOADING_COMICS'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

const initialState: CharacterState = {
  initialCharacters: null,
  selectedCharacter: null,
  characters: [],
  searchResults: [],
  searchTerm: '',
  comics: [],
  isLoadingCharacters: false,
  isLoadingComics: false,
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
    case 'SET_COMICS':
      return { ...state, comics: action.payload }
    case 'SET_LOADING_CHARACTERS':
      return { ...state, isLoadingCharacters: action.payload }
    case 'SET_LOADING_COMICS':
      return { ...state, isLoadingComics: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

interface CharacterProviderProps {
  children: ReactNode
}

const CharacterContext = createContext<
  | (CharacterState & {
      dispatch: React.Dispatch<CharacterAction>
      refetchComics: () => void
      updateFetch: (newEndpoint: string, newParams?: object) => void
    })
  | undefined
>(undefined)

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(characterReducer, initialState)
  const { storedValue, setStoredValue } = useLocalStorage<Character[]>(
    'character-list',
    []
  )
  const { storedValue: storedComics, setStoredValue: setStoredComics } =
    useLocalStorage<{ [key: string]: Comic[] }>('comics', {})

  const params = useMemo(() => ({ orderBy: 'name', limit: 50 }), [])
  const {
    data: characterData,
    refetch: refetchCharacters,
    isLoading: isLoadingCharacters,
  } = useFetch<{
    data: { results: Character[] }
  }>('/characters', params, { autoFetch: !storedValue.length })

  const {
    data: comicsData,
    refetch: refetchComics,
    isLoading: isLoadingComics,
    error: comicsError,
    updateFetch,
  } = useFetch<{ data: { results: Comic[] } }>(
    '/characters',
    { orderBy: 'onsaleDate', limit: 20 },
    { autoFetch: false }
  )

  useEffect(() => {
    if (!state.selectedCharacter) return
    if (storedComics[state.selectedCharacter.id]) {
      dispatch({
        type: 'SET_COMICS',
        payload: storedComics[state.selectedCharacter.id],
      })
    }
    if (comicsData?.data?.results) {
      dispatch({ type: 'SET_COMICS', payload: comicsData.data.results })
      setStoredComics((prev) => ({
        ...prev,
        [state.selectedCharacter!.id]: comicsData.data.results,
      }))
    }
  }, [comicsData, setStoredComics, state, storedComics])

  // useEffect(() => {
  //   if (!state.selectedCharacter) return
  //   updateFetch()
  // }, [state.selectedCharacter])

  useDebounce(
    state.searchTerm,
    1000,
    useCallback(() => {
      if (state.searchTerm) {
        refetchCharacters()
      } else {
        dispatch({ type: 'RESET_CHARACTERS' })
      }
    }, [state.searchTerm, refetchCharacters])
  )

  useEffect(() => {
    if (storedValue?.length) {
      dispatch({ type: 'SET_INITIAL_CHARACTERS', payload: storedValue })
      dispatch({ type: 'SET_CHARACTERS', payload: storedValue })
    } else if (characterData?.data?.results) {
      dispatch({
        type: 'SET_INITIAL_CHARACTERS',
        payload: characterData.data.results,
      })
      dispatch({ type: 'SET_CHARACTERS', payload: characterData.data.results })
      setStoredValue(characterData.data.results)
    }
  }, [storedValue, characterData, setStoredValue])

  useEffect(() => {
    if (comicsError) {
      dispatch({ type: 'SET_ERROR', payload: comicsError })
    }
  }, [comicsError])

  return (
    <CharacterContext.Provider
      value={{
        ...state,
        updateFetch,
        refetchComics,
        dispatch,
        isLoadingCharacters,
        isLoadingComics,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacter = () => {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider')
  }
  return context
}
