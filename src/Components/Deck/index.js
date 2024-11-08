import React from 'react'

import Card from '../Card'
import BlankCard from '../BlankCard'

import './deck.css'

import useDeckStore from '../../Zustand/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)
    
    // TODO : Split each zone in its own component
    const getCards = (map, dest) => {
        return map.map( (card, index) =>card.type === "blank"?
            <BlankCard 
                index={index}  
                key={index}
                id={card.id}
                source={dest}
            />
            :
            <Card 
                cardInfo={card}
                key={index}
                index={index} 
                source={dest}
            />
        )
    }
    
    return (
        <div className="deck">
            <div className="main" tabIndex="0">
                {getCards(main, global.config.sources.MAIN)}
            </div>
            <div className="extra" tabIndex="0">
                {getCards(extra, global.config.sources.EXTRA)}
            </div>
            <div className="side" tabIndex="0">
                {getCards(side, global.config.sources.SIDE)}
            </div>
        </div>
    )
   
}

export default Deck