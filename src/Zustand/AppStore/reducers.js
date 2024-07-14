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

export function setClickZone(state, payload) {
    return ({
        ...state,
        clickZone : payload
    })
}