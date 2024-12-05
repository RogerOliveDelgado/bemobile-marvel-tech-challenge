import Card from '@/components/Card/Card'
import GridLayout from '@/components/Grid/GridLayout/GridLayout'
import SearchInput from '@/components/SearchInput/SearchInput'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useLoading } from '@/contexts/LoadingContext'
import useDebounce from '@/hooks/useDebounce'
import React, { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const location = useLocation()
  const { setSelectedCharacter, characters, error } = useCharacter()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { isLoading } = useLoading()

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Character[]>([])

  const isFavoritesPage = location.pathname === '/favorites'

  useDebounce(
    searchTerm,
    1000,
    useCallback(() => {
      if (searchTerm) {
        const filteredResults = characters.filter((character) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(filteredResults)
      } else {
        setSearchResults([])
      }
    }, [searchTerm, characters])
  )

  const handleNavigate = (character: Character) => {
    setSelectedCharacter(character)
    navigate(`/character/${character.id}`)
  }

  const handleAddFavorite = (character: Character) => {
    toggleFavorite(character)
  }

  const charactersToDisplay = isFavoritesPage
    ? favorites.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : searchResults.length > 0
      ? searchResults
      : characters

  return (
    <div className={styles.home}>
      {!isLoading && (
        <>
          {isFavoritesPage && <h1 className={styles.title}>Favorites</h1>}
          <SearchInput
            resultsLength={charactersToDisplay.length}
            onInputChange={(query: string) => setSearchTerm(query)}
          />
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
        </>
      )}
    </div>
  )
}

export default Home
