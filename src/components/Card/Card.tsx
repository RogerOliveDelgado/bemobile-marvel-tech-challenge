import { default as heartSelected } from '@/assets/images/HeartSelected.min.svg'
import { default as heartUnselected } from '@/assets/images/HeartUnselected.min.svg'
import { type Character } from '@/pages/Home/Home'
import React from 'react'
import styles from './Card.module.css'

interface CardProps {
  character: Character
  onNavigate: (character: Character) => void
  onAddFavorite: (character: Character) => void
  isFavorite: (id: number) => boolean
}

const Card: React.FC<CardProps> = ({
  character,
  onNavigate,
  onAddFavorite,
  isFavorite,
}) => {
  return (
    <article className={styles.card}>
      <div
        className={styles.card__imageWrapper}
        onClick={() => onNavigate(character)}
      >
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          title={character.name || 'Character'}
          alt={character.name || 'Character'}
          className={styles.card__image}
        />
        <hr className={styles.card__divider} />
      </div>
      <section className={styles.card__info}>
        <h2 title={character.name || 'Character'} className={styles.card__name}>
          {character.name}
        </h2>
        <button
          className={styles.card__favoriteButton}
          aria-label={
            isFavorite(character.id)
              ? 'Remove from favorites'
              : 'Add to favorites'
          }
          onClick={() => onAddFavorite(character)}
        >
          <img
            src={isFavorite(character.id) ? heartSelected : heartUnselected}
            alt={isFavorite(character.id) ? 'Favorited' : 'Not Favorited'}
            title={
              isFavorite(character.id)
                ? 'Remove from favorites'
                : 'Add to favorites'
            }
            className={`${styles.card__icon} ${isFavorite(character.id) ? styles['card__icon--favorited'] : ''}`}
          />
        </button>
      </section>
    </article>
  )
}

export default Card
