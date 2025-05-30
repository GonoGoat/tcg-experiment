import { StatState } from 'types/context.types'
import { MARKERS } from 'types/global.enum'

export function setActiveMarker(state: StatState, payload: MARKERS | '') {
    return ({
        ...state,
        activeMarker: payload
    })
}