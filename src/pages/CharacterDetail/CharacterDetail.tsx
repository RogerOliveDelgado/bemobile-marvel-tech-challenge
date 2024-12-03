import { useCharacter } from '@/contexts/CharacterContext'
import { useFetch } from '@/hooks/useFetch'
import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CharacterDetail.module.css'

export interface Comic {
  title: string
  thumbnail: {
    path: string
    extension: string
  }
  dates: {
    type: string
    date: string
  }[]
}

const CharacterDetail: React.FC = () => {
  const navigate = useNavigate()
  const { selectedCharacter } = useCharacter()

  useEffect(() => {
    if (!selectedCharacter) {
      navigate('/')
    }
  }, [selectedCharacter, navigate])

  const params = useMemo(() => ({ orderBy: 'onsaleDate', limit: 50 }), [])

  const {
    data: comicsData,
    loading: comicsLoading,
    error: comicsError,
  } = useFetch<{
    data: { results: Comic[] }
  }>(`/characters/${selectedCharacter?.id}/comics`, params)

  if (!selectedCharacter) {
    return <p>Loading character...</p>
  }

  const { name, description, thumbnail } = selectedCharacter

  return (
    <div className={styles.container}>
      {/* Loading Bar */}
      {comicsLoading && (
        <div
          className={`${styles.loadingBar} ${comicsLoading ? styles.loading : ''}`}
        ></div>
      )}

      <div className={styles.header}>
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={name || 'Character'}
          className={styles.characterImage}
        />
        <div className={styles.characterInfo}>
          <h1 className={styles.characterName}>{name}</h1>
          <p className={styles.description}>
            {description || 'Description not available.'}
          </p>
        </div>
      </div>

      <div className={styles.comicsSection}>
        <h2 className={styles.comicsTitle}>COMICS</h2>
        {comicsLoading ? (
          <p>Loading comics...</p>
        ) : comicsError ? (
          <p>Error loading comics: {comicsError}</p>
        ) : comicsData?.data?.results.length === 0 ? (
          <p className={styles.noComics}>
            No comics available for this character.
          </p>
        ) : (
          <div className={styles.comicsLayout}>
            {comicsData?.data?.results.map((comic, id) => {
              const onsaleDate = comic.dates.find(
                (date) => date.type === 'onsaleDate'
              )?.date

              return (
                <div key={id} className={styles.comicCard}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title || 'Comic'}
                    className={styles.comicImage}
                  />
                  <p className={styles.comicName}>
                    {comic.title || 'Unknown Comic'}
                  </p>
                  <p className={styles.comicLaunchDate}>
                    {onsaleDate ? onsaleDate.split('-')[0] : 'Unknown Year'}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterDetail
