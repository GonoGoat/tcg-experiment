import React from 'react'
import shortid from 'shortid'

import Card from '../Card'
import BlankCard from '../BlankCard'

import './deck.css'

import useDeckStore from '../../Zustand/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    
    return (
        <div className="deck">
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
    )
   
}

export default Deck