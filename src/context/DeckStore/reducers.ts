import { DeckState } from "types/context.types"
import { genericCard } from "types/ygopro.types"
import { CARD_ZONES, ED_MONSTER_TYPES } from "types/global.enum"

/**
 * @param {string} type Card type
 * @returns true/false if this card type belongs to the extra deck
 */
function belongsToExtraDeck (type: string) {
    return(new RegExp(Object.values(ED_MONSTER_TYPES).map(type => `(${type})`).join('|')).test(type.toLowerCase()))
}

function deckStateParser (card: genericCard) {
    return {
        [card.id]: {
            card: card,
            count: 1
        }
    }
}

/** TODO : Handle card/deck size limit
 * Add a card to a specific destination
 * @param state Deck state
 * @param payload Card to be added
 * @param dest Where to send the card
 * @returns State with a new card in the destination collection
 */
export function addCard (state: DeckState, payload: genericCard, dest: CARD_ZONES) {
    /*return {
        ...state,
        [dest]: [...state[dest], payload]
    }*/
          return {
        ...state,
        main: {},
        extra: {},
        side: {}
    }
}

/**
 * Dispatch a card between the main deck and the extra deck based on the card type
 * @param state Deck state
 * @param payload Card to be added
 * @returns State with a new card in either main deck or extra deck
 */
export function dispatchCard (state: DeckState, payload: genericCard) {
    /*if (belongsToExtraDeck(payload.type)){
        return {
            ...state,
            extra: [...state.extra, payload]
        }
    } 
    else {
        return {
            ...state,
            main: [...state.main, payload]
        }
    }*/
          return {
        ...state,
        main: {},
        extra: {},
        side: {}
    }
}

/**
 * Remove a card from a specific source collection
 * @param state Deck state
 * @param index Index of the card to be removed
 * @param source Where to remove the card
 * @returns State with a card removed from the source collection
 */
export function removeCard (state: DeckState, index: number, source: CARD_ZONES) {
    /*return {
        ...state,
        [source]: [...state[source].slice(0,index).concat(state[source].slice(index+1))]
    }*/
       return {
        ...state,
        main: {},
        extra: {},
        side: {}
    }
}

// TODO handle remove per deck
export function eraseDeck (state: DeckState) {
    return {
        ...state,
        main: {},
        extra: {},
        side: {}
    }
}