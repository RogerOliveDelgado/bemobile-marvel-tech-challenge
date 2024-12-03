import heartSelected from '@/assets/images/heart-selected.svg'
import heartUnselected from '@/assets/images/heart-unselected.svg'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useLoading } from '@/contexts/LoadingContext'
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

interface Character {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
  description: string
}

const CharacterDetail: React.FC = () => {
  const navigate = useNavigate()
  const { selectedCharacter } = useCharacter()

  useEffect(() => {
    if (!selectedCharacter) {
      navigate('/')
    }
  }, [selectedCharacter, navigate])

  const params = useMemo(() => ({ orderBy: 'onsaleDate', limit: 20 }), [])
  const { isFavorite } = useFavorites()
  const { toggleFavorite } = useFavorites()

  const handleToggle = (character: Character) => () => {
    toggleFavorite(character)
  }
  const { isLoading } = useLoading()

  const { data: comicsData, error: comicsError } = useFetch<{
    data: { results: Comic[] }
  }>(`/characters/${selectedCharacter?.id}/comics`, params)

  if (!selectedCharacter) {
    return <p>Loading character...</p>
  }

  const { name, description, thumbnail } = selectedCharacter

  return (
    <div className={styles.container}>
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
        <img
          className={styles.toggleHeart}
          onClick={handleToggle(selectedCharacter)}
          src={
            isFavorite(selectedCharacter.id) ? heartSelected : heartUnselected
          }
        />
      </div>

      <div className={styles.comicsSection}>
        <h2 className={styles.comicsTitle}>COMICS</h2>
        {isLoading ? (
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
