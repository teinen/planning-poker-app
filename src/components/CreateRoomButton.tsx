import React from 'react'

const CreateRoomButton: React.FC = () => {
  const clickHandler = () => {
    console.log("clicked")
  }

  return (
    <button onClick={clickHandler}>Create a new room</button>
  )
}

export default CreateRoomButton
