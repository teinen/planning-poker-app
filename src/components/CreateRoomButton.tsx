import React from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { Button } from '@chakra-ui/react'
import { DEFAULT_NICKNAME } from '../const'

const CreateRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
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
        name: DEFAULT_NICKNAME,
        createdAt: serverTimestamp(),
      })

      navigate(`/room/${addRoomDocRef.id}`)
    } catch (error) {
      console.log('Room creation is failed.')
    }
  }

  return (
    <Button color="white" colorScheme="cyan" onClick={handleClick}>
      Create new room
    </Button>
  )
}

export default CreateRoomButton
