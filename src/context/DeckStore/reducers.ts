import { DeckState } from "types/context.types"
import { genericCard, genericCardWithCount } from "types/ygoOpenAPI.types"
import { CARD_ZONES, ED_MONSTER_TYPES } from "types/global.enum"
import { removeStringKeyFromObject } from "utils/utils"

/**
 * @param {string} type Card type
 * @returns true/false if this card type belongs to the extra deck
 */
function belongsToExtraDeck (type: string) {
    return(new RegExp(Object.values(ED_MONSTER_TYPES).map(type => `(${type})`).join('|')).test(type.toLowerCase()))
}

function deckStateParser (card: genericCard, index: number) {
    return {
        [card.id]: {
            card: card,
            count: 1,
            addedDate: new Date()
        }
    }
}

function addCardToCollection (collection: Record<string,genericCardWithCount>, card: genericCard) {
    if (card.id.toString() in collection) {
        return {
            ...collection,
            [card.id]: {
                ...collection[card.id],
                count: collection[card.id.toString()].count + 1
            }
        }
    }
    else {
        return {
            ...collection,
            ...deckStateParser(card, Object.keys(collection).length)
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
    return {
        ...state,
        [dest]: addCardToCollection(state[dest], payload)
    }
}

/**
 * Dispatch a card between the main deck and the extra deck based on the card type
 * @param state Deck state
 * @param payload Card to be added
 * @returns State with a new card in either main deck or extra deck
 */
export function dispatchCard (state: DeckState, payload: genericCard) {
    let dest: CARD_ZONES = belongsToExtraDeck(payload.type) ? CARD_ZONES.EXTRA : CARD_ZONES.MAIN
    return {
        ...state,
        [dest]: addCardToCollection(state[dest], payload)
    }
}

/**
 * Remove a card from a specific source collection
 * @param state Deck state
 * @param index Index of the card to be removed
 * @param source Where to remove the card
 * @returns State with a card removed from the source collection
 */
export function removeCard (state: DeckState, cardId: string, source: CARD_ZONES) {
    let card = state[source][cardId]
    if (card.count === 1) {
        return {
            ...state,
            [source]: removeStringKeyFromObject(state[source], cardId)
        }
    }
    else {
        card.count -= 1;
        return {
            ...state,
            [source]: {
                ...(state[source]),
                [cardId]: card
            }
        }
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