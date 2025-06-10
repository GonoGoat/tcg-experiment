import { genericCard, cardInfo } from "./ygopro.types"
import { CARD_ZONES, MARKERS, MARKING_MODE } from "./global.enum"

export interface AppState {
    isLoading: boolean,
    setLoadingState: (payload: boolean) => void
}

export interface DeckState {
    main: genericCard[],
    extra: genericCard[],
    side: genericCard[],

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

export interface StatState {
    markers: Record<string, MARKERS[]>,
    activeMarker: MARKERS,
    markingMode: MARKING_MODE,

    enableMarking: (payload: MARKERS) => void,
    disableMarking: () => void,
    handleMarking: (id: string) => void
    setMarkingMode: (payload: MARKING_MODE) => void
    resetMarkings: () => void
}