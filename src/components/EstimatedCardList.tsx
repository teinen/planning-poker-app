import { Flex } from '@chakra-ui/react'
import type { DocumentData } from 'firebase/firestore'
import type React from 'react'

import EstimatedCard from './EstimatedCard'

type Props = {
  participants: DocumentData[]
  isRevealed: boolean
}

const EstimatedCardList: React.FC<Props> = (props) => {
  return (
    <Flex align="center" mt="16px">
      {props.participants.map((p) => {
        return (
          <EstimatedCard
            key={p.id}
            name={p.name}
            estimate={p.estimate}
            isRevealed={props.isRevealed}
          />
        )
      })}
    </Flex>
  )
}

export default EstimatedCardList
