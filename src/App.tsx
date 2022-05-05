import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import './App.css'

import Top from './pages/Top'
import Room from './pages/Room'

function App() {
  return (
    <div className="App">
      <Container maxW="1124">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
