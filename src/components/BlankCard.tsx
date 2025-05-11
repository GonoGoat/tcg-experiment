import { FC } from 'react';

import 'assets/style/components/BlankCard.css'
import placeholder from 'assets/pictures/placeholder.png'
import useDeckStore from 'context/DeckStore/store'

interface BlankCardProps {
    isDraggable: boolean,
    index?: number;
}

const BlankCard: FC<BlankCardProps> = ({isDraggable, index}) => {
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