import Card from '@/components/Card/Card'
import GridLayout from '@/components/Grid/GridLayout/GridLayout'
import SearchInput from '@/components/SearchInput/SearchInput'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useLoading } from '@/contexts/LoadingContext'
import useDebounce from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export interface Character {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
  description: string
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { setSelectedCharacter } = useCharacter()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { isLoading } = useLoading()

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Character[]>([])

  const params = useMemo(() => ({ orderBy: 'name', limit: 50 }), [])
  const { data, error } = useFetch<{ data: { results: Character[] } }>(
    '/characters',
    params
  )

  const searchParams = useMemo(
    () => ({ nameStartsWith: searchTerm, limit: 50 }),
    [searchTerm]
  )
  const { refetch: fetchSearchResults, data: searchData } = useFetch<{
    data: { results: Character[] }
  }>('/characters', searchParams, { autoFetch: false })

  useDebounce(
    searchTerm,
    1000,
    useCallback(() => {
      if (searchTerm) {
        fetchSearchResults()
      } else {
        setSearchResults([])
      }
    }, [searchTerm, fetchSearchResults])
  )

  useEffect(() => {
    if (searchData?.data?.results) {
      setSearchResults(searchData.data.results)
    }
  }, [searchData])

  const handleNavigate = (character: Character) => {
    setSelectedCharacter(character)
    navigate(`/character/${character.id}`)
  }

  const handleAddFavorite = (character: Character) => {
    toggleFavorite(character)
  }

  const charactersToDisplay =
    searchResults.length > 0 ? searchResults : data?.data?.results || []

  return (
    <div className={styles.home}>
      {!isLoading && data && (
        <SearchInput
          resultsLength={charactersToDisplay.length}
          onInputChange={(query: string) => setSearchTerm(query)}
        />
      )}

      <div className={styles.dashboard}>
        {error && <p>Error: {error}</p>}
        <GridLayout
          items={charactersToDisplay}
          renderItem={(character: Character) => (
            <Card
              key={character.id}
              character={character}
              onNavigate={handleNavigate}
              onAddFavorite={handleAddFavorite}
              isFavorite={isFavorite}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Home
