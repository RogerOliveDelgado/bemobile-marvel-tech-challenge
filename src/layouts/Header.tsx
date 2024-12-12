import heartIcon from '@/assets/images/HeartSelected.min.svg'
import marvelLogo from '@/assets/images/MarvelLogo.min.svg'
import LoadingBar from '@/components/LoadingBar/LoadingBar'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const { dispatch } = useCharacter()

  return (
    <>
      <header className={styles.header}>
        <img
          src={marvelLogo}
          alt="Marvel Logo"
          title="Main Page"
          className={styles.header__logo}
          onClick={() => {
            navigate('/')
            dispatch({ type: 'RESET_CHARACTERS' })
          }}
        />
        <div
          className={styles.header__favoritesCounter}
          onClick={() => navigate('/favorites')}
        >
          <img
            src={heartIcon}
            title="Favorites"
            alt="Favorites"
            className={styles.header__heartIcon}
          />
          <span>{favorites.length}</span>
        </div>
      </header>
      <LoadingBar />
    </>
  )
}

export default Header
