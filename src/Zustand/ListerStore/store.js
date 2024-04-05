import { create } from 'zustand'
import * from '../Reducers'

const store =  create((set) => ({
    lister: [],
    hasMoreItemsToLoad: false,
    nextPageToLoad: ''
}))

export default store