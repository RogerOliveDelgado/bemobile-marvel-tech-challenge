import { getYearFromUTCString } from '@/utils/helpers'
import React from 'react'
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

interface CharacterDetailProps {
  characterName: string
  description: string
  characterImage: string
  comics: Comic[]
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  characterName,
  description,
  characterImage,
  comics,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={characterImage || '/path/to/fallback-character-image.jpg'}
          alt={characterName || 'Character'}
          className={styles.characterImage}
        />
        <div className={styles.characterInfo}>
          <h1 className={styles.characterName}>{characterName}</h1>
          <p className={styles.description}>
            {description || 'Description not available.'}
          </p>
        </div>
      </div>

      <div className={styles.comicsSection}>
        <h2 className={styles.comicsTitle}>COMICS</h2>
        {comics.length === 0 ? (
          <p className={styles.noComics}>
            No comics available for this character.
          </p>
        ) : (
          <div className={styles.comicsLayout}>
            {comics.map((comic, id) => {
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
                    {onsaleDate
                      ? getYearFromUTCString(onsaleDate)
                      : 'Unknown Year'}
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
