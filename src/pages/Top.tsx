import { Heading } from '@chakra-ui/react'
import { css } from '@emotion/react'
import type React from 'react'

import splashImg from '../assets/images/splash.svg'
import CreateRoomButton from '../components/CreateRoomButton'
import JoinRoomButton from '../components/JoinRoomButton'

const Top: React.FC = () => {
  /* ========== Styles ========== */
  const rootStyle = css`
    position: relative;
    padding: 16px;
  `

  const splashImageStyle = css`
    position: absolute;
    top: 48px;
    right: 192px;
    width: 800px;
  `

  const mainContainerStyle = css`
    position: absolute;
    top: 168px;
    left: 168px;
  `

  const titleCustomFontStyle = css`
    font-family: 'Playlist';
  `

  const descriptionStyle = css`
    margin-top: 32px;
    color: #808080;
  `

  const buttonGroupStyle = css`
    margin-top: 32px;
  `

  return (
    <div css={rootStyle}>
      <img css={splashImageStyle} src={splashImg} alt="main image"></img>

      <div css={mainContainerStyle}>
        <Heading as="h2" size="4xl">
          More Simple, <br />
          Be <span css={titleCustomFontStyle}>Agile</span>
        </Heading>

        <p css={descriptionStyle}>
          Collaborate with you team, easy to estimate.
        </p>

        <div css={buttonGroupStyle}>
          <CreateRoomButton />
          <JoinRoomButton />
        </div>
      </div>
    </div>
  )
}

export default Top
