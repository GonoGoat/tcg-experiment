export function setLoadingState(state, payload) {
    return ({
        ...state,
        isLoading : payload
    })
}