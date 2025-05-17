import { genericCard } from "./ygopro.types"

export interface AppState {
    isLoading: boolean,
    setLoadingState: (payload: boolean) => void
}

// TODO main should have blank card or card
export interface DeckState {
    main: genericCard[],
    extra: genericCard[],
    side: genericCard[],
    bulk: genericCard[],

    addCardToDeck : (payload: genericCard) => void,
    removeCardFromDeck : (payload: string, index: number) => void,
    eraseDeck : () => void
}