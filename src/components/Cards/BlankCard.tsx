import { FC } from 'react';

import { blankCardInfo } from 'types/ygoOpenAPI.types';
import 'assets/style/components/BlankCard.css'
import placeholder from 'assets/pictures/placeholder.png'
import useDeckStore from 'context/DeckStore/store'

interface BlankCardProps {
    isDraggable: boolean,
    index: number;
}

const BlankCard: FC<BlankCardProps> = ({isDraggable, index}) => {
    const addCardToDeck = useDeckStore(state => state.addCardToDeck)
    const removeCardFromDeck = useDeckStore(state => state.removeCardFromDeck)

    const blankCardPayload: blankCardInfo = {type: "blank"}
    
    return (
            <div
                className="blank-card"
            >
                <img
                    src={placeholder}
                    width="90px" 
                    height="120px" 
                    onClick={()=>isDraggable?
                        addCardToDeck(blankCardPayload)
                        :
                        removeCardFromDeck(blankCardPayload.type, index)
                    }
                    alt="Blank card"
                />
            </div>
    )
    
}

export default BlankCard