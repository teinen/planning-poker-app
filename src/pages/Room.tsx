import React from 'react'
import { useMatch } from 'react-router-dom'

const Room: React.FC = () => {
  const match = useMatch('/room/:roomId')

  return (
    <div>
      Room Page
      <br />
      Room ID: {match?.params.roomId}
    </div>
  )
}

export default Room
