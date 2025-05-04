import React from 'react'

import '../assets/style/components/BlankCard.css'
import placeholder from '../assets/pictures/placeholder.png'
import useDeckStore from '../context/DeckStore/store'

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