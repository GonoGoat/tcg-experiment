import { DeckState } from "types/context.types"
import { genericCard } from "types/ygopro.types"
import { CARD_ZONES } from "types/global.enum"

/**
 * TODO replace with REGEX
 * @param {string} type Card type
 * @returns true/false if this card type belongs to the extra deck
 */
const belongsToExtraDeck = (type: string) => {
    return(        
        type === 'XYZ Monster' ||
        type === 'Pendulum Effect Fusion Monster' ||
        type === 'Synchro Monster' ||
        type === 'Synchro Pendulum Effect Monster' ||
        type === 'Synchro Tuner Monster' ||
        type === 'XYZ Pendulum Effect Monster' ||
        type === 'Fusion Monster' ||
        type === 'Link Monster'
    )
}

export function addCard (state: DeckState, payload: genericCard, dest: CARD_ZONES) {
    return {
        ...state,
        [dest]: [...state[dest], payload]
    }
}

export function dispatchCard (state: DeckState, payload: genericCard) {
    if (belongsToExtraDeck(payload.type)){
        return {
            ...state,
            extra:[...state.extra, payload]
        }
    } 
    else {
        return {
            ...state,
            main: [...state.main, payload]
        }
    }
}

export function removeCardFromDeck (state: DeckState, payload: string, index:number) {
    if (belongsToExtraDeck(payload)){
        return {
            ...state,
            extra: [...state.extra.slice(0,index).concat(state.extra.slice(index+1))]
        }
    }
    else {
        return {
            ...state,
            main: [...state.main.slice(0,index).concat(state.main.slice(index+1))]
        }
    }
}

export function eraseDeck (state: DeckState) {
    return {
        ...state,
        main: [],
        extra: [],
        side: [],
        bulk: []
    }
}