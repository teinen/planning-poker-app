import { atom, selectorFamily } from 'recoil'

import type { CardType } from '../types'
import { RecoilAtomKeys, RecoilSelectorKeys } from './RecoilKeys'

/* ========== States ========== */
export const selectedCardState = atom<CardType>({
  key: RecoilAtomKeys.SELECTED_CARD_STATE,
  default: '',
})

/* ========== Selectors ========== */
export const isSelectedCardSelector = selectorFamily<boolean, CardType>({
  key: RecoilSelectorKeys.IS_SELECTED_CARD,
  get:
    (val) =>
    ({ get }) => {
      const selectedCard = get(selectedCardState)
      return val === selectedCard
    },
})
