import { create } from 'zustand'
import * as reducer from "./reducers"

const useStatStore =  create((set) => ({
    markers: {},
    activeMarker: "",

    addMarker : (payload, marker) => set(state => reducer.addMarker(state, payload.id, marker)),
    setActiveMarker : (payload) => set((state) => reducer.setActiveMarker(state, payload)),
}))

export default useStatStore