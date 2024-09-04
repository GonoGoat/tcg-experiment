export function addMarker (state, id) {
    if (state.markers.hasOwnProperty(id)) { // If the card has markers already
        for (const marker of state.markers[id]) { // Check every marker of the card
            if (marker === state.activeMarker) return state // End the process if the marker has already the given marker
        }
        return {
            ...state,
            markers : {
                ...state.markers,
                [id]: state.markers[id].toSpliced(state.markers[id].length, 0, state.activeMarker)
            }
        } 
    }
    else { // If the card has no marker yet
        return {
            ...state,
            markers : {
                ...state.markers,
                [id]:  [state.activeMarker]
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

export function removeMarker (state, id, newMarker) {
    if (state.markers.hasOwnProperty(id)) { // If the card has markers already
        for (const marker of state.markers[id]) { // Check every marker of the card
            if (marker === newMarker) return state // End the process if the marker has already the given marker
        }
        return {
            ...state,
            markers : {
                ...state.markers,
                [id]: state.markers[id].toSpliced(state.markers[id].length, 0, newMarker)
            }
        } 
    }
    else { // If the card has no marker yet
        return {
            ...state,
            markers : {
                ...state.markers,
                [id]:  [newMarker]
            }
        } 
    }
}