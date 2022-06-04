import { Heading } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import github from './assets/images/github.svg'
import Room from './pages/Room'
import Top from './pages/Top'

function App() {
  const headerHeight = 64
  const footerHeight = 42

  /* ========== Styles ========== */
  const headerStyle = css`
    height: ${headerHeight}px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    color: #00a0e8;
  `

  const containerStyle = css`
    height: calc(100vh - ${headerHeight}px - ${footerHeight}px);
    overflow: scroll;
  `

  const footerStyle = css`
    display: flex;
    color: #808080;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    height: ${footerHeight}px;
  `

  const footerLinkStyle = css`
    margin-left: 8px;
  `

  return (
    <>
      <header css={headerStyle}>
        <Heading as="h1" size="xl">
          <Link to="/">Ajapo</Link>
        </Heading>
      </header>

      <div css={containerStyle}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </RecoilRoot>
      </div>

      <footer css={footerStyle}>
        <span>&copy; 2022 teinen</span>
        <a
          css={footerLinkStyle}
          href="https://github.com/teinen"
          target="_blank"
          rel="noreferrer"
        >
          <img src={github}></img>
        </a>
      </footer>
    </>
  )
}

export default App
