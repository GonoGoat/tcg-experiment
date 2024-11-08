import { create } from 'zustand'
import * as reducer from "./reducers"

const useAppStore =  create((set) => ({
    isLoading: false,

    setLoadingState : (payload) => set((state) => reducer.setLoadingState(state, payload)),
}))

export default useAppStore