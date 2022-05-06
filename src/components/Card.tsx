import React from 'react'
import { useMatch } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { doc, updateDoc } from 'firebase/firestore'
import { Box } from '@chakra-ui/react'

import { db } from '../firebase'
import { CardType, isSelectedCardSelector, selectedCardState } from '../store'
import StorageService from '../services/storage'

type Props = {
  value: CardType
}

const Card: React.FC<Props> = (props) => {
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const [_, setSelectedCardState] = useRecoilState(selectedCardState)
  const isSelectedCard = useRecoilValue(isSelectedCardSelector(props.value))

  const bgColor = isSelectedCard ? 'green.200' : 'gray.200'

  const handleClick = async () => {
    try {
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

      await updateDoc(participantDocRef, {
        estimate: props.value,
      })
    } catch (error) {
      console.log('Failed to update estimate point.')
    }

    setSelectedCardState(props.value)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p="8px"
      w="60px"
      h="80px"
      bg={bgColor}
      cursor="pointer"
      onClick={handleClick}
    >
      {props.value}
    </Box>
  )
}

export default Card
