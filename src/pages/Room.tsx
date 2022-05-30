import { Heading } from '@chakra-ui/react'
import { css } from '@emotion/react'
import {
  onSnapshot,
  query,
  collection,
  DocumentData,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import CardList from '../components/CardList'
import OwnerControls from '../components/OwnerControls'
import ParticipantList from '../components/ParticipantList'
import { db } from '../firebase'
import StorageService from '../services/storage'

const Room: React.FC = () => {
  const navigator = useNavigate()

  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    navigator('/')
    return <></>
  }

  const [currentUser, setCurrentUser] = useState<DocumentData>()
  const [room, setRoom] = useState<DocumentData>()
  const [participants, setParticipants] = useState([] as DocumentData[])

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
      return
    }

    const participantDocRef = doc(
      db,
      'rooms',
      roomId,
      'participants',
      participantId,
    )

    getDoc(participantDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        setCurrentUser(docSnap.data())
      } else {
        console.log('participant does not exist')
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
          navigator('/')
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

  /* ========== Styles ========== */
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
    <>
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
    </>
  )
}

export default Room
