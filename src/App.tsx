import { Container } from '@chakra-ui/react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import './App.css'

import Room from './pages/Room'
import Top from './pages/Top'

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Container maxW="1124">
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </Container>
      </RecoilRoot>
    </div>
  )
}

export default App
