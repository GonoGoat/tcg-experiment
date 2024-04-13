import React from 'react'
import './blank_card.css'
import placeholder from '../../res/placeholder.png'
import useDeckStore from '../../Zustand/DeckStore/store'

const BlankCard = ({isDraggable, index}) => {
    const addCardToDeck = useDeckStore(state => state.addCardToDeck)
    const removeCardFromDeck = useDeckStore(state => state.removeCardFromDeck)
    
    return (
            <div
                className="blank-card"
            >
                <img
                    src={placeholder}
                    width="90px" 
                    height="120px" 
                    onClick={()=>isDraggable?
                        addCardToDeck({type : "blank"})
                        :
                        removeCardFromDeck("blank",index)
                    }
                    alt="Blank card"
                />
            </div>
    )
    
}


export default BlankCard