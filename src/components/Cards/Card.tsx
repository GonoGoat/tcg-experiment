// Library imports
import { useState, FC, MouseEvent, KeyboardEvent } from 'react'
import Tooltip from '@mui/material/Tooltip'

// Component imports
import { CardDialog, CardPlaceholder, CardDescription } from "components/Cards"

// Style imports
import 'assets/style/components/Card.css'

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygoOpenAPI.types'

interface CardProps {
    cardInfo: cardType,
    children?: React.ReactNode,
    defaultMenu?: boolean,
    menuToggleMode?: boolean,
    extraClickHandler?: () => void
}

const Card: FC<CardProps> = ({cardInfo, children, defaultMenu = false, menuToggleMode = true, extraClickHandler = () => null}) => {
    const [isHovering, setHovering] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
    const [menu, setMenu] = useState(defaultMenu);
    const img_url: string = cardInfo.image_url

    const handleClickOutsideDialog = () => {
        setOpen(false);
        setHovering(false)
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        setOpen(false);
        if (event.key !== "escapeKeyDown") {
            setHovering(false)
        }
    }

    const handleClick = (event: MouseEvent) => {
        setHovering(false) //disables tooltip
        if(event.buttons === 2){ //if right click opens modal
            setOpen(true)
            event.preventDefault()
        }
        else { // Middle and left click
            if (!open) {
                extraClickHandler()
                setMenu(menuToggleMode ? !menu : menu)
            }
        }
    }
    
    return (
        <Tooltip 
            title={<CardDescription cardInfo={cardInfo}/>}
            placement="right" 
            open={isHovering && !open} 
        >
            <div
                className="card"
                onMouseOver={()=>setHovering(true)}
                onMouseOut={()=>setHovering(false)} 
            >
                <CardPlaceholder img={img_url} name={cardInfo.name} clickHandler={(e: MouseEvent)=>handleClick(e)}/>
                {menu ? children : <></>}
                <CardDialog open={open} KeyPressHandler={handleKeyPress} cardInfo={cardInfo} OutsideClickHandler={handleClickOutsideDialog}/>
            </div>
        </Tooltip>
    )
    
}

export default Card