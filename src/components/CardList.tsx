import React from 'react'
import { Flex } from '@chakra-ui/react'

import Card from './Card'
import { CARDS } from '../const'

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
