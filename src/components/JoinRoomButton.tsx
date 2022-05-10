import {
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DEFAULT_NICKNAME } from '../const'
import { db } from '../firebase'
import StorageService from '../services/storage'

const JoinRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const [roomIdInput, setRoomIdInput] = useState('')
  const [nicknameInput, setNicknameInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const handleRoomIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomIdInput(e.target.value)
  }

  const handleNicknameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNicknameInput(e.target.value)
  }

  const handleJoinRoomButtonClick = async () => {
    try {
      setIsLoading(true)

      const docRef = doc(db, 'rooms', roomIdInput)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        toast({
          title: 'Room does not exist.',
          description: 'Please check Room id again.',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
      } else if (docSnap.data().active === false) {
        toast({
          title: 'Room is already deactivated.',
          description: 'Please join another room, or create new one.',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
      } else {
        const participantsCollectionRef = collection(
          db,
          'rooms',
          docSnap.id,
          'participants',
        )

        const addParticipantDocRef = await addDoc(participantsCollectionRef, {
          name: nicknameInput !== '' ? nicknameInput : DEFAULT_NICKNAME,
          estimate: '',
          owner: false,
          createdAt: serverTimestamp(),
        })

        StorageService.addParticipantId(addParticipantDocRef.id)
        navigate(`/room/${docSnap.id}`)
      }
    } catch (error) {
      toast({
        title: 'Failed to get Room info.',
        description: 'Please try again.',
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
              <Input
                id="nickname"
                placeholder="Jane Doe"
                value={nicknameInput}
                onChange={handleNicknameInputChange}
              />
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
