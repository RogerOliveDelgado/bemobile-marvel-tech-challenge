import heartIcon from '@/assets/images/HeartSelected.min.svg'
import marvelLogo from '@/assets/images/MarvelLogo.min.svg'
import LoadingBar from '@/components/LoadingBar/LoadingBar'
import { useCharacter } from '@/contexts/CharacterContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const { dispatch, isLoadingCharacters, isLoadingComics } = useCharacter()

  const { pathname: currentRoute } = useLocation()

  const isLoading = useMemo(() => {
    if (currentRoute === '/' || currentRoute === '/favorites') {
      return isLoadingCharacters
    }

    if (currentRoute === '/comics') {
      return isLoadingComics
    }

    return false
  }, [currentRoute, isLoadingCharacters, isLoadingComics])

  return (
    <>
      <header className={styles.header}>
        <img
          src={marvelLogo}
          alt="Marvel Logo"
          title="Main Page"
          className={styles.logo}
          onClick={() => {
            navigate('/')
            dispatch({ type: 'SET_LOADING_CHARACTERS', payload: false })
            dispatch({ type: 'RESET_CHARACTERS' })
          }}
        />
        <div
          className={styles.favoritesCounter}
          onClick={() => navigate('/favorites')}
        >
          <img
            src={heartIcon}
            title="Favorites"
            alt="Favorites"
            className={styles.heartIcon}
          />
          <span>{favorites.length}</span>
        </div>
      </header>
      <LoadingBar isLoading={isLoading} />
    </>
  )
}

export default Header
