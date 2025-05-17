import { create } from 'zustand'

import {setLoadingState} from './reducers'
import {AppState} from "types/context.types"

const useAppStore =  create<AppState>((set) => ({
    isLoading: false,
    setLoadingState : (payload: boolean) => set((state) => setLoadingState(state, payload))
}))

export default useAppStore