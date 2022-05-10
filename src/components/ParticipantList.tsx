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

type Props = {
  participants: DocumentData[]
}

const ParticipantList: React.FC<Props> = (props) => {
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
              <Td isNumeric>
                {participant.estimate !== '' ? participant.estimate : 'Not yet'}
              </Td>
            </Tr>
          ))}
        </Tbody>

        <Tfoot>
          <Tr>
            <Td></Td>
            <Td isNumeric>
              {`Average: ${average}`}
              <br />
              {`SD: ${sd}`}
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default ParticipantList
