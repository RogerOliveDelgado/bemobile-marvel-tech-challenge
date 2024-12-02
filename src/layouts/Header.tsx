import heartIcon from '@/assets/images/heart-selected.svg'
import marvelLogo from '@/assets/images/marvel-logo.svg'
import React from 'react'
import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={marvelLogo} alt="Marvel Logo" className={styles.logo} />
      <div className={styles.favoritesCounter}>
        <img src={heartIcon} alt="Favorites" className={styles.heartIcon} />
        <span>3</span>
      </div>
    </header>
  )
}

export default Header
