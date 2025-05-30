import { create } from 'zustand'
import * as reducer from "./reducers"

import { StatState } from 'types/context.types'

const useStatStore =  create<StatState>((set) => ({
    markers: {},
    activeMarker: '',

    setActiveMarker: (payload) => set((state) => reducer.setActiveMarker(state, payload)),
}))

export default useStatStore