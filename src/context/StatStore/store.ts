import { create } from 'zustand'
import * as reducer from "./reducers"

import { StatState } from 'types/context.types'
import { MARKER, MARKING_MODE } from 'types/global.enum'

const useStatStore =  create<StatState>((set) => ({
    markers: {},
    activeMarker: MARKER.DEFAULT,
    markingMode: MARKING_MODE.INACTIVE,

    enableMarking: (payload) => set((state) => reducer.enableMarking(state, payload)),
    disableMarking: () => set((state) => reducer.disableMarking(state)),
    handleMarking: (id) => set((state) => reducer.handleMarking(state, id)),
    setMarkingMode: (payload) => set((state) => reducer.setMarkingMode(state, payload)),
    resetMarkings: () => set((state) => reducer.resetMarkings(state)),
    removeCardFromMarkings: (id) => set((state) => reducer.removeCardFromMarkings(state, id)),
}))

export default useStatStore