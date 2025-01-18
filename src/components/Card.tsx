import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { doc, updateDoc } from 'firebase/firestore'
import { useSetAtom } from 'jotai'
import type React from 'react'
import { useMatch } from 'react-router'

import { db } from '../firebase'
import StorageService from '../services/storage'
import { isSelectedCard, selectedCardState } from '../store'
import type { CardType } from '../types'

type Props = {
  value: CardType
}

const Card: React.FC<Props> = (props) => {
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const setSelectedCardState = useSetAtom(selectedCardState)

  const bgColor = isSelectedCard(props.value) ? '#8bd3f4' : '#e2e8f0'

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
      console.log('Failed to update estimate point.', error)
    }

    setSelectedCardState(props.value)
  }

  /* ========== Styles ========== */
  const cardStyle = css`
    transition: all 0.2s ease-in-out;
    border: 2px solid #c9cacb;
    color: #454341;

    &:hover {
      background-color: #8bd3f4;
      transform: translateY(-12px);
    }
  `

  const selectedCardStyle = isSelectedCard(props.value)
    ? css`
        border-color: #2eb1ec;
        background-color: #8bd3f4;
        transform: translateY(-12px);
      `
    : css``

  return (
    <Box
      css={[cardStyle, selectedCardStyle]}
      display="flex"
      justifyContent="center"
      alignItems="center"
      p="8px"
      w="80px"
      h="100px"
      bg={bgColor}
      borderRadius="md"
      fontSize="32px"
      fontWeight="400"
      cursor="pointer"
      onClick={handleClick}
    >
      {props.value}
    </Box>
  )
}

export default Card
