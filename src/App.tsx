import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Todo from '@/pages/Todo'
import LoginPage from '@/pages/Login'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/todos" element={<Todo />} />
    </Routes>
  )
}

export default App
