import { FC, useState } from 'react';

import { CardPlaceholder } from "components"

import 'assets/style/components/BlankCard.css'

interface BlankCardProps {
    index: number,
    children?: React.ReactNode
}

const BlankCard: FC<BlankCardProps> = ({index, children = <></>}) => {
    const [menu, setMenu] = useState(false);
    
    // TODO different handlers on right/left click?
    return (
            <div className="blank-card">
                <CardPlaceholder name="Blank card" clickHandler={() => setMenu(!menu)}/>
                {menu ? children : <></>}
            </div>
    )
    
}

export default BlankCard