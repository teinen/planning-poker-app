import React from 'react'
import { RecoilRoot } from 'recoil'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

import './App.css'

import Top from './pages/Top'
import Room from './pages/Room'

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
