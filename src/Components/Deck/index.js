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
    
    const getCards = (map, dest) => {
        return map.map( (card, index) =>card.type === "blank"?
            <BlankCard 
                index={index}  
                key={shortid.generate()}
                source={dest} 
            />
            :
            <Card 
                cardInfo={card}
                key={shortid.generate()} 
                index={index} 
                source={dest}          
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