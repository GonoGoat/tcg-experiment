import { create } from 'zustand'
import * as reducer from "./reducers"

const useAppStore =  create((set) => ({
    isLoading: false,
    activeTab: "search",

    setLoadingState : (payload) => set((state) => reducer.setLoadingState(state, payload)),
    setActiveTab : (payload) => set((state) => reducer.setActiveTab(state, payload)),
}))

export default useAppStore