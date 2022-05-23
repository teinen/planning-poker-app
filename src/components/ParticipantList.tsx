import { StarIcon } from '@chakra-ui/icons'
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
} from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'
import React, { useMemo } from 'react'

import StorageService from '../services/storage'

type Props = {
  room: DocumentData | undefined
  participants: DocumentData[]
}

const ParticipantList: React.FC<Props> = (props) => {
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
        return !isNaN(Number(participant.estimate))
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
    <TableContainer m="auto" maxW="400px">
      <Table variant="striped">
        <Thead>
          <Tr>
            {/* <Td>Id</Td> */}
            <Td>Name</Td>
            <Td width="50%">Estimate</Td>
          </Tr>
        </Thead>

        <Tbody>
          {props.participants.map((participant) => (
            <Tr key={participant.id}>
              {/* <Td>{participant.id}</Td> */}
              <Td display="flex" alignItems="center">
                {participant.name}
                {participant.owner && <StarIcon ml="8px" color="gold" />}
              </Td>
              <Td isNumeric>{displayedEstimate(participant)}</Td>
            </Tr>
          ))}
        </Tbody>

        <Tfoot>
          <Tr>
            <Td></Td>
            <Td isNumeric>
              {`Average: ${isRevealed() ? average : '*'}`}
              <br />
              {`SD: ${isRevealed() ? sd : '*'}`}
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default ParticipantList
