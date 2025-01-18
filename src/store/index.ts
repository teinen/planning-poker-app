import { atom } from 'jotai'

import type { CardType } from '../types'

/* ========== States ========== */
export const selectedCardState = atom<CardType>('')

/* ========== Selectors ========== */
export const isSelectedCardSelector = atom((get) => {
  const selectedCard = get(selectedCardState)
  return selectedCard !== ''
})
