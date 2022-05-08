import { onSnapshot, query, collection, DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'

import CardList from '../components/CardList'
import ParticipantList from '../components/ParticipantList'
import { db } from '../firebase'


const Room: React.FC = () => {
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const [participants, setParticipants] = useState([] as DocumentData[])

  const q = query(collection(db, 'rooms', roomId, 'participants'))

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
      </div>
    </>
  )
}

export default Room
