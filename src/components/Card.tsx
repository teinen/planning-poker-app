import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box } from '@chakra-ui/react'

import { CardType, isSelectedCardSelector, selectedCardState } from '../store'

type Props = {
  value: CardType
}

const Card: React.FC<Props> = (props) => {
  const [_, setSelectedCardState] = useRecoilState(selectedCardState)
  const isSelectedCard = useRecoilValue(isSelectedCardSelector(props.value))

  const bgColor = isSelectedCard ? 'green.200' : 'gray.200'

  const handleClick = () => {
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
      onClick={handleClick}
    >
      {props.value}
    </Box>
  )
}

export default Card
