import { StatState } from 'types/context.types'
import { MARKERS, MARKING_MODE } from 'types/global.enum'

export function disableMarking(state: StatState) {
    let updatedState = setMarkingMode(state, MARKING_MODE.INACTIVE)
    return ({
        ...updatedState,
        activeMarker: MARKERS.DEFAULT,
    })
}

export function enableMarking(state: StatState, payload: MARKERS) {
    let updatedState = setMarkingMode(state, MARKING_MODE.ACTIVE)
    return ({
        ...updatedState,
        activeMarker: payload,
    })
}

export function setMarkingMode(state: StatState, payload: MARKING_MODE) {
    return ({
        ...state,
        markingMode: payload,
    })
}

export function handleMarking(state: StatState, id: string) {
    //var markers;
    //if (state.isRemovingAllMarkers) markers = removeCardFromMarkers(state.markers, id) 
    //else if (state.isRemovingMarker) markers = removeMarker(state.markers, id, state.activeMarker)
    var markers = addMarker(state.markers, id, state.activeMarker)
    return {
        ...state,
        markers: markers
    }
}

function addMarker (markers: Record<string, MARKERS[]>, id: string, activeMarker: MARKERS) {
    if (markers.hasOwnProperty(id)) { // If the card has markers already
        for (const marker of markers[id]) { // Check every marker of the card
            if (marker === activeMarker) return markers // End the process if the marker has already the given marker
        }

        // Add the selected marker to the others
        return {
            ...markers,
            [id]: [...(markers[id]), activeMarker]
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