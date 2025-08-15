import { genericCard, cardInfo, genericCardWithCount } from  "./ygoOpenAPI.types"
import { CARD_ZONE, MARKER, MARKING_MODE, ACTIVE_TAB } from "./global.enum"

export interface AppState {
    isLoading: boolean,
    activeTab: ACTIVE_TAB

    setLoadingState: (payload: boolean) => void
    setActiveTab: (payload: ACTIVE_TAB) => void
}

export interface DeckState {
    main: Record<string, genericCardWithCount>,
    extra: Record<string, genericCardWithCount>,
    side: Record<string, genericCardWithCount>,
    bank: Record<string, genericCardWithCount>,

    dispatchCard: (payload: genericCard) => void
    addCard: (payload: genericCard, dest: CARD_ZONE) => void,
    removeCard: (cardId: string, source: CARD_ZONE) => void,
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
    markers: Record<string, MARKER[]>,
    activeMarker: MARKER,
    markingMode: MARKING_MODE,

    enableMarking: (payload: MARKER) => void,
    disableMarking: () => void,
    handleMarking: (id: string) => void
    setMarkingMode: (payload: MARKING_MODE) => void
    resetMarkings: () => void
    removeCardFromMarkings: (id: string) => void
}