import React from 'react'
import shortid from 'shortid'

import Card from '../Card'
import BlankCard from '../BlankCard'

import './deck.css'

import useDeckStore from '../../Zustand/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)
    
    // TODO : Split each zone in its own component
    // TODO : Handle marker display + change the onClick when marker mode is on
    // TODO : Differentiate blank cards (Marker goes on one) and other cards (marker goes on every card of same id) => "key" props
    const getCards = (map, dest) => {
        return map.map( (card, index) =>card.type === "blank"?
            <BlankCard 
                index={index}  
                key={index}
                id={shortid.generate()}
                source={dest}
            />
            :
            <Card 
                cardInfo={card}
                key={index}
                index={index} 
                source={dest}
                isHandlingMarking          
            />
        )
    }
    
    return (
        <div className="deck">
            <div className="main" tabIndex="0">
                {getCards(main, "main")}
            </div>
            <div className="extra" tabIndex="0">
                {getCards(extra, "extra")}
            </div>
            <div className="side" tabIndex="0">
                {getCards(side, "side")}
            </div>
        </div>
    )
   
}

export default Deck