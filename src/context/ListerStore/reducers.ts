import { ListerState } from "types/context.types"
import { cardInfo } from "types/ygopro.types"

export function setListerItems(state: ListerState, payload: cardInfo[]) {
    return {
        ...state,
        lister : [...payload]
    }
}

export function addListerItems(state: ListerState, payload: cardInfo[]) {
    return {
        ...state,
        lister: [...state.lister, ...payload]
    }
}

export function setHasMoreItemsToLoad (state: ListerState, payload: boolean) {
    return {
        ...state,
        hasMoreItemsToLoad: payload
    }
}

export function setNextPageToLoad (state: ListerState, payload: string) {
    return {
        ...state,
        nextPageToLoad: payload
    }
}