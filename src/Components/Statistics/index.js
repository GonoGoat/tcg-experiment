import React, { useEffect } from 'react'
import {useState} from 'react'

import './statistics.css'
import { getClassName } from '../../res/utils'

import useAppStore from "../../Zustand/AppStore/store"
import useDeckStore from "../../Zustand/DeckStore/store"

const className = "statistics";

const Statistics =  () => {
    //const setLoadingState = useAppStore((state) => state.setLoadingState)
    const activeTab = useAppStore((state) => state.activeTab)

    const main = useDeckStore((state) => state.main)
    const extra = useDeckStore((state) => state.extra)
    const side = useDeckStore((state) => state.side)

    const [selectedMarker, setSelectedMarker] = useState(-1)

    return (
        <div className={getClassName(activeTab,className)}>
            <div className='markers'>
                {Object.keys(global.config.markers).map( (key, index) =>
                    <div className={selectedMarker===index?"selected":""} onMouseDown={() => setSelectedMarker(index===selectedMarker?-1:index)}>
                        {global.config.markers[key]}
                    </div>
                )}
            </div>
            <hr/>
            <div className='results'>
                <div>
                    <h3>Statistics</h3>
                </div>
                <div>
                    <span><strong>Main size:</strong> {main.length}</span><br/>
                    <span><strong>Extra size:</strong> {extra.length}</span><br/>
                    <span><strong>Side size:</strong> {side.length}</span><br/>
                </div>
            </div>
        </div>
    )
}

export default Statistics