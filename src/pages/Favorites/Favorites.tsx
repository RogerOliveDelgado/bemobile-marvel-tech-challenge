/* eslint-disable no-unused-vars */
import Card from '@/components/Card/Card'
import GridLayout from '@/components/Grid/GridLayout/GridLayout'
import { useFavorites } from '@/contexts/FavoritesContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Character } from '../Home/Home'
import styles from './Favorites.module.css'

const Favorites: React.FC = () => {
  const navigate = useNavigate()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const handleNavigate = (character: Character) => {
    navigate(`/character/${character.id}`)
  }

  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Favorites</h1>
      </div>
      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>No favorite characters yet.</p>
      ) : (
        <GridLayout
          items={favorites}
          renderItem={(character: Character) => (
            <Card
              key={character.id}
              character={character}
              onNavigate={handleNavigate}
              onAddFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          )}
        />
      )}
    </>
  )
}

export default Favorites
