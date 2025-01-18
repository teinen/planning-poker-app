import { NotAllowedIcon } from '@chakra-ui/icons'
import { Button, useDisclosure } from '@chakra-ui/react'
import { doc, updateDoc } from 'firebase/firestore'
import type React from 'react'
import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router'

import { db } from '../firebase'
import CloseRoomModal from './CloseRoomModal'

const CloseRoomButton: React.FC = () => {
  const navigate = useNavigate()
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCloseRoomButtonClick = async () => {
    try {
      if (!roomId) {
        throw new Error()
      }

      setIsLoading(true)
      const roomDocRef = doc(db, 'rooms', roomId)

      await updateDoc(roomDocRef, {
        active: false,
      })

      navigate('/')
    } catch (_error) {
      setIsLoading(false)
      console.log('Close room is failed')
    }
  }

  return (
    <>
      <Button
        variant="outline"
        colorScheme="red"
        ml="16px"
        width="110px"
        onClick={onOpen}
      >
        <NotAllowedIcon mr="8px" />
        Close
      </Button>

      <CloseRoomModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        handleCloseRoomButtonClick={handleCloseRoomButtonClick}
      />
    </>
  )
}

export default CloseRoomButton
