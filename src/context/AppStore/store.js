import { create } from 'zustand'
import {setLoadingState} from './reducers'

const useAppStore =  create((set) => ({
    isLoading: false,
    setLoadingState : (payload) => set((state) => setLoadingState(state, payload))
}))

export default useAppStore