import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Todo from '@/pages/Todo'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/todos" element={<Todo />} />
    </Routes>
  )
}

export default App
