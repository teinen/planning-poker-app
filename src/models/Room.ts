import type { FieldValue } from 'firebase/firestore'

export interface RoomDoc {
  active: boolean
  createdAt: FieldValue
}

export interface RoomData extends RoomDoc {
  id: string
}
