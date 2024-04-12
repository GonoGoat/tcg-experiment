/**
 * 
 * @param {string} type Card type
 * @returns true/false if this card type belongs to the extra deck
 */
const belongsToExtraDeck = (type) => {
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

export function addCardToDeck (state, payload) {
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

export function removeCardFromDeck (state, payload, index) {
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

export function eraseDeck (state) {
    return {
        ...state,
        main: [],
        extra: [],
        side: [],
        bulk: []
    }
}