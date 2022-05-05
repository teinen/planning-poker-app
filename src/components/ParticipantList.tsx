import { DocumentData } from 'firebase/firestore'
import React from 'react'

type Props = {
  participants: DocumentData[]
}

const ParticipantList: React.FC<Props> = (props) => {
  return (
    <ul>
      {props.participants.map((participant) => (
        <li key={participant.id}>{participant.name}</li>
      ))}
    </ul>
  )
}

export default ParticipantList
