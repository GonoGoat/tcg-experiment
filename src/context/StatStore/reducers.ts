import { StatState } from 'types/context.types'
import { MARKERS, MARKING_MODE } from 'types/global.enum'
import { removeStringKeyFromObject } from 'utils/utils'

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
    var markers;
    if (id in state.markers) { // If the card has markers already
        for (const marker of state.markers[id]) { // Check every marker of the card
            if (marker === state.activeMarker) {
                return {
                    ...state,
                    markers: removeMarker(state.markers, id, state.activeMarker)
                }
            }
        }
        markers = addMarker(state.markers, id, state.activeMarker)
    }
    else { // If the card has no marker yet
        markers = addNewMarker(state.markers, id, state.activeMarker)
    }
    
    return {
        ...state,
        markers: markers
    }
}

// Add the selected marker to the others
function addMarker (markers: Record<string, MARKERS[]>, id: string, activeMarker: MARKERS) {
    return {
        ...markers,
        [id]: [...(markers[id]), activeMarker]
    }
}

// Add the first marker to the card
function addNewMarker (markers: Record<string, MARKERS[]>, id: string, activeMarker: MARKERS) {
    return {
        ...markers,
        [id]: [activeMarker]
    }
}

// Remove the marker among the others
function removeMarker (markers: Record<string, MARKERS[]>, id: string, activeMarker: MARKERS) {           
    if (markers[id].length === 1) { // If the selected marker is the last one of the card
        return removeStringKeyFromObject(markers, id) // Remove the id of the card from marker collection
    }

    return {
        ...markers,
        [id]: markers[id].filter((mark => mark !== activeMarker))
    }
}

export function resetMarkings (state: StatState) {           
    return {
        ...state,
        markers: {}
    }
}

export function removeCardFromMarkings(state: StatState, id: string) {
    return {
        ...state,
        markers: removeStringKeyFromObject(state.markers, id)
    }
}