export function handleMarking(state, id) {
    console.log(state.markers)
    var markers;
    if (state.isRemovingAllMarkers) markers = removeCardFromMarkers(state.markers, id) 
    else if (state.isRemovingMarker) markers = removeMarker(state.markers, id, state.activeMarker)
    else markers = addMarker(state.markers, id, state.activeMarker)
    return {
        ...state,
        markers: markers
    }
}

function removeCardFromMarkers(markers, id) {
    if (markers.hasOwnProperty(id)) {
        return (
            (({[id]:bulk, ...keep}) => keep) (markers)
        )
    }
    return markers
}

function addMarker (markers, id, activeMarker) {
    if (markers.hasOwnProperty(id)) { // If the card has markers already
        for (const marker of markers[id]) { // Check every marker of the card
            if (marker === activeMarker) return markers // End the process if the marker has already the given marker
        }

        // Add the selected marker to the others
        return {
            ...markers,
            [id]: markers[id].toSpliced(markers[id].length, 0, activeMarker)
        }
    }
    else { // If the card has no marker yet

        // Add the first marker to the card
        return {
            ...markers,
            [id]: [activeMarker]
        }
    }
}

export function setActiveMarker(state, payload) {
    return ({
        ...state,
        activeMarker: payload
    })
}

function removeMarker (markers, id, activeMarker) {
    if (markers.hasOwnProperty(id)) { // If the card has markers already
        for (const marker of markers[id]) { // Check every marker of the card

            if (marker === activeMarker) { // If the selected marker is given to the card
                
                if (markers[id].length === 1) { // If the selected marker is the last one of the card

                    // Remove the id of the card from marker collection
                    return removeCardFromMarkers(markers, id)
                }

                // Remove the marker among the others
                return {
                    ...markers,
                    [id]: markers[id].filter((mark => mark !== activeMarker))
                }
            }  
        }
    }
    return markers;
}

export function toggleRemovingMarker(state) {
    return ({
        ...state,
        isRemovingMarker: !state.isRemovingMarker,
        isRemovingAllMarkers: false 
    })
}

export function toggleRemovingAllMarkers(state) {
    return ({
        ...state,
        isRemovingAllMarkers: !state.isRemovingAllMarkers,
        isRemovingMarker: false
    })
}