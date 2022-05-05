import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

const Cards: React.FC = () => {
  const cards: string[] = ['1', '2', '3', '5', '8', '13', '21', '?']

  return (
    <>
      <Flex align="center" justifyContent="space-around">
        {cards.map((card) => {
          return (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p="8px"
              w="60px"
              h="80px"
              key={card}
              bg="gray.200"
            >
              {card}
            </Box>
          )
        })}
      </Flex>
    </>
  )
}

export default Cards
