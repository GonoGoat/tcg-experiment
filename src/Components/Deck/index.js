import React from 'react'
import shortid from 'shortid'
import Card from '../Card'
//import {useDispatch, useSelector} from 'react-redux'
import {useSelector} from 'react-redux'
import './deck.css'

const Deck = () => {
    //const dispatch = useDispatch()
    let main_deck = useSelector(state => state.deck.main)
    let extra_deck = useSelector(state => state.deck.extra)
    
    return (
        <div className="deck-container">
            <div className="deck">
                <div className="main">
                    {
                        main_deck.map( (card, index) => 
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
                        extra_deck.map( (card, index) => 
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
                        extra_deck.map( (card, index) => 
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
                        extra_deck.map( (card, index) => 
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
   
}

export default Deck