import heartSelected from '@/assets/images/heart-selected.svg'
import heartUnselected from '@/assets/images/heart-unselected.svg'
import SearchInput from '@/components/SearchInput/SearchInput'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import useDebounce from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

interface Character {
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

  const params = useMemo(() => ({ orderBy: 'name', limit: 50 }), [])
  const { data, loading, error } = useFetch<{
    data: { results: Character[] }
  }>('/characters', params)

  const { setSelectedCharacter } = useCharacter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Character[]>([])
  const searchParams = useMemo(
    () => ({ nameStartsWith: searchTerm, limit: 50 }),
    [searchTerm]
  )
  const { toggleFavorite, isFavorite } = useFavorites()

  const {
    refetch: fetchSearchResults,
    data: searchData,
    loading: searchLoading,
  } = useFetch<{
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

  const handleNavigate = (character: Character) => () => {
    setSelectedCharacter(character)
    navigate(`/character/${character.id}`)
  }

  const handleAddFavorite = (character: Character) => () => {
    toggleFavorite(character)
  }

  return (
    <div className={styles.home}>
      <div
        className={`${styles.loadingBar} ${
          loading || searchLoading ? styles.loading : ''
        }`}
      ></div>

      {!loading && data ? (
        <SearchInput
          resultsLength={
            searchResults.length || data?.data?.results.length || 0
          }
          onInputChange={(query: string) => setSearchTerm(query)}
        />
      ) : null}

      <div className={styles.dashboard}>
        {error && <p>Error: {error}</p>}
        {(searchResults.length > 0
          ? searchResults
          : data?.data?.results || []
        ).map((character) => (
          <div key={character.id} className={styles.characterCard}>
            <div
              className={styles.characterImageWrapper}
              onClick={handleNavigate(character)}
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={`${character.name} Thumbnail`}
                className={styles.characterImage}
              />
            </div>
            <div className={styles.characterCardDivider}></div>
            <div className={styles.characterInfo}>
              <p className={styles.characterName}>{character.name}</p>
              <button
                className={styles.favoriteButton}
                aria-label="Add to favorites"
                onClick={handleAddFavorite(character)}
              >
                <img
                  src={
                    isFavorite(character.id) ? heartSelected : heartUnselected
                  }
                  alt="Favorites"
                  className={styles.heartIcon}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
