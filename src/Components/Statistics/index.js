import React, { useEffect } from 'react'
import {useState} from 'react'

import './statistics.css'
import { getClassName } from '../../res/utils'

import useAppStore from "../../Zustand/AppStore/store"
import useDeckStore from "../../Zustand/DeckStore/store"

const className = "statistics";

// Engine : Starter - Extender - (Brick)
// Non-Engine : Board Breaker - Hand Trap - (Defensive) - Consistency/Power card
const typeOfCard = //["Engine", "Non-Engine", "Starter", "Extender", "Hand Trap", "Board Breaker"]
["Engine", "Non-Engine"]

const Statistics =  () => {
    //const setLoadingState = useAppStore((state) => state.setLoadingState)
    const activeTab = useAppStore((state) => state.activeTab)

    const main = useDeckStore((state) => state.main)
    const extra = useDeckStore((state) => state.extra)
    const side = useDeckStore((state) => state.side)

    const [selectedMarker, setSelectedMarker] = useEffect()

    return (
        <div className={getClassName(activeTab,className)}>
            <div className='markers'>
                {typeOfCard.map( (marker, index) =>
                <div className={selectedMarker===index?}>
                
                </div>
            )
                }
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