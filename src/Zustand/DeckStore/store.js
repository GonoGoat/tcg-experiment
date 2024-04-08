import { create } from 'zustand'
import * as reducer from './reducers'

const useDeckStore =  create((set) => ({
    main: [],
    extra: [],
    side: [],
    bulk: [],

    addCardToDeck : (payload) => set(state => reducer.addCardToDeck(state,payload)),
    removeCardFromDeck : (payload, index) => set(state => reducer.removeCardFromDeck(state,payload, index)),
    eraseDeck : () => set(state => reducer.eraseDeck(state)),
}))

export default useDeckStore