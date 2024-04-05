import { create } from 'zustand'
import reducer from '../Reducers'

const store =  create((set) => ({
    isLoading: false,
}))

export default store