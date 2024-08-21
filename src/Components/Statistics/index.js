import React, { useEffect } from 'react'
import {useState} from 'react'

import './statistics.css'
import { getClassName } from '../../res/utils'

import useAppStore from "../../Zustand/AppStore/store"
import useDeckStore from "../../Zustand/DeckStore/store"
import useStatStore from '../../Zustand/StatStore/store'

const className = global.config.activeTabs.STATS;

const Statistics =  () => {
    //const setLoadingState = useAppStore((state) => state.setLoadingState)
    const activeTab = useAppStore((state) => state.activeTab)

    const main = useDeckStore((state) => state.main)
    const extra = useDeckStore((state) => state.extra)
    const side = useDeckStore((state) => state.side)

    const markers = useStatStore((state) => state.markers)
    const activeMarker = useStatStore((state) => state.activeMarker)
    const setActiveMarker = useStatStore((state) => state.setActiveMarker)

    function handleMarking (marker) {
        setActiveMarker(activeMarker===marker?"":marker)
    }

    // TODO : Handle display of markers for each card marked
    return (
        <div className={getClassName(activeTab,className)}>
            <div className='markers'>
                {Object.keys(global.config.markers).map( (key, index) =>
                    <div className={global.config.markers[key]===global.config.markers[activeMarker]?"selected":""} key={index} onMouseDown={() => handleMarking(key)}>
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
                {activeMarker}
                {Object.keys(markers).map((key, index) => {
                    
                })}
            </div>
        </div>
    )
}

export default Statistics