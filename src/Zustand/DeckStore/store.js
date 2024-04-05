import { create } from 'zustand'
import reducer from '../Reducers'

const store =  create((set) => ({
    main: [],
    extra: [],
    side: [],
    bulk: []
}))

export default store