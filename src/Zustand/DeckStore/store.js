import { create } from 'zustand'
import reducer from '../Reducers'

const store =  create((set) => ({
    lister: [],
    deck: {
        main: [],
        extra: [],
        side: [],
        bulk: []
    },
    isLoading: false,
    hasMoreItemsToLoad: false,
    nextPageToLoad: ''
}))

export default store