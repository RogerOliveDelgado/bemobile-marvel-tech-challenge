import Header from '@/layouts/Header'
import CharacterDetail from '@/pages/CharacterDetail/CharacterDetail'
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Favorites from '../pages/Favorites/Favorites'
import Home from '../pages/Home/Home'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
