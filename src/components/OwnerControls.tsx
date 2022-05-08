import { Button, Tooltip } from '@chakra-ui/react'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import { db } from '../firebase'

const OwnerControls: React.FC = () => {
  const navigate = useNavigate()

  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const handleResetButtonClick = async () => {
    const batch = writeBatch(db)

    const q = query(collection(db, 'rooms', roomId, 'participants'))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.forEach((doc) => {
      batch.set(doc.ref, { ...doc.data(), estimate: '' })
    })

    await batch.commit()
  }

  const handleCloseButtonClick = async () => {
    try {
      const roomDocRef = doc(db, 'rooms', roomId)

      await updateDoc(roomDocRef, {
        active: false,
      })

      navigate('/')
    } catch (error) {
      console.log('Close room is failed')
    }
  }

  return (
    <>
      <Tooltip hasArrow label="Reset all estimates">
        <Button colorScheme="green" onClick={handleResetButtonClick}>
          Reset
        </Button>
      </Tooltip>

      <Tooltip hasArrow label="Close this room, when planning has finished">
        <Button
          variant="outline"
          colorScheme="red"
          ml="16px"
          onClick={handleCloseButtonClick}
        >
          Close
        </Button>
      </Tooltip>
    </>
  )
}

export default OwnerControls
