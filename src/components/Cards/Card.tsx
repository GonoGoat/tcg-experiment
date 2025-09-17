// Library imports
import { useState, FC, MouseEvent, KeyboardEvent } from 'react'
import Tooltip from '@mui/material/Tooltip'

// Component imports
import { CardDialog, CardPlaceholder } from "components/Cards"

// Style imports
import 'assets/style/components/Card.css'

// Enum/Interface/Type imports
import {cardInfo as cardType} from 'types/ygoOpenAPI.types'

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

    const TooltipDisplay = <div>
        {cardInfo.name?<span>Name: {cardInfo.name}<br/></span>:<></>}
        {cardInfo.level?<span>LV: {cardInfo.level}<br/></span>:<></>}
        {cardInfo.type?<span>Type: {cardInfo.type}<br/></span>:<></>}
        {cardInfo.race?<span>Race: {cardInfo.race}<br/></span>:<></>}
        {cardInfo.attribute?<span>Attribute: {cardInfo.attribute}<br/></span>:<></>}
        {cardInfo.attack?<span>ATK: {cardInfo.attack}<br/></span>:<></>}
        {cardInfo.defense?<span>DEF: {cardInfo.defense}<br/></span>:<></>}
        {cardInfo.description?<span>Description: {cardInfo.description}<br/></span>:<></>} 
    </div>    
    
    return (
        <Tooltip 
            title={TooltipDisplay}
            placement="right" 
            open={isHovering && !open} 
            onKeyDown={handleKeyPress}
        >
            <div
                className="card"
                onMouseOver={()=>setHovering(true)}
                onMouseOut={()=>setHovering(false)} 
            >
                <CardPlaceholder img={img_url} name={cardInfo.name} clickHandler={(e: MouseEvent)=>handleClick(e)}/>
                {menu ? children : <></>}
                <CardDialog open={open} KeyPressHandler={handleKeyPress} cardInfo={cardInfo}/>
            </div>
        </Tooltip>
    )
    
}

export default Card