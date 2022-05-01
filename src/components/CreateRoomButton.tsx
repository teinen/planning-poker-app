import React from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { Button } from '@chakra-ui/react'

const CreateRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const clickHandler = async () => {
    try {
      const roomsCollectionRef = collection(db, 'rooms')
      const addRoomDocRef = await addDoc(roomsCollectionRef, {
        active: true,
        createdAt: serverTimestamp(),
      })

      const participantsCollectionRef = collection(
        db,
        'rooms',
        addRoomDocRef.id,
        'participants',
      )
      const addParticipantDocRef = await addDoc(participantsCollectionRef, {
        name: 'Anonymous',
        createdAt: serverTimestamp(),
      })

      navigate(`/room/${addRoomDocRef.id}`)
    } catch (error) {
      console.log('Room creation is failed.')
    }
  }

  return (
    <Button color="white" colorScheme="cyan" onClick={clickHandler}>
      Create new room
    </Button>
  )
}

export default CreateRoomButton
