/* eslint-disable no-unused-vars */
import heartSelected from '@/assets/images/heart-selected.svg'
import heartUnselected from '@/assets/images/heart-unselected.svg'
import { useFavorites } from '@/contexts/FavoritesContext'
import type { Character } from '@/pages/Home/Home'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Favorites.module.css'

const Favorites: React.FC = () => {
  const navigate = useNavigate()
  const { favorites } = useFavorites()

  const handleNavigate = (character: Character) => {
    navigate(`/character/${character.id}`)
  }
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleFavorite = (character: Character) => () => {
    toggleFavorite(character)
  }

  return (
    <div className={styles.favorites}>
      <h1 className={styles.title}>Favorites</h1>

      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>No favorite characters yet.</p>
      ) : (
        <div className={styles.dashboard}>
          {favorites.map((character) => (
            <div key={character.id} className={styles.characterCard}>
              <div
                className={styles.characterImageWrapper}
                onClick={() => handleNavigate(character)}
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
                  aria-label="Toggle from favorites"
                  onClick={handleFavorite(character)}
                >
                  <img
                    src={
                      isFavorite(character.id) ? heartSelected : heartUnselected
                    }
                    alt="Toggle Favorites"
                    className={styles.heartIcon}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
