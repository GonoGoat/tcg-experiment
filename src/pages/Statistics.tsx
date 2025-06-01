import React from 'react'

import 'assets/style/pages/Statistics.css'
import { MARKERS } from 'types/global.enum'
import useDeckStore from "context/DeckStore/store"
import useStatStore from 'context/StatStore/store'

const Statistics =  () => {

    const main = useDeckStore((state) => state.main)
    const extra = useDeckStore((state) => state.extra)
    const side = useDeckStore((state) => state.side)

    const activeMarker = useStatStore((state) => state.activeMarker)

    const enableMarking = useStatStore((state) => state.enableMarking)
    const disableMarking = useStatStore((state) => state.disableMarking)

    return (
        <div className="statistics">
            <div className='markers'>
                {Object.values(MARKERS).filter(value => value !== MARKERS.DEFAULT).map( (value, index) =>
                    <div
                        className={value === activeMarker ?"selected":""}
                        key={index} 
                        onMouseDown={value === activeMarker ? (() => disableMarking()) : (() => enableMarking(value))}
                    >
                        {value}
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