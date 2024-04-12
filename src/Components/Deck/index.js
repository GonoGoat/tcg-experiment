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
    const bulk = useDeckStore(state => state.bulk)
    
    return (
        <div className="deck">
                <div className="main">
                    {
                        main.map( (card, index) =>card.type === "blank"?
                            <BlankCard 
                                index={index}  
                                key={shortid.generate()} 
                            />
                            :
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}           
                            />
                        )
                    }
                </div>
                <div className="extra">
                    {
                        extra.map( (card, index)  =>card.type === "blank"?
                            <BlankCard 
                                index={index}  
                                key={shortid.generate()} 
                            />
                            :
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}            
                            />
                        )
                    }
                </div>
                <div className="side">
                    {
                        side.map( (card, index)  =>card.type === "blank"?
                            <BlankCard 
                                index={index}  
                                isDraggable={false}
                                key={shortid.generate()} 
                            />
                            :
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}            
                            />
                        )
                    }
                </div>
                <div className="bulk">
                    {
                        bulk.map( (card, index) => 
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}
                            />
                        )
                    }
                </div>
        </div>
    )
   
}

export default Deck