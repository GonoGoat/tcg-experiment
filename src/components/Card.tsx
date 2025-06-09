import {useState, FC, MouseEvent, KeyboardEvent} from 'react'
import Tooltip from '@mui/material/Tooltip'

import { CardDialog, CardPlaceholder } from "components"

import 'assets/style/components/Card.css'
import {cardInfo as cardType} from 'types/ygopro.types'

interface CardProps {
    cardInfo: cardType,
    index: number,
    children?: React.ReactNode,
    defaultMenu?: boolean,
    menuToggleMode?: boolean,
    extraClickHandler?: () => void
}

const Card: FC<CardProps> = ({cardInfo, index, children, defaultMenu = false, menuToggleMode = true, extraClickHandler = () => null}) => {
    const [isHovering, setHovering] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(defaultMenu);

    const img_url: string = cardInfo.card_images[0].image_url_small

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
        {cardInfo.atk?<span>ATK: {cardInfo.atk}<br/></span>:<></>}
        {cardInfo.def?<span>DEF: {cardInfo.def}<br/></span>:<></>}
        {cardInfo.desc?<span>Description: {cardInfo.desc}<br/></span>:<></>} 
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
                /*onClick={()=>isDraggable?
                    addCardToDeck(cardInfo)
                    :
                    //open?
                        null // no action if the dialog is up
                    //    :
                    //    removeCard(cardInfo,index)
                }*/
            >
                <CardPlaceholder img={img_url} name={cardInfo.name} clickHandler={e=>handleClick(e)}/>
                {menu ? children : <></>}
                <CardDialog open={open} KeyPressHandler={handleKeyPress} cardInfo={cardInfo}/>
            </div>
        </Tooltip>
    )
    
}

export default Card