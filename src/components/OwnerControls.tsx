import { Button, Tooltip } from '@chakra-ui/react'
import React from 'react'

const OwnerControls: React.FC = () => {
  const handleResetButtonClick = async () => {
    console.log('Click Reset')
  }

  return (
    <>
      <Tooltip hasArrow label="Reset all estimates">
        <Button colorScheme="green" onClick={handleResetButtonClick}>
          Reset
        </Button>
      </Tooltip>

      <Tooltip hasArrow label="Close this room, when planning has finished">
        <Button variant="outline" colorScheme="red" ml="16px">
          Close
        </Button>
      </Tooltip>
    </>
  )
}

export default OwnerControls
