import comics from '@/mockData/comics.json'
import React from 'react'
import './CharacterDetail.module.css'

const CharacterDetail: React.FC = () => {
  return (
    <div className="character-detail">
      <img
        src="/path/to/character.jpg"
        alt="Character Name"
        className="banner"
      />
      <h1>Adam Warlock</h1>
      <p>
        Created by the Enclave to be part of a race of superhumans who would
        abolish war, illness, and crime, Adam Warlock is a unique being...
      </p>
      <h2>Comics</h2>
      <div className="comics">
        {comics.map((_, index) => (
          <div key={index} className="comic-card">
            <img src="/path/to/comic.jpg" alt="Comic Name" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CharacterDetail
