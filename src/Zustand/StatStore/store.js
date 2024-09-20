import { create } from 'zustand'
import * as reducer from "./reducers"

const useStatStore =  create((set) => ({
    markers: {},
    activeMarker: "",
    isRemovingMarker: false,
    isRemovingAllMarkers: false,

    handleMarking: (id) => set(state => reducer.handleMarking(state, id)),
    setActiveMarker: (payload) => set((state) => reducer.setActiveMarker(state, payload)),
    toggleRemovingMarker: () => set((state) => reducer.toggleRemovingMarker(state)), 
    toggleRemovingAllMarkers: () => set((state) => reducer.toggleRemovingAllMarkers(state)),
}))

export default useStatStore