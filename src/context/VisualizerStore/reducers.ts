import { VisualizerState } from 'types/context.types'
import { cardInfo } from "types/ygoOpenAPI.types"

export function setCard(state: VisualizerState, payload: cardInfo) {
    return ({
        ...state,
        card: payload,
    })
}