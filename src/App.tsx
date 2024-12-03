import MainLayout from '@/layouts/MainLayout'
import AppRoutes from '@/routes/AppRoutes'
import React from 'react'

const App: React.FC = () => {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  )
}

export default App
