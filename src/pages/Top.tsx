import { css } from '@emotion/react'
import React from 'react'

import CreateRoomButton from '../components/CreateRoomButton'
import JoinRoomButton from '../components/JoinRoomButton'

const createRoomButtonStyle = css`
  margin-top: 16px;
`

const Top: React.FC = () => {
  return (
    <>
      Planning Poker App (Alpha)
      <div css={createRoomButtonStyle}>hoge</div>
      <CreateRoomButton css={createRoomButtonStyle} />
      <br />
      <br />
      <JoinRoomButton />
    </>
  )
}

export default Top
