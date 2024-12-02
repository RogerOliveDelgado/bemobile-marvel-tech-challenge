import heartIcon from '@/assets/images/heart-selected.svg'
import SearchInput from '@/components/SearchInput/SearchInput'
import { useFetch } from '@/hooks/useFetch'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

interface Character {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const params = useMemo(() => ({ orderBy: 'name', limit: 50 }), [])
  const { data, loading, error } = useFetch<{
    data: { results: Character[] }
  }>('/characters?orderBy=name&limit=50', params)

  const handleNavigate = (characterId: number) => {
    navigate(`/character/${characterId}`)
  }

  return (
    <div className={styles.home}>
      <div
        className={`${styles.loadingBar} ${loading ? styles.loading : ''}`}
      ></div>
      {!loading && data ? (
        <SearchInput resultsLength={data.data.results.length} />
      ) : null}

      <div className={styles.dashboard}>
        {error && <p>Error: {error}</p>}
        {data?.data.results.map((character) => (
          <div
            key={character.id}
            className={styles.characterCard}
            onClick={() => handleNavigate(character.id)}
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
