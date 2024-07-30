import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'

import './card.css'
import placeholder from '../../res/placeholder.png'

import useDeckStore from '../../Zustand/DeckStore/store'

const Card = ({cardInfo, isInLister, index, zone}) => {

    const [isHovering, setHovering] = useState(false)
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);
    const img_url = cardInfo.card_images[0].image_url_small

    const addCard = useDeckStore(state => state.addCard)
    const removeCard = useDeckStore(state => state.removeCard)

    const handleClickOpen = () => setOpen(true)

    const handleClose = (event, reason) => {
        setOpen(false);
        if (reason !== "escapeKeyDown") {
            setHovering(false)
        }
    }

    // Options : 
    // - In lister
    //      Blank : Main - Extra - Side
    //      Card : Main/Extra - Side - Bank
    // - In Deck : Remove ( - Bank)
    // - In Bank : Same as Card in lister + Remove
    function getMenuOption (option) {
        return (
            <div onMouse>
                <strong>{option}</strong>
            </div>
        )
    }

    const displayMenu = (
        <div className='menu'>
            <div onMouseDown={() => addCard(cardInfo, "main")}>
                <strong>Main/Extra</strong>
            </div>
            <div onMouseDown={() => addCard(cardInfo, "side")}>
                <strong>Side</strong>
            </div>
            <div onMouseDown={() => addCard(cardInfo, "bank")}>
                <strong>Card Bank</strong>
            </div>
            <div onMouseDown={() => removeCard(cardInfo.type,zone, index)}>
                <strong>Remove</strong>
            </div>
        </div>
    ) 
    
    const handleClick = (event) => {
        setHovering(false) //disables tooltip
        if(event.buttons === 2){ //if right click opens modal
            handleClickOpen()
            event.preventDefault()
            return false
        }
        else { // Middle and left click
            if (!open) {
                setMenu(true)
            }
            /*isInLister&&!open ?
            addCard(cardInfo, zone)
            :
            open?
                null // no action if the dialog is up
                :
                removeCard(cardInfo.type,zone, index)*/
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
            onClose={handleClose}
        >
            <div
                tabIndex="0"
                className="card"
                onMouseOver={()=>setHovering(true)}
                onFocus={()=>setHovering(true)}

                onMouseOut={()=>setHovering(false)}
                onBlur={()=>setHovering(false)} // On Focus Out
                
                onMouseDown={e=>handleClick(e)}
            >
                <img
                    src={img_url}
                    width="90px" 
                    height="120px" 
                    alt={cardInfo.name}
                />
                {menu ? displayMenu : <React.Fragment/>}
                <Dialog 
                    open={open} 
                    onClose={handleClose} 
                    maxWidth="md"
                >
                    {DialogDisplay}
                </Dialog>
            </div>
        </Tooltip>
    )
    
}


export default Card