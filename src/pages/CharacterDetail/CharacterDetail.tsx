import heartSelected from '@/assets/images/HeartSelected.min.svg'
import heartUnselected from '@/assets/images/HeartUnselected.min.svg'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useLoading } from '@/contexts/LoadingContext'
import { useFetch } from '@/hooks/useFetch'
import classNames from 'classnames'
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

  const params = useMemo(() => ({ orderBy: 'onsaleDate', limit: 20 }), [])
  const { isFavorite, toggleFavorite } = useFavorites()
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
        <div className={styles.contentHeader}>
          <img
            src={`${thumbnail.path}.${thumbnail.extension}`}
            title={name || 'Character'}
            alt={name || 'Character'}
            className={styles.characterImage}
          />
          <div className={styles.characterInfo}>
            <section className={styles.characterHeader}>
              <h1
                title={name}
                className={classNames(
                  styles.characterName,
                  styles.truncateCharacterName
                )}
              >
                {name}
              </h1>
              <img
                className={styles.toggleHeart}
                title={
                  isFavorite(selectedCharacter.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
                onClick={() => toggleFavorite(selectedCharacter)}
                src={
                  isFavorite(selectedCharacter.id)
                    ? heartSelected
                    : heartUnselected
                }
                alt="Favorite toggle"
              />
            </section>
            <div className={classNames(styles.description, styles.truncate5)}>
              <p title={description}>
                {description || 'Description not available.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.comicsSection}>
        {comicsError && <p>Error loading comics: {comicsError}</p>}
        {!isLoading &&
          !comicsError &&
          (comicsData?.data?.results?.length ?? 0) === 0 && (
            <p className={styles.noComics}>
              No comics available for this character.
            </p>
          )}
        {!isLoading && !comicsError && comicsData?.data?.results && (
          <div className={styles.comicsSectionContainer}>
            <h2 className={styles.comicsTitle}>COMICS</h2>
            <div className={`${styles.comicsLayout} `}>
              {comicsData.data.results.map((comic, id) => {
                const onsaleDate = comic.dates.find(
                  (date) => date.type === 'onsaleDate'
                )?.date

                return (
                  <div key={id} className={styles.comicCard}>
                    <div className={styles.imageContainer}>
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        title={comic.title || 'Comic'}
                        alt={comic.title || 'Comic'}
                        className={styles.comicImage}
                      />
                    </div>
                    <section className={styles.comicInformation}>
                      <p className={styles.comicName}>
                        {comic.title || 'Unknown Comic'}
                      </p>
                      <p className={styles.comicLaunchDate}>
                        {onsaleDate ? onsaleDate.split('-')[0] : 'Unknown Year'}
                      </p>
                    </section>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterDetail
