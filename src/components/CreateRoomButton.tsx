import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DEFAULT_NICKNAME } from '../const'
import { db } from '../firebase'
import StorageService from '../services/storage'

const CreateRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const [nicknameInput, setNicknameInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleNicknameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNicknameInput(e.target.value)
  }

  const handleCreateRoomButtonClick = async () => {
    try {
      setIsLoading(true)

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
        name: nicknameInput !== '' ? nicknameInput : DEFAULT_NICKNAME,
        estimate: '',
        createdAt: serverTimestamp(),
      })

      StorageService.addParticipantId(addParticipantDocRef.id)
      navigate(`/room/${addRoomDocRef.id}`)
    } catch (error) {
      console.log('Room creation is failed.')
    }
  }

  return (
    <>
      <Button color="white" colorScheme="cyan" onClick={onOpen}>
        Create new room
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new room</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="nickname">Nickname</FormLabel>
              <Input
                id="nickname"
                placeholder="John Doe"
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
              onClick={handleCreateRoomButtonClick}
            >
              Create room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateRoomButton
