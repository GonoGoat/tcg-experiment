export function setLoadingState(state, payload) {
    return ({
        ...state,
        isLoading : payload
    })
}

export function setActiveTab(state, payload) {
    return ({
        ...state,
        activeTab : payload
    })
}

export function setMarkingCards(state, payload) {
    return ({
        ...state,
        isMarkingCards : payload
    })
}

export function setActiveMarker(state, payload) {
    return ({
        ...state,
        activeMarker : payload
    })
}