import type { FieldValue } from 'firebase/firestore'

export interface ParticipantDoc {
  name: string
  createdAt: FieldValue
}

export interface ParticipantData extends ParticipantDoc {
  id: string
}
