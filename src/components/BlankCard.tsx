import { FC, useState } from 'react';

import { blankCardInfo } from 'types/ygopro.types';
import 'assets/style/components/BlankCard.css'
import placeholder from 'assets/pictures/placeholder.png'
import useDeckStore from 'context/DeckStore/store'

interface BlankCardProps {
    isDraggable: boolean,
    index: number,
    children?: React.ReactNode
}

const BlankCard: FC<BlankCardProps> = ({isDraggable, index, children}) => {
    const [menu, setMenu] = useState(false);
    
    // TODO different handlers on right/left click?
    return (
            <div
                className="blank-card"
            >
                <img
                    src={placeholder}
                    width="90px" 
                    height="120px"
                    onMouseDown={() => setMenu(!menu)}
                    /*onClick={()=>isDraggable?
                        addCardToDeck(blankCardPayload)
                        :
                        removeCardFromDeck(blankCardPayload, index)
                    }*/
                    alt="Blank card"
                />
                {menu ? children : <></>}
            </div>
    )
    
}

export default BlankCard