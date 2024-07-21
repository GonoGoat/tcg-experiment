const belongsToExtraDeck = (type,zone) => {
    if ((        
        type === 'XYZ Monster' ||
        type === 'Pendulum Effect Fusion Monster' ||
        type === 'Synchro Monster' ||
        type === 'Synchro Pendulum Effect Monster' ||
        type === 'Synchro Tuner Monster' ||
        type === 'XYZ Pendulum Effect Monster' ||
        type === 'Fusion Monster' ||
        type === 'Link Monster'
    ) && zone === "main") return "extra"
    else return zone
}

// TODO : Handle card/deck size limit
export function addCard (state, payload, zone) {
    console.log(state)
    let key = belongsToExtraDeck(payload.type,zone)
    console.log(zone)

    return {
        ...state,
        [key]:[...state[key], payload]
    }
}

export function removeCard (state, payload, zone, index) {
    let key = belongsToExtraDeck(payload.type,zone)

    return {
        ...state,
        [key]: [...state[key].slice(0,index).concat(state[key].slice(index+1))]
    }
}

// TODO : Centraliser fonction pour toutes les zones
export function eraseDeck (state) {
    return {
        ...state,
        main: [],
        extra: [],
        side: [],
    }
}

export function eraseBank (state) {
    return {
        ...state,
        bank : []
    }
}