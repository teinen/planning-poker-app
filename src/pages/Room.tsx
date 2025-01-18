import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import {
  type DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import CardList from '../components/CardList'
import EstimatedCardList from '../components/EstimatedCardList'
import OwnerControls from '../components/OwnerControls'
import RoomSidebar from '../components/RoomSidebar'
import Statistics from '../components/Statistics'
import { DEFAULT_NICKNAME } from '../const'
import { db } from '../firebase'
import StorageService from '../services/storage'
import { selectedCardState } from '../store'

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

  const setSelectedCardState = useSetRecoilState(selectedCardState)

  const isOwner = useMemo(() => {
    return currentUser?.owner === true
  }, [currentUser])

  const isRevealed = useMemo(() => {
    return room?.revealed === true
  }, [room])

  const participantsQuery = query(
    collection(db, 'rooms', roomId, 'participants'),
    orderBy('createdAt', 'asc'),
  )

  // Open room page
  useEffect(() => {
    const storageParticipantId = StorageService.getParticipantId()

    if (!storageParticipantId) {
      onOpen()
      return
    }

    const roomDocRef = doc(db, 'rooms', roomId)
    const participantDocRef = doc(
      db,
      'rooms',
      roomId,
      'participants',
      storageParticipantId,
    )

    getDoc(roomDocRef).then((docSnap) => {
      if (!docSnap.exists()) {
        window.alert('Room that you want to join does not exist.')
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

        // Reset the card being pressed
        if (!isOwner && result?.revealed === false) {
          setSelectedCardState('')
        }

        setRoom(result)
      },
    )
    return () => unsubscribe()
  }, [])

  // Update participants info
  useEffect(() => {
    const unsubscribe = onSnapshot(participantsQuery, (querySnapshot) => {
      const result: DocumentData[] = []

      for (const doc of querySnapshot.docs) {
        result.push({ id: doc.id, ...doc.data() })
      }

      setParticipants(result)
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
      }
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
    } catch (_error) {
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
    display: flex;
    height: 100%;
  `

  const mainStyle = css`
    padding: 16px 32px;
    flex-grow: 1;
  `

  const cardListSectionStyle = css`
    margin-top: 16px;
  `

  const estimatedCardListSectionStyle = css`
    margin-top: 32px;
  `

  const statisticsSectionStyle = css`
    margin-top: 16px;
  `

  const ownerControlsSectionStyle = css`
    margin-top: 32px;
  `

  return (
    <div css={rootStyle}>
      {isOpen ? (
        <div />
      ) : (
        <>
          <RoomSidebar
            roomId={roomId}
            isOwner={isOwner}
            participants={participants}
          />

          <div css={mainStyle}>
            <Heading as="h2" size="lg">
              Let&apos;s enjoy Planning Poker !!
            </Heading>

            <section css={cardListSectionStyle}>
              <Heading as="h3" size="md" mb="8px">
                Select your card
              </Heading>

              <CardList />
            </section>

            <section css={estimatedCardListSectionStyle}>
              <Heading as="h3" size="md">
                Estimates
              </Heading>

              <EstimatedCardList
                participants={participants}
                isRevealed={isRevealed}
              />
            </section>

            <section css={statisticsSectionStyle}>
              <Statistics participants={participants} isRevealed={isRevealed} />
            </section>

            <section css={ownerControlsSectionStyle}>
              {isOwner ? <OwnerControls /> : <></>}
            </section>
          </div>
        </>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
      >
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
