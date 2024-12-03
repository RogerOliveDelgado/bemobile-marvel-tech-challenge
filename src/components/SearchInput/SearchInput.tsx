import searchIcon from '@/assets/images/search-button.svg'
import React, { useState } from 'react'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  resultsLength: number
  onInputChange: (query: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  resultsLength,
  onInputChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onInputChange(value)
  }

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
            value={searchTerm}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <p className={styles.searchResults}>{resultsLength} RESULTS</p>
    </section>
  )
}

export default SearchInput
