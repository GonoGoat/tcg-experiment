import { create } from 'zustand'

import { setLoadingState, setActiveTab } from './reducers'
import { AppState } from "types/context.types"
import { ACTIVE_TAB } from 'types/global.enum'

const useAppStore =  create<AppState>((set) => ({
    isLoading: false,
    activeTab: ACTIVE_TAB.STATS,

    setLoadingState : (payload: boolean) => set((state) => setLoadingState(state, payload)),
    setActiveTab : (payload: ACTIVE_TAB) => set((state) => setActiveTab(state, payload))
}))

export default useAppStore