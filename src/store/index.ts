import { atom, useAtom } from 'jotai'
import type { CardType } from '../types'

export const selectedCardState = atom<CardType>('')
export const isSelectedCard = (card: CardType) => {
  const [selectedCard] = useAtom(selectedCardState)
  return card === selectedCard
}
