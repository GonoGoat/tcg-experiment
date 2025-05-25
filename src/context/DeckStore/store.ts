import { create } from 'zustand'

import * as reducer from './reducers'
import { DeckState } from 'types/context.types'

const useDeckStore =  create<DeckState>((set) => ({
    main: [],
    extra: [],

    dispatchCard : (payload) => set(state => reducer.dispatchCard(state, payload)),
    addCard : (payload, dest) => set(state => reducer.addCard(state, payload, dest)),
    removeCard : (index, source) => set(state => reducer.removeCard(state, index, source)),
    eraseDeck : () => set(state => reducer.eraseDeck(state)),
}))

export default useDeckStore