import { CopyIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Tooltip, useToast } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { type DocumentData, deleteDoc, doc } from 'firebase/firestore'
import type React from 'react'
import { useState } from 'react'

import userIcon from '../assets/images/user.svg'
import { db } from '../firebase'

type Props = {
  roomId: string
  isOwner: boolean
  participants: DocumentData[]
}

const RoomSidebar: React.FC<Props> = (props) => {
  const [isRoomIdCopied, setIsRoomIdCopied] = useState(false)
  const [isRoomUrlCopied, setIsRoomUrlCopied] = useState(false)

  const toast = useToast()

  const roomUrl = `${window.location.href}`

  const handleCopyRoomIdButtonClick = () => {
    navigator.clipboard.writeText(props.roomId)
    setIsRoomIdCopied(true)
  }

  const handleCopyRoomUrlButtonClick = () => {
    navigator.clipboard.writeText(roomUrl)
    setIsRoomUrlCopied(true)
  }

  const handleKickParticipantButtonClick = async (
    participant: DocumentData,
  ) => {
    const confirmResult = window.confirm(
      `Are you sure want to kick '${participant.name}'?`,
    )

    if (confirmResult === false) {
      return
    }

    const participantDocRef = doc(
      db,
      'rooms',
      props.roomId,
      'participants',
      participant.id,
    )

    try {
      await deleteDoc(participantDocRef)

      toast({
        title: `'${participant.name}' was kicked successfully.'`,
        status: 'success',
        position: 'top',
        isClosable: true,
      })
    } catch (error) {
      window.alert('Failed to kick participant. Please try again.')
    }
  }

  /* ========== Styles ========== */
  const rootStyle = css`
    width: 320px;
    height: 100%;
    border-right: 1px solid #d3d3d3;
    padding: 16px;
  `

  const roomIdBoxStyle = css`
    position: relative;
    padding-right: 36px;
  `

  const roomUrlBoxStyle = css`
    position: relative;
    padding-right: 36px;
  `

  const roomUrlTextStyle = css`
    overflow-y: scroll;
    word-wrap: initial;
  `

  const copyIconStyle = css`
    position: absolute;
    top: 12px;
    right: 12px;
  `

  const userListStyle = css`
    list-style: none;
    margin-top: 12px;
    font-size: 18px;
  `

  const userListItemStyle = css`
    display: flex;
    align-items: center;

    &:not(:first-of-type) {
      margin-top: 8px;
    }
  `

  const userIconStyle = css`
    width: 24px;
    height: 24px;
  `

  const userNameStyle = css`
    margin-left: 12px;
    font-weight: 600;
  `

  const roomOwnerIconStyle = css`
    width: 24px;
    height: 24px;
    margin-left: 8px;
  `

  const participantRightPaneStyle = css`
    margin-left: auto;
    display: flex;
    align-items: center;
  `

  const statusIconGroupStyle = css`
    margin-left: 4px;
    display: flex;
  `

  const statusIconStyle = css`
    width: 24px;
    height: 24px;
  `

  return (
    <aside css={rootStyle}>
      <Heading as="h2" size="md">
        Room info
      </Heading>

      <Box
        css={roomIdBoxStyle}
        mt="12px"
        padding="8px 12px"
        color=""
        bgColor="#e6e6e6"
        borderRadius="md"
      >
        {props.roomId}
        <Tooltip
          hasArrow
          label={isRoomIdCopied ? 'Copied!' : 'Copy'}
          placement="top"
          closeOnClick={false}
          onClose={() => setIsRoomIdCopied(false)}
        >
          <CopyIcon
            css={copyIconStyle}
            cursor="pointer"
            onClick={handleCopyRoomIdButtonClick}
          />
        </Tooltip>
      </Box>

      <Box
        css={roomUrlBoxStyle}
        mt="12px"
        padding="8px 12px"
        color=""
        bgColor="#e6e6e6"
        borderRadius="md"
      >
        <div css={roomUrlTextStyle}>{roomUrl}</div>
        <Tooltip
          hasArrow
          label={isRoomUrlCopied ? 'Copied!' : 'Copy'}
          placement="top"
          closeOnClick={false}
          onClose={() => setIsRoomUrlCopied(false)}
        >
          <CopyIcon
            css={copyIconStyle}
            cursor="pointer"
            onClick={handleCopyRoomUrlButtonClick}
          />
        </Tooltip>
      </Box>

      <Heading as="h2" size="md" mt="32px">
        Participants
      </Heading>

      <ul css={userListStyle}>
        {props.participants.map((p) => {
          return (
            <li key={p.id} css={userListItemStyle}>
              <img css={userIconStyle} src={userIcon} alt="User icon"></img>
              <span css={userNameStyle}>{p.name}</span>

              {p.owner === true ? (
                <Tooltip hasArrow placement="top" label="Room owner">
                  <svg
                    css={roomOwnerIconStyle}
                    fill="none"
                    stroke="#ffd700"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </Tooltip>
              ) : (
                <></>
              )}

              <div css={participantRightPaneStyle}>
                {/* Kick button for room owner */}
                {!p.owner && props.isOwner ? (
                  <Button
                    variant="ghost"
                    ml="auto"
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleKickParticipantButtonClick(p)}
                  >
                    kick
                  </Button>
                ) : (
                  <></>
                )}

                <div css={statusIconGroupStyle}>
                  {/* Not yet */}
                  <Tooltip hasArrow placement="top" label="Not yet">
                    <svg
                      css={statusIconStyle}
                      fill="none"
                      stroke={p.estimate === '' ? '#ff7f50' : '#d3d3d3'}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Tooltip>

                  {/* Did */}
                  <Tooltip hasArrow placement="top" label="I did !">
                    <svg
                      css={statusIconStyle}
                      fill="none"
                      stroke={p.estimate !== '' ? '#3cb371' : '#d3d3d3'}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Tooltip>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default RoomSidebar
