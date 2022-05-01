import React, { useState } from 'react'
import { useMatch } from 'react-router-dom'
import { onSnapshot, query, collection, DocumentData } from 'firebase/firestore'

import { db } from '../firebase'

const Room: React.FC = () => {
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const [participants, setParticipants] = useState([] as DocumentData[])

  const q = query(collection(db, 'rooms', roomId, 'participants'))

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    setParticipants([])

    const result: DocumentData[] = []

    querySnapshot.forEach((doc) => {
      result.push(doc.data())
    })

    setParticipants(result)
  })

  return (
    <>
      Room Page
      <br />
      Room ID: {match?.params.roomId}
      <br />
      <div>
        <h3>Participants</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Room
