import { create } from 'zustand'
import * as reducer from './reducers'

import data from "../../res/data.json"

const useDeckStore =  create((set) => ({
    main: data.data.data,
    extra: [],
    side: [],
    bank: data.data.data, // []
    
    addCard : (payload, zone) => set(state => reducer.addCard(state,payload, zone)),
    removeCard : (payload, zone, index) => set(state => reducer.removeCard (state, payload, zone, index)),
    eraseDeck : () => set(state => reducer.eraseDeck(state)),
    eraseBank : () => set(state => reducer.eraseBank(state)),
}))

export default useDeckStore