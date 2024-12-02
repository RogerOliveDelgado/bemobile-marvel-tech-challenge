import favorites from '@/mockData/favorites.json'
import React from 'react'
import './Favorites.module.css'

const Favorites: React.FC = () => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search a character..."
      />
      <div className="results">3 RESULTS</div>
      <div className="dashboard">
        {favorites.map((character) => (
          <div key={character.id} className="character-card">
            <img
              src={character.thumbnail.path + character.thumbnail.extension}
              alt={character.name}
            />
            <div className="character-info">
              <p>{character.name}</p>
              <button>❤️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
