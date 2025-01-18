import {
  Alert,
  AlertIcon,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import type React from 'react'

type Props = {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  handleCloseRoomButtonClick: () => Promise<void>
}

const CloseRoomModal: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="red">Are you sure ?</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            This operation can&apos;t be reverted.
          </Alert>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
            Cancel
          </Button>

          <Button
            isLoading={props.isLoading}
            colorScheme="red"
            color="white"
            onClick={props.handleCloseRoomButtonClick}
          >
            Close room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CloseRoomModal
