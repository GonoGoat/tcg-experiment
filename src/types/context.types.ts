import { genericCard, cardInfo, genericCardWithCount } from  "./ygoOpenAPI.types"
import { CARD_ZONES, MARKERS, MARKING_MODE, ACTIVE_TABS } from "./global.enum"

export interface AppState {
    isLoading: boolean,
    activeTab: ACTIVE_TABS

    setLoadingState: (payload: boolean) => void
    setActiveTab: (payload: ACTIVE_TABS) => void
}

export interface DeckState {
    main: Record<string, genericCardWithCount>,
    extra: Record<string, genericCardWithCount>,
    side: Record<string, genericCardWithCount>,
    bank: Record<string, genericCardWithCount>,

    dispatchCard: (payload: genericCard) => void
    addCard: (payload: genericCard, dest: CARD_ZONES) => void,
    removeCard: (cardId: string, source: CARD_ZONES) => void,
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
    removeCardFromMarkings: (id: string) => void
}