import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const CreateRoomButton: React.FC = () => {
  const clickHandler = async () => {
    try {
      const newRoomRef = await addDoc(collection(db, 'rooms'), {
        roomId: uuidv4(),
        active: true,
        createdAt: serverTimestamp(),
      })
      console.log('Room is successfully created. Room ID is ', newRoomRef)
    } catch (err) {
      console.log('Room creation is failed.')
    }
  }

  return <button onClick={clickHandler}>Create a new room</button>
}

export default CreateRoomButton
