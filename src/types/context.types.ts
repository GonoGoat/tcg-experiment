import { genericCard, cardInfo } from "./ygopro.types"
import { CARD_ZONES } from "./global.enum"

export interface AppState {
    isLoading: boolean,
    setLoadingState: (payload: boolean) => void
}

export interface DeckState {
    main: genericCard[],
    extra: genericCard[],

    dispatchCard: (payload: genericCard) => void
    addCard: (payload: genericCard, dest: CARD_ZONES) => void,
    removeCard: (index: number, source: CARD_ZONES) => void,
    eraseDeck: () => void
}

export interface ListerState {
    lister: cardInfo[],
    hasMoreItemsToLoad: boolean,
    nextPageToLoad: string,

    setListerItems : (payload: cardInfo[]) => void,
    addListerItems : (payload: cardInfo[]) => void,
    setHasMoreItemsToLoad : (payload: boolean) => void,
    setNextPageToLoad : (payload: string) => void
}