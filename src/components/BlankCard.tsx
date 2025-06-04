import { FC, useState } from 'react';

import { CardPlaceholder } from "components"

import { blankCardInfo } from 'types/ygopro.types';
import 'assets/style/components/BlankCard.css'
import placeholder from 'assets/pictures/placeholder.png'
import useDeckStore from 'context/DeckStore/store'

interface BlankCardProps {
    index: number,
    children?: React.ReactNode
}

const BlankCard: FC<BlankCardProps> = ({index, children = <></>}) => {
    const [menu, setMenu] = useState(false);
    
    // TODO different handlers on right/left click?
    return (
            <div
                className="blank-card"
            >
                <CardPlaceholder name="Blank card" clickHandler={() => setMenu(!menu)}/>
                {menu ? children : <></>}
            </div>
    )
    
}

export default BlankCard