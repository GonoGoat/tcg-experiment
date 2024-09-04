import { create } from 'zustand'
import * as reducer from "./reducers"
// TODO : Update of addMarking to handleMarking
const useStatStore =  create((set) => ({
    markers: {},
    activeMarker: "",
    isRemovingMarker: false,

    handleMarking : (id, isRemoving) => set(state => isRemoving ? reducer.removeMarker(state, id) :  reducer.addMarker(state, id)),
    setActiveMarker : (payload) => set((state) => reducer.setActiveMarker(state, payload)),
}))

export default useStatStore