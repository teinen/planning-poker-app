import { atom, selector, selectorFamily, useSetRecoilState } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from './RecoilKeys'

export type CardType = '' | '1' | '2' | '3' | '5' | '8' | '13' | '21' | '?'

/* ========== States ========== */
const selectedCardState = atom<CardType>({
  key: RecoilAtomKeys.SELECTED_CARD_STATE,
  default: '',
})

/* ========== Selectors ========== */
const selectors = {
  useSelectedCard: selector<CardType>({
    key: RecoilSelectorKeys.SELECTED_CARD,
    get: ({ get }) => {
      return get(selectedCardState)
    },
  }),

  useIsSelectedCard: selectorFamily<boolean, CardType>({
    key: RecoilSelectorKeys.IS_SELECTED_CARD,
    get:
      (val) =>
      ({ get }) => {
        const selectedCard = get(selectedCardState)
        return val === selectedCard
      },
  }),
}

/* ========== Actions ========== */
const actions = {
  useUpdateSelectedCard: (newVal: CardType) => {
    const setState = useSetRecoilState(selectedCardState)
    setState(newVal)
  },
}

export const store = {
  selectors,
  actions,
}
