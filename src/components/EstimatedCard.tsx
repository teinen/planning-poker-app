import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import type React from 'react'

type Props = {
  name: string
  estimate: string
  isRevealed: boolean
}

const EstimatedCard: React.FC<Props> = (props) => {
  const bgColor = '#e2e8f0'

  /* ========== Styles ========== */
  const cardContainerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    &:not(:first-of-type) {
      margin-left: 32px;
    }
  `

  const cardStyle = css`
    border: 2px solid #c9cacb;
    color: #454341;
  `

  const hideIconStyle = css`
    width: 32px;
    height: 32px;
  `

  const nameStyle = css`
    margin-top: 8px;
  `

  return (
    <div css={cardContainerStyle}>
      <Box
        css={cardStyle}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="8px"
        w="80px"
        h="100px"
        bg={bgColor}
        borderRadius="md"
        fontSize="32px"
        fontWeight="400"
      >
        {props.isRevealed ? (
          <>{props.estimate}</>
        ) : (
          <svg
            css={hideIconStyle}
            fill="none"
            stroke="#a4a5a6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        )}
      </Box>

      <span css={nameStyle}>{props.name}</span>
    </div>
  )
}

export default EstimatedCard
