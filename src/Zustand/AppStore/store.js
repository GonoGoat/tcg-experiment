import { create } from 'zustand'
import * as reducer from "./reducers"

const useAppStore =  create((set) => ({
    isLoading: false,
    activeTab: "",
    isMarkingCards: false,
    activeMarker: "",

    setLoadingState : (payload) => set((state) => reducer.setLoadingState(state, payload)),
    setActiveTab : (payload) => set((state) => reducer.setActiveTab(state, payload)),
    setMarkingCards : (payload) => set((state) => reducer.setMarkingCards(state, payload)),
    setActiveMarker : (payload) => set((state) => reducer.setActiveMarker(state, payload)),
}))

export default useAppStore