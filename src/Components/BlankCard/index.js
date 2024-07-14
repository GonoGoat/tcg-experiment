import React from 'react'
import './blank_card.css'
import placeholder from '../../res/placeholder.png'
import useDeckStore from '../../Zustand/DeckStore/store'

const BlankCard = ({isInLister, index, zone}) => {
    const addCard = useDeckStore(state => state.addCard)
    const removeCard = useDeckStore(state => state.removeCard)
    
    return (
            <div
                className="blank-card" 
                tabIndex="0"
            >
                <img
                    src={placeholder}
                    width="90px" 
                    height="120px" 
                    onClick={()=>isInLister?
                        addCard({type : "blank"},zone)
                        :
                        removeCard("blank", zone, index)
                    }
                    alt="Blank card"
                />
            </div>
    )
    
}


export default BlankCard