import searchIcon from '@/assets/images/SearchButton.min.svg'
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
      <form className={styles.search__inputWrapper}>
        <label
          id="search-label"
          title="Search character"
          className={styles.search__label}
          htmlFor="search-input"
        >
          <div className={styles.search__icon}>
            <img
              src={searchIcon}
              alt="Search Icon"
              className={styles.search__iconSvg}
            />
          </div>
          <input
            id="search-input"
            className={styles.search__input}
            type="text"
            placeholder="SEARCH A CHARACTER..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <p className={styles.search__results}>{resultsLength} RESULTS</p>
    </section>
  )
}

export default SearchInput
