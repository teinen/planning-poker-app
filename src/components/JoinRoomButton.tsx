import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const JoinRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const [roomIdInput, setRoomIdInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const handleRoomIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomIdInput(e.target.value)
  }

  const handleJoinRoomButtonClick = async () => {
    try {
      setIsLoading(true)

      const docRef = doc(db, 'rooms', roomIdInput)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        navigate(`/room/${docSnap.id}`)
      } else {
        toast({
          title: 'Room does not exist. Please check Room id again.',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Failed to get Room info.',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button colorScheme="cyan" variant="outline" onClick={onOpen}>
        Join room
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join existing room</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="room-id">Room id</FormLabel>
              <Input
                id="room-id"
                placeholder="Room id"
                value={roomIdInput}
                onChange={handleRoomIdInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="nickname">Nickname</FormLabel>
              <Input id="nickname" placeholder="Nickname" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              cancel
            </Button>

            <Button
              isLoading={isLoading}
              colorScheme="cyan"
              color="white"
              isDisabled={roomIdInput === ''}
              onClick={handleJoinRoomButtonClick}
            >
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default JoinRoomButton
