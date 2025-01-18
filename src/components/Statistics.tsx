import { css } from '@emotion/react'
import type { DocumentData } from 'firebase/firestore'
import type React from 'react'
import { useMemo } from 'react'

type Props = {
  participants: DocumentData[]
  isRevealed: boolean
}

const Statistics: React.FC<Props> = (props) => {
  const estimates: number[] = useMemo(() => {
    return props.participants
      .filter((participant) => {
        const num = Number(participant.estimate)
        // Number('') は 0 になるため除外
        return !Number.isNaN(num) && num !== 0
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

  /* ========== Styles ========== */
  const containerStyle = css`
    font-size: 20px;
  `

  return (
    <div css={containerStyle}>
      <div>Average: {props.isRevealed ? average : '*'}</div>
      <div>SD: {props.isRevealed ? sd : '*'}</div>
    </div>
  )
}

export default Statistics
