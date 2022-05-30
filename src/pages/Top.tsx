import { css } from '@emotion/react'
import React from 'react'

import CreateRoomButton from '../components/CreateRoomButton'
import JoinRoomButton from '../components/JoinRoomButton'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Top: React.FC = () => {
  return (
    <div css={rootStyle}>
      <p>Planning Poker App (Alpha)</p>

      <CreateRoomButton />

      <JoinRoomButton />
    </div>
  )
}

export default Top
