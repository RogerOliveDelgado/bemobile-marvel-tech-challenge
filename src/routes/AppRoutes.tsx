import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CharacterDetail from '@/pages/Favorites/Favorites'
import Favorites from '../pages/Favorites/Favorites'
import Home from '../pages/Home/Home'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
