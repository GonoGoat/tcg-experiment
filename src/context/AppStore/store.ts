import { create } from 'zustand'
import {setLoadingState} from './reducers'

interface AppState {
    isLoading: boolean,
    setLoadingState: (payload: boolean) => void
}

const useAppStore =  create((set) => ({
    isLoading: false,
    setLoadingState : (payload: boolean) => set((state) => setLoadingState(state, payload))
}))

export default useAppStore