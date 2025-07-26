import { AppState } from "types/context.types"
import { ACTIVE_TABS } from "types/global.enum"

export function setLoadingState(state: AppState, payload: boolean) {
    return ({
        ...state,
        isLoading : payload
    })
}

export function setActiveTab(state: AppState, payload: ACTIVE_TABS) {
    return ({
        ...state,
        activeTab : payload
    })
}