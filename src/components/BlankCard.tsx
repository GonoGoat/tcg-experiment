import { FC, useState, useEffect } from 'react';

import { CardPlaceholder } from "components"

import 'assets/style/components/BlankCard.css'

interface BlankCardProps {
    index: number,
    children?: React.ReactNode,
    defaultMenu?: boolean,
    menuToggleMode?: boolean,
    extraClickHandler?: () => void
}

const BlankCard: FC<BlankCardProps> = ({index, children = <></>, defaultMenu = false, menuToggleMode = true, extraClickHandler = () => null}) => {
    const [menu, setMenu] = useState<boolean>(defaultMenu);

    // TODO remove blinking effect
    useEffect(() => {
        setMenu(defaultMenu)
    }, [defaultMenu])

    const handleClick = () => {
        extraClickHandler()
        setMenu(menuToggleMode ? !menu : menu)
    }
    
    
    // TODO different handlers on right/left click?
    return (
        <div className="blank-card">
            <CardPlaceholder name="Blank card" clickHandler={() => handleClick()}/>
            {menu ? children : <></>}
        </div>
    )
    
}

export default BlankCard