import {
  onSnapshot,
  query,
  collection,
  DocumentData,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'

import CardList from '../components/CardList'
import OwnerControls from '../components/OwnerControls'
import ParticipantList from '../components/ParticipantList'
import { db } from '../firebase'
import StorageService from '../services/storage'

const useCurrentParticipant = (roomId: string) => {
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
      console.log(docSnap.data())
    } else {
      console.log('participant does not exist')
    }
  })
}

const Room: React.FC = () => {
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const [currentUser, setCurrentUser] = useState<DocumentData>()
  const [participants, setParticipants] = useState([] as DocumentData[])

  const isOwner = () => {
    return currentUser?.owner === true
  }

  const q = query(
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

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const result: DocumentData[] = []

      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })

      setParticipants(result)
      console.log(result)
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      Room Page
      <br />
      Room ID: {match?.params.roomId}
      <br />
      <div>
        <h2>Select your card</h2>
        <CardList />

        <br />

        <h2>Participants</h2>
        <ParticipantList participants={participants} />

        <br />

        {/* {isOwner() ?? <OwnerControls />} */}
        <OwnerControls />
      </div>
    </>
  )
}

export default Room
