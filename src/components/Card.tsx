import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useMatch } from 'react-router-dom'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { db } from '../firebase'
import StorageService from '../services/storage'
import { isSelectedCardSelector, selectedCardState } from '../store'
import { CardType } from '../types'

type Props = {
  value: CardType
}

const Card: React.FC<Props> = (props) => {
  const match = useMatch('/room/:roomId')
  const roomId = match?.params.roomId

  if (typeof roomId === 'undefined') {
    throw new Error()
  }

  const setSelectedCardState = useSetRecoilState(selectedCardState)
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

  /* ========== Styles ========== */
  const cardStyle = css`
    transition: all 0.2s ease-in-out;

    &:hover {
      margin-top: -12px;
    }
  `

  return (
    <Box
      css={cardStyle}
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
