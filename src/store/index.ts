import { atom, selectorFamily } from 'recoil'

import { RecoilAtomKeys, RecoilSelectorKeys } from './RecoilKeys'

export type CardType = '' | '1' | '2' | '3' | '5' | '8' | '13' | '21' | '?'

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
