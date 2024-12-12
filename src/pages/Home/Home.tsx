import Card from '@/components/Card/Card'
import ErrorDisplay from '@/components/ErrorDisplay/ErrorDisplay'
import GridLayout from '@/components/Grid/GridLayout/GridLayout'
import SearchInput from '@/components/SearchInput/SearchInput'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useLoading } from '@/contexts/LoadingContext'
import React from 'react'
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
  const { dispatch, characters, error } = useCharacter()
  const { toggleFavorite, isFavorite, favorites } = useFavorites()
  const { isLoading } = useLoading()
  const navigate = useNavigate()
  const location = useLocation()

  const isFavoritesPage = location.pathname === '/favorites'

  const handleSearchInput = (query: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: query })
  }

  const handleNavigate = (character: Character) => {
    dispatch({ type: 'SET_SELECTED_CHARACTER', payload: character })
    navigate(`/character/${character.id}`)
  }

  const charactersToDisplay = isFavoritesPage ? favorites : characters

  return (
    <div className={styles['home']}>
      {!isLoading && (
        <>
          {isFavoritesPage && (
            <h1 className={styles['home__title']}>Favorites</h1>
          )}
          <SearchInput
            resultsLength={charactersToDisplay.length}
            onInputChange={handleSearchInput}
          />
          {error && <ErrorDisplay resourceName="characters" />}
          <GridLayout
            items={charactersToDisplay}
            renderItem={(character) => (
              <Card
                key={character.id}
                character={character}
                onNavigate={handleNavigate}
                onAddFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            )}
          />
        </>
      )}
    </div>
  )
}

export default Home
