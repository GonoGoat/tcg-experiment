import React from 'react'

import 'assets/style/pages/Statistics.css'

import useDeckStore from "context/DeckStore/store"
//import useStatStore from 'context/StatStore/store'

const Statistics =  () => {

    const main = useDeckStore((state) => state.main)
    const extra = useDeckStore((state) => state.extra)
    const side = useDeckStore((state) => state.side)

    return (
        <div className="statistics">
            <div>
                <h3>Statistics</h3>
            </div>
            <div>
                <span><strong>Main size:</strong> {main.length}</span><br/>
                <span><strong>Extra size:</strong> {extra.length}</span><br/>
                <span><strong>Side size:</strong> {side.length}</span><br/>
            </div>
        </div>
    )
}

export default Statistics