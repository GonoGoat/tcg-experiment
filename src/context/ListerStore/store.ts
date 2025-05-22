import { create } from 'zustand'
import * as reducer from "./reducers"

import { ListerState } from 'types/context.types'

const useListerStore =  create<ListerState>((set) => ({
    lister: [],
    hasMoreItemsToLoad: false,
    nextPageToLoad: '',

    setListerItems : (payload) => set(state => reducer.setListerItems(state,payload)),
    addListerItems : (payload) => set(state => reducer.addListerItems(state,payload)),
    setHasMoreItemsToLoad : (payload) => set(state => reducer.setHasMoreItemsToLoad(state,payload)),
    setNextPageToLoad : (payload) => set(state => reducer.setNextPageToLoad(state,payload)) 
}))

export default useListerStore