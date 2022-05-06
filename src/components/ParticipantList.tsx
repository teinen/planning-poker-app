import React from 'react'
import { TableContainer, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'

type Props = {
  participants: DocumentData[]
}

const ParticipantList: React.FC<Props> = (props) => {
  return (
    <TableContainer m="auto" maxW="300px">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Td>Name</Td>
            <Td>Estimate</Td>
          </Tr>
        </Thead>

        <Tbody>
          {props.participants.map((participant) => (
            <Tr key={participant.id}>
              <Td>{participant.name}</Td>
              <Td>
                {participant.estimate !== '' ? participant.estimate : 'Not yet'}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ParticipantList
