import React from 'react'

import CreateRoomButton from '../components/CreateRoomButton'
import JoinRoomButton from '../components/JoinRoomButton'

const Top: React.FC = () => {
  return (
    <div>
      Top Page
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
