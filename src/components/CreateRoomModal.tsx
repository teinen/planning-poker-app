import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  isOpen: boolean
  isLoading: boolean
  nicknameInput: string
  onClose: () => void
  handleNicknameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCreateRoomButtonClick: () => Promise<void>
  onModalCloseComplete: () => void
}

const CreateRoomModal: React.FC<Props> = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseComplete={props.onModalCloseComplete}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new room</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Alert status="info" variant="left-accent">
            <AlertIcon />
            You will be the room owner.
          </Alert>

          <FormControl mt="16px">
            <FormLabel htmlFor="nickname">Nickname</FormLabel>
            <Input
              id="nickname"
              placeholder="John Doe"
              value={props.nicknameInput}
              onChange={props.handleNicknameInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
            cancel
          </Button>

          <Button
            isLoading={props.isLoading}
            colorScheme="cyan"
            color="white"
            onClick={props.handleCreateRoomButtonClick}
          >
            Create room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateRoomModal
