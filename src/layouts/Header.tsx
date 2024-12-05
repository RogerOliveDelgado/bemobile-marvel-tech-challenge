import heartIcon from '@/assets/images/HeartSelected.min.svg'
import marvelLogo from '@/assets/images/MarvelLogo.min.svg'
import LoadingBar from '@/components/LoadingBar/LoadingBar'
import { useFavorites } from '@/contexts/FavoritesContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { favorites } = useFavorites()

  return (
    <>
      <header className={styles.header}>
        <img
          src={marvelLogo}
          alt="Marvel Logo"
          className={styles.logo}
          onClick={() => navigate('/')}
        />
        <div
          className={styles.favoritesCounter}
          onClick={() => navigate('/favorites')}
        >
          <img src={heartIcon} alt="Favorites" className={styles.heartIcon} />
          <span>{favorites.length}</span>
        </div>
      </header>
      <LoadingBar />
    </>
  )
}

export default Header
