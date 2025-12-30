import { create } from 'zustand'
import * as reducer from "./reducers"

import { VisualizerState } from 'types/context.types'
import { cardInfo } from 'types/ygopro.types'

const useVisualizerStore =  create<VisualizerState>((set) => ({
    card: {} as cardInfo,

    setCard: (payload) => set((state) => reducer.setCard(state, payload)),
}))

export default useVisualizerStore