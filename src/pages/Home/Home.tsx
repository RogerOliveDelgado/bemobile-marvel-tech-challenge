import heartIcon from '@/assets/images/heart-selected.svg'
import SearchInput from '@/components/SearchInput/SearchInput'
import favorites from '@/mockData/favorites.json'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    console.log('Consooooooleamoss!')
    navigate('/character')
  }

  return (
    <div className={styles.home}>
      <SearchInput />
      <div className={styles.dashboard}>
        {favorites.map((character) => (
          <div
            key={character.id}
            className={styles.characterCard}
            onClick={handleNavigate}
          >
            <div className={styles.characterImageWrapper}>
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
              >
                <img
                  src={heartIcon}
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
