import { Flex } from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'
import React from 'react'

import EstimatedCard from './EstimatedCard'

type Props = {
  room: DocumentData | undefined
  participants: DocumentData[]
}

const EstimatedCardList: React.FC<Props> = (props) => {
  const isRevealed = (): boolean => {
    return props.room?.revealed === true
  }

  return (
    <Flex align="center" mt="16px">
      {props.participants.map((p) => {
        return (
          <EstimatedCard
            key={p.id}
            name={p.name}
            estimate={p.estimate}
            isRevealed={isRevealed()}
          />
        )
      })}
    </Flex>
  )
}

export default EstimatedCardList
