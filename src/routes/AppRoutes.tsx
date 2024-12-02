import Header from '@/layouts/Header'
import comicsData from '@/mockData/comics.json'
import CharacterDetail from '@/pages/CharacterDetail/CharacterDetail'
import { Comic } from '@/pages/CharacterDetail/CharacterDetail'
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Favorites from '../pages/Favorites/Favorites'
import Home from '../pages/Home/Home'

const comics: Comic[] = comicsData as unknown as Comic[]

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/character"
          element={
            <CharacterDetail
              characterName="SuperHeroe"
              characterImage="/src/assets/images/heart-selected.svg"
              description="Sisome le super medicos"
              comics={comics}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
