import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Top from './pages/Top'
import Room from './pages/Room'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  )
}

export default App
