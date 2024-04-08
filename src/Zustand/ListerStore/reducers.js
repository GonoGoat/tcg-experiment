export function setListerItems(state, payload) {
    return {
        ...state,
        lister : [...payload]
    }
}

export function addListerItems(state, payload) {
    return {
        ...state,
        lister: [...state.lister, ...payload]
    }
}

export function setHasMoreItemsToLoad (state, payload) {
    return {
        ...state,
        hasMoreItemsToLoad: payload
    }
}

export function setNextPageToLoad (state, payload) {
    return {
        ...state,
        nextPageToLoad: payload
    }
}