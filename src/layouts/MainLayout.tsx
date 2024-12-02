import React from 'react'
import './MainLayout.module.css'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <main className="content">{children}</main>
    </div>
  )
}

export default MainLayout
