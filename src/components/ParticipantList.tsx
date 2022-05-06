import React, { useMemo } from 'react'
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
    return total / estimates.length
  }, [estimates])

  const sd = useMemo(() => {
    // 分散
    const dist =
      estimates.reduce((prev, current) => {
        return prev + (current - average) ** 2
      }, 0) / estimates.length

    // 分散の平方根=標準偏差
    return Math.sqrt(dist)
  }, [estimates])

  return (
    <TableContainer m="auto" maxW="300px">
      <Table variant="striped">
        <Thead>
          <Tr>
            {/* <Td>Id</Td> */}
            <Td>Name</Td>
            <Td>Estimate</Td>
          </Tr>
        </Thead>

        <Tbody>
          {props.participants.map((participant) => (
            <Tr key={participant.id}>
              {/* <Td>{participant.id}</Td> */}
              <Td>{participant.name}</Td>
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
