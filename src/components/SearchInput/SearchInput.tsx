import searchIcon from '@/assets/images/search-button.svg'
import React from 'react'
import styles from './SearchInput.module.css'

interface MainLayoutProps {
  resultsLength: number
}

const MainLayout: React.FC<MainLayoutProps> = ({ resultsLength }) => {
  return (
    <section className={styles.search} aria-labelledby="search-label">
      <form className={styles.searchInputWrapper}>
        <label
          id="search-label"
          className={styles.searchLabel}
          htmlFor="search-input"
        >
          <div className={styles.searchIcon}>
            <img
              src={searchIcon}
              alt="Search Icon"
              className={styles.searchIconSvg}
            />
          </div>
          <input
            id="search-input"
            className={styles.searchInput}
            type="text"
            placeholder="SEARCH A CHARACTER..."
          />
        </label>
      </form>
      <p className={styles.searchResults}>{resultsLength} RESULTS</p>
    </section>
  )
}

export default MainLayout
