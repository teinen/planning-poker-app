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
  useToast,
} from '@chakra-ui/react'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import type React from 'react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DEFAULT_NICKNAME } from '../const'
import { db } from '../firebase'
import StorageService from '../services/storage'

const JoinRoomButton: React.FC = () => {
  const navigate = useNavigate()

  const [roomIdInput, setRoomIdInput] = useState('')
  const [nicknameInput, setNicknameInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Modal states
  const initialFocusRef = useRef(null)
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
          onCloseComplete: () => setRoomIdInput(''),
        })
      } else if (docSnap.data().active === false) {
        toast({
          title: 'Room is already deactivated.',
          description: 'Please join another room, or create new one.',
          status: 'error',
          position: 'top',
          isClosable: true,
          onCloseComplete: () => setRoomIdInput(''),
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
    } catch (_error) {
      toast({
        title: 'Failed to get Room info.',
        description: 'Please try again.',
        status: 'error',
        position: 'top',
        isClosable: true,
        onCloseComplete: () => setRoomIdInput(''),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onModalCloseComplete = () => {
    setRoomIdInput('')
  }

  return (
    <>
      <Button
        colorScheme="cyan"
        variant="outline"
        onClick={onOpen}
        ml="16px"
        width="172px"
      >
        Join room
      </Button>

      <Modal
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={onModalCloseComplete}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join existing room</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="room-id">Room id</FormLabel>
              <Input
                id="room-id"
                ref={initialFocusRef}
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
              Cancel
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
