import { Container } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Room from './pages/Room'
import Top from './pages/Top'

function App() {
  const AppStyle = css`
    text-align: center;
  `

  return (
    <div css={AppStyle}>
      <RecoilRoot>
        <Container padding="16px" maxW="1124">
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
