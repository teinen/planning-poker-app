import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import {
  onSnapshot,
  query,
  collection,
  DocumentData,
  orderBy,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import CardList from '../components/CardList'
import OwnerControls from '../components/OwnerControls'
import ParticipantList from '../components/ParticipantList'
import { DEFAULT_NICKNAME } from '../const'
import { db } from '../firebase'
import StorageService from '../services/storage'

const Room: React.FC = () => {
  const navigate = useNavigate()

  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    navigate('/')
    return <></>
  }

  const [currentUser, setCurrentUser] = useState<DocumentData>()
  const [room, setRoom] = useState<DocumentData>()
  const [participants, setParticipants] = useState([] as DocumentData[])

  const [nicknameInput, setNicknameInput] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isJoining, setIsJoining] = useState(false)
  const toast = useToast()

  const isOwner = useMemo(() => {
    return currentUser?.owner === true
  }, [currentUser])

  const participantsQuery = query(
    collection(db, 'rooms', roomId, 'participants'),
    orderBy('createdAt', 'asc'),
  )

  useEffect(() => {
    const participantId = StorageService.getParticipantId()

    if (!participantId) {
      onOpen()
      return
    }

    const roomDocRef = doc(db, 'rooms', roomId)
    const participantDocRef = doc(
      db,
      'rooms',
      roomId,
      'participants',
      participantId,
    )

    getDoc(roomDocRef).then((docSnap) => {
      if (!docSnap.exists()) {
        navigate('/')
      }
    })

    getDoc(participantDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        setCurrentUser(docSnap.data())
      } else {
        onOpen()
      }
    })
  }, [])

  // Update room info
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'rooms', roomId),
      (querySnapshot) => {
        const result = querySnapshot.data()

        // Redirect to Top when room is deactivated
        if (isOwner !== true && result?.active !== true) {
          window.alert('This room is deactivated. Move to Top.')
          navigate('/')
        }

        setRoom(result)
        console.log('Room: ', result)
      },
    )
    return () => unsubscribe()
  }, [])

  // Update participants info
  useEffect(() => {
    const unsubscribe = onSnapshot(participantsQuery, (querySnapshot) => {
      const result: DocumentData[] = []

      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })

      setParticipants(result)
      console.log('Participants: ', result)
    })
    return () => unsubscribe()
  }, [])

  const handleNicknameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNicknameInput(e.target.value)
  }

  const handleLeaveButtonClick = () => {
    navigate('/')
  }

  const handleJoinRoomButtonClick = async () => {
    try {
      setIsJoining(true)

      const docRef = doc(db, 'rooms', roomId)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists() || docSnap.data().active === false) {
        throw new Error()
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
        title: 'Failed to join room',
        description: 'Go back to Top page.',
        status: 'error',
        position: 'top',
        isClosable: true,
        onCloseComplete: () => navigate('/'),
      })
    } finally {
      setIsJoining(false)
      onClose()
    }
  }

  /* ========== Styles ========== */
  const rootStyle = css`
    position: relative;
    text-align: center;
  `

  const roomIdStyle = css`
    margin-top: 8px;
  `

  const cardListSectionStyle = css`
    margin-top: 16px;
  `

  const participantListSectionStyle = css`
    margin-top: 16px;
  `

  const ownerControlsSectionStyle = css`
    margin-top: 16px;
  `

  return (
    <div css={rootStyle}>
      {isOpen ? (
        <div></div>
      ) : (
        <div>
          <Heading as="h1" size="lg">
            Room Page
          </Heading>

          <div css={roomIdStyle}>Room ID: {roomId}</div>

          <section css={cardListSectionStyle}>
            <Heading as="h2" size="md" mb="8px">
              Select your card
            </Heading>

            <CardList />
          </section>

          <section css={participantListSectionStyle}>
            <Heading as="h2" size="md">
              Participants
            </Heading>

            <ParticipantList room={room} participants={participants} />
          </section>

          <section css={ownerControlsSectionStyle}>
            {isOwner ? <OwnerControls /> : <></>}
          </section>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Join room</ModalHeader>

          <ModalBody>
            <FormControl>
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
            <Button variant="ghost" mr={3} onClick={handleLeaveButtonClick}>
              leave
            </Button>

            <Button
              isLoading={isJoining}
              colorScheme="cyan"
              color="white"
              onClick={handleJoinRoomButtonClick}
            >
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Room
