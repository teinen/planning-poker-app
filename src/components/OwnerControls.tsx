import { RepeatIcon, ViewIcon } from '@chakra-ui/icons'
import { Button, Tooltip } from '@chakra-ui/react'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import type React from 'react'
import { useMatch } from 'react-router'

import { useSetAtom } from 'jotai'
import { db } from '../firebase'
import { selectedCardState } from '../store'
import CloseRoomButton from './CloseRoomButton'

const OwnerControls: React.FC = () => {
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const setSelectedCardState = useSetAtom(selectedCardState)

  const handleRevealButtonClick = async () => {
    try {
      const roomDocRef = doc(db, 'rooms', roomId)

      await updateDoc(roomDocRef, {
        revealed: true,
      })
    } catch (_error) {
      console.log('Reveal has failed')
    }
  }

  const handleResetButtonClick = async () => {
    const batch = writeBatch(db)

    const q = query(collection(db, 'rooms', roomId, 'participants'))
    const querySnapshot = await getDocs(q)

    for (const doc of querySnapshot.docs) {
      batch.update(doc.ref, { estimate: '' })
    }

    const roomDocRef = doc(db, 'rooms', roomId)
    batch.update(roomDocRef, { revealed: false })

    await batch.commit()

    setSelectedCardState('')
  }

  return (
    <>
      <Tooltip hasArrow label="Show all estimates">
        <Button
          colorScheme="blue"
          onClick={handleRevealButtonClick}
          width="220px"
        >
          <ViewIcon mr="8px" />
          Reveal
        </Button>
      </Tooltip>

      <Tooltip hasArrow label="Reset all estimates">
        <Button
          variant="outline"
          colorScheme="blue"
          ml="16px"
          width="110px"
          onClick={handleResetButtonClick}
        >
          <RepeatIcon mr="8px" />
          Reset
        </Button>
      </Tooltip>

      <CloseRoomButton />
    </>
  )
}

export default OwnerControls
