import React from 'react'

import CreateRoomButton from '../components/CreateRoomButton'
import JoinRoomButton from '../components/JoinRoomButton'

const rootStyle = {
  padding: '16px 0',
}

const Top: React.FC = () => {
  return (
    <div style={rootStyle}>
      Planning Poker App (Alpha)
      <br />
      <br />
      <CreateRoomButton />
      <br />
      <br />
      <JoinRoomButton />
    </div>
  )
}

export default Top
