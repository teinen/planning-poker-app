import { Flex } from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'
import React, { useMemo } from 'react'

import StorageService from '../services/storage'
import EstimatedCard from './EstimatedCard'

type Props = {
  room: DocumentData | undefined
  participants: DocumentData[]
}

const EstimatedCardList: React.FC<Props> = (props) => {
  const isMe = (id: string): boolean => {
    return StorageService.getParticipantId() === id
  }

  const isRevealed = (): boolean => {
    return props.room?.revealed === true
  }

  const displayedEstimate = (p: DocumentData): string => {
    let result = ''

    if (isMe(p.id)) {
      result = p.estimate !== '' ? p.estimate : 'Not yet'
    } else {
      result = p.estimate !== '' ? (isRevealed() ? p.estimate : '*') : 'Not yet'
    }

    return result
  }

  const estimates: number[] = useMemo(() => {
    return props.participants
      .filter((participant) => {
        const num = Number(participant.estimate)
        // Number('') は 0 になるため除外
        return !isNaN(num) && num !== 0
      })
      .map((e) => Number(e.estimate))
  }, [props.participants])

  const average = useMemo(() => {
    const total = estimates.reduce((prev, current) => {
      return prev + current
    }, 0)

    // 小数点第一位まで
    return Math.round((total / estimates.length) * 10) / 10
  }, [estimates])

  const sd = useMemo(() => {
    // 分散
    const dist =
      estimates.reduce((prev, current) => {
        return prev + (current - average) ** 2
      }, 0) / estimates.length

    // 分散の平方根=標準偏差
    // 小数点第一位まで
    return Math.round(Math.sqrt(dist) * 10) / 10
  }, [estimates])

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
