import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Button } from '@chakra-ui/react'

const CreateRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const clickHandler = async () => {
    try {
      const addDocRef = await addDoc(collection(db, 'rooms'), {
        roomId: uuidv4(),
        active: true,
        createdAt: serverTimestamp(),
      })

      const docRef = doc(db, 'rooms', addDocRef.id)
      const docSnap = await getDoc(docRef)

      navigate(`/room/${docSnap.data()?.roomId}`)
    } catch (err) {
      console.log('Room creation is failed.')
    }
  }

  return (
    <Button colorScheme="blue" onClick={clickHandler}>
      Create new room
    </Button>
  )
}

export default CreateRoomButton
