import { atom, selectorFamily } from 'recoil'

import { RecoilAtomKeys, RecoilSelectorKeys } from './RecoilKeys'
import { CardType } from '../types'

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
