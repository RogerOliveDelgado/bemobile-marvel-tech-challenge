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
    <div className={styles['character-detail__container']}>
      <div className={styles['character-detail__header']}>
        <div className={styles['character-detail__content-header']}>
          <img
            src={`${thumbnail.path}.${thumbnail.extension}`}
            title={name || 'Character'}
            alt={name || 'Character'}
            className={styles['character-detail__character-image']}
          />
          <div className={styles['character-detail__character-info']}>
            <section className={styles['character-detail__character-header']}>
              <h1
                title={name}
                className={classNames(
                  styles['character-detail__character-name'],
                  styles['character-detail__truncate-name']
                )}
              >
                {name}
              </h1>
              <img
                className={styles['character-detail__toggle-heart']}
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
            <div
              className={classNames(
                styles['character-detail__description'],
                styles['character-detail__truncate-description']
              )}
            >
              <p title={description}>
                {description || 'Description not available.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles['character-detail__comics-section']}>
        {comicsError && <p>Error loading comics: {comicsError}</p>}
        {!isLoading &&
          !comicsError &&
          (comicsData?.data?.results?.length ?? 0) === 0 && (
            <p className={styles['character-detail__no-comics']}>
              No comics available for this character.
            </p>
          )}
        {!isLoading && !comicsError && comicsData?.data?.results && (
          <div className={styles['character-detail__comics-section-container']}>
            <h2 className={styles['character-detail__comics-title']}>COMICS</h2>
            <div className={styles['character-detail__comics-layout']}>
              {comicsData.data.results.map((comic, id) => {
                const onsaleDate = comic.dates.find(
                  (date) => date.type === 'onsaleDate'
                )?.date

                return (
                  <div
                    key={id}
                    className={styles['character-detail__comic-card']}
                  >
                    <div
                      className={styles['character-detail__image-container']}
                    >
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        title={comic.title || 'Comic'}
                        alt={comic.title || 'Comic'}
                        className={styles['character-detail__comic-image']}
                      />
                    </div>
                    <section className={styles['character-detail__comic-info']}>
                      <p className={styles['character-detail__comic-name']}>
                        {comic.title || 'Unknown Comic'}
                      </p>
                      <p
                        className={
                          styles['character-detail__comic-launch-date']
                        }
                      >
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
