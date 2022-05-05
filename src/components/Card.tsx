import React from 'react'
import { Box } from '@chakra-ui/react'

import { CardType, store } from '../store'

type Props = {
  value: CardType
}

const Card: React.FC<Props> = (props) => {
  const handleClick = () => {
    store.actions.useUpdateSelectedCard(props.value)
    console.log(`selected value is ${store.selectors.useSelectedCard}`)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p="8px"
      w="60px"
      h="80px"
      bg="gray.200"
      onClick={handleClick}
    >
      {props.value}
    </Box>
  )
}

export default Card
