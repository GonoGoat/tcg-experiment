export function addMarker (state, id, newMarker) {
    if (state.markers.hasOwnProperty(id)) {
        for (const marker of state.markers[id]) {
            if (marker === newMarker) return state
        }
        return {
            ...state,
            markers : {
                ...state.markers,
                [id]: state.markers[id].toSpliced(state.markers[id].length, 0, newMarker)
            }
        } 
    }
}

export function setActiveMarker(state, payload) {
    return ({
        ...state,
        activeMarker : payload
    })
}