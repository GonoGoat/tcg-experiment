import {useState, FC, MouseEvent, KeyboardEvent} from 'react'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'

import 'assets/style/components/Card.css'
import {cardInfo as cardType} from 'types/ygopro.types'
import placeholder from 'assets/pictures/placeholder.png'
import useDeckStore from 'context/DeckStore/store'

interface CardProps {
    cardInfo: cardType,
    isDraggable: boolean,
    index: number;
}

const Card: FC<CardProps> = ({cardInfo, isDraggable, index}) => {
    const [isHovering, setHovering] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
    const [menu, setMenu] = useState(false);

    const img_url: string = cardInfo.card_images[0].image_url_small

    const addCardToDeck = useDeckStore(state => state.dispatchCard)
    const removeCardFromDeck = useDeckStore(state => state.removeCard)

    const handleClickOpen = () => setOpen(true)
    const handleKeyPress = (event: KeyboardEvent) => {
        setOpen(false);
        if (event.key !== "escapeKeyDown") {
            setHovering(false)
        }
    }
    const handleClick = (event: MouseEvent) => {
        setHovering(false) //disables tooltip
        if(event.buttons === 2){ //if right click opens modal
            handleClickOpen()
            event.preventDefault()
            return false
        }
        else { // Middle and left click
            if (!open) {
                setMenu(!menu)
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

    const DialogDisplay = <div className="card-modal">
        {cardInfo.card_images[0].image_url?
            <img src={cardInfo.card_images[0].image_url} alt={cardInfo.name}/>
            :
            <img src={placeholder} alt={cardInfo.name}/>
        }
        <div>
            {cardInfo.name?<h6>{cardInfo.name}<br/></h6>:<></>}
            {cardInfo.level?<span>LV: {cardInfo.level}<br/></span>:<></>}
            {cardInfo.type?<span>Type: {cardInfo.type}<br/></span>:<></>}
            {cardInfo.race?<span>Race: {cardInfo.race}<br/></span>:<></>}
            {cardInfo.attribute?<span>Attribute: {cardInfo.attribute}<br/></span>:<></>}
            {cardInfo.atk?<span>ATK: {cardInfo.atk}<br/></span>:<></>}
            {cardInfo.def?<span>DEF: {cardInfo.def}<br/></span>:<></>}
            {cardInfo.desc?<span>Description: {cardInfo.desc}<br/></span>:<></>} 
        </div>
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
                onMouseDown={e=>handleClick(e)} 
                /*onClick={()=>isDraggable?
                    addCardToDeck(cardInfo)
                    :
                    //open?
                        null // no action if the dialog is up
                    //    :
                    //    removeCard(cardInfo,index)
                }*/
            >
                <img
                    src={img_url}
                    width="90px" 
                    height="120px" 
                    alt={cardInfo.name}
                />
                <Dialog 
                    open={open} 
                    onKeyDown={handleKeyPress}
                    maxWidth="md"
                >
                    {DialogDisplay}
                </Dialog>
            </div>
        </Tooltip>
    )
    
}

export default Card