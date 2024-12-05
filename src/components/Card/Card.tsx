import { default as heartSelected } from '@/assets/images/heart-selected.svg'
import { default as heartUnselected } from '@/assets/images/heart-unselected.svg'
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
    <article className={styles.characterCard}>
      <figure
        className={styles.characterImageWrapper}
        onClick={() => onNavigate(character)}
      >
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={`${character.name} Thumbnail`}
          className={styles.characterImage}
        />
      </figure>
      <hr className={styles.characterCardDivider} />
      <section className={styles.characterInfo}>
        <h2 className={styles.characterName}>{character.name}</h2>
        <button
          className={styles.favoriteButton}
          aria-label="Add to favorites"
          onClick={() => onAddFavorite(character)}
        >
          <img
            src={isFavorite(character.id) ? heartSelected : heartUnselected}
            alt="Favorites"
            className={styles.heartIcon}
          />
        </button>
      </section>
    </article>
  )
}

export default Card
