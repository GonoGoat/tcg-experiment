import { create } from 'zustand'
import * as reducer from './reducers'

import data from "../../res/data.json"

const useDeckStore =  create((set) => ({
    main: [],
    extra: [],
    side: [],
    bank: data.data.data, // []
    markers : {},
    
    addCard : (payload, zone) => set(state => reducer.addCard(state,payload, zone)),
    removeCard : (payload, zone, index) => set(state => reducer.removeCard (state, payload, zone, index)),
    eraseDeck : () => set(state => reducer.eraseDeck(state)),
    eraseBank : () => set(state => reducer.eraseBank(state)),
    addMarker : (payload, marker) => set(state => reducer.addMarker(state, payload.id, marker))
}))

export default useDeckStore