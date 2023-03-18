import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CreateRoomModal from './CreateRoomModal'
import { DEFAULT_NICKNAME } from '../const'
import { db } from '../firebase'
import StorageService from '../services/storage'

const CreateRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const [nicknameInput, setNicknameInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

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
        revealed: false,
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
        owner: true,
        createdAt: serverTimestamp(),
      })

      StorageService.addParticipantId(addParticipantDocRef.id)

      navigator.clipboard.writeText(
        `${window.location.href}room/${addRoomDocRef.id}`,
      )

      toast({
        title: 'Room has created successfully!',
        description:
          'URL has copied to clipboard! Please share with your collaborators.',
        status: 'success',
        position: 'top',
        isClosable: true,
        duration: 5000,
      })

      navigate(`/room/${addRoomDocRef.id}`)
    } catch (error) {
      toast({
        title: 'Room creation is failed.',
        description: 'Please try again.',
        status: 'error',
        position: 'top',
        isClosable: true,
        onCloseComplete: () => setNicknameInput(''),
      })

      setIsLoading(false)
    }
  }

  const onModalCloseComplete = () => {
    setNicknameInput('')
  }

  return (
    <>
      <Button color="white" colorScheme="cyan" onClick={onOpen} width="172px">
        Create new room
      </Button>

      <CreateRoomModal
        isOpen={isOpen}
        isLoading={isLoading}
        nicknameInput={nicknameInput}
        onClose={onClose}
        handleNicknameInputChange={handleNicknameInputChange}
        handleCreateRoomButtonClick={handleCreateRoomButtonClick}
        onModalCloseComplete={onModalCloseComplete}
      />
    </>
  )
}

export default CreateRoomButton
