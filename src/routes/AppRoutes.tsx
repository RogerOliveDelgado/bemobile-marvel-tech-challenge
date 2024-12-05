import Header from '@/layouts/Header'
import CharacterDetail from '@/pages/CharacterDetail/CharacterDetail'
import Home from '@/pages/Home/Home'
import React from 'react'
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

const Layout: React.FC = () => (
  <>
    <Header />
    <Outlet />
  </>
)

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="favorites" element={<Home />} />
        <Route path="character/:id" element={<CharacterDetail />} />
      </Route>
    </Routes>
  </Router>
)

export default AppRoutes
