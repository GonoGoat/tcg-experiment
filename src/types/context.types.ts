import { genericCard, cardInfo } from "./ygopro.types"

export interface AppState {
    isLoading: boolean,
    setLoadingState: (payload: boolean) => void
}

export interface DeckState {
    main: genericCard[],
    extra: genericCard[],

    addCardToDeck : (payload: genericCard) => void,
    removeCardFromDeck : (payload: string, index: number) => void,
    eraseDeck : () => void
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