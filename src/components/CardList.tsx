import { Flex } from '@chakra-ui/react'
import type React from 'react'

import { CARDS } from '../const'
import Card from './Card'

const Cards: React.FC = () => {
  return (
    <Flex align="center" justifyContent="space-between" mt="16px">
      {CARDS.map((card) => {
        return <Card key={card} value={card} />
      })}
    </Flex>
  )
}

export default Cards
