import heartIcon from '@/assets/images/heart-selected.svg'
import marvelLogo from '@/assets/images/marvel-logo.svg'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

interface HeaderProps {
  loading: boolean
}

const Header: React.FC<HeaderProps> = ({ loading }) => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <img
        src={marvelLogo}
        alt="Marvel Logo"
        className={styles.logo}
        onClick={() => navigate('/')}
      />
      <div className={styles.favoritesCounter}>
        <img src={heartIcon} alt="Favorites" className={styles.heartIcon} />
        <span>3</span>
      </div>
      <div
        className={`${styles.loadingBar} ${loading ? styles.loading : ''}`}
      />
    </header>
  )
}

export default Header
