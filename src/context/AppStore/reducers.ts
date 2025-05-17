import { AppState } from "types/context.types"

export function setLoadingState(state: AppState, payload: boolean) {
    return ({
        ...state,
        isLoading : payload
    })
}