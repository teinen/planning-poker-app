import { Flex } from '@chakra-ui/react'
import React from 'react'

import { CARDS } from '../const'
import Card from './Card'

const Cards: React.FC = () => {
  return (
    <>
      <Flex align="center" justifyContent="space-around">
        {CARDS.map((card) => {
          return <Card key={card} value={card} />
        })}
      </Flex>
    </>
  )
}

export default Cards
