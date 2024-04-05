import { create } from 'zustand'
import reducer from '../Reducers'

const store =  create((set) => ({
    lister: [],
    isLoading: false,
    hasMoreItemsToLoad: false,
    nextPageToLoad: ''
}))

export default store