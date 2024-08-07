// TODO : Switch for Regex match ? 
const belongsToExtraDeck = (type,source) => {
    if (
        (
            (        
            type === 'XYZ Monster' ||
            type === 'Pendulum Effect Fusion Monster' ||
            type === 'Synchro Monster' ||
            type === 'Synchro Pendulum Effect Monster' ||
            type === 'Synchro Tuner Monster' ||
            type === 'XYZ Pendulum Effect Monster' ||
            type === 'Fusion Monster' ||
            type === 'Link Monster'
            ) 
            && (source === "main")
        ) 
        || source === "blank-extra"
    ) return "extra"
    else return source
}

// TODO : Handle card/deck size limit
export function addCard (state, payload, source) {
    console.log(state)
    let key = belongsToExtraDeck(payload.type,source)
    console.log(source)

    return {
        ...state,
        [key]:[...state[key], payload]
    }
}

export function removeCard (state, payload, source, index) {
    console.log(source)
    let key = belongsToExtraDeck(payload.type, source)
    console.log(key)

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