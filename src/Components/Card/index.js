import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'

import './card.css'
import placeholder from '../../res/placeholder.png'

import useDeckStore from '../../Zustand/DeckStore/store'

const Card = ({cardInfo, index, source}) => {

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
    // - In Deck :  
    //    Main/Extra : Side - Bank - Remove
    //    Side : Main/Extra - Bank - Remove
    // - In Bank : Main/Extra - Side - Remove


    const displayMenu = 
        <div className='menu'>
            {source !== "main" && source !== "extra" ?
                <div onMouseDown={() => addCard(cardInfo, "main")}>
                    <strong>Main/Extra</strong>
                </div>
                :
                <React.Fragment/>
            }
            {source !== "side" ?
                <div onMouseDown={() => addCard(cardInfo, "side")}>
                    <strong>Side</strong>
                </div>
                :
                <React.Fragment/>
            }   
            {source !== "bank" ?
                <div onMouseDown={() => addCard(cardInfo, "bank")}>
                    <strong>Card Bank</strong>
                </div>
                :
                <React.Fragment/>
            }
            {source !== "lister" ?
                <div onMouseDown={() => removeCard(cardInfo.type,source, index)}>
                    <strong>Remove</strong>
                </div>
                :
                <React.Fragment/>
            }
        </div>
    
    const handleClick = (event) => {
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
        {cardInfo.name?<span>Name: {cardInfo.name}<br/></span>:<React.Fragment/>}
        {cardInfo.level?<span>LV: {cardInfo.level}<br/></span>:<React.Fragment/>}
        {cardInfo.type?<span>Type: {cardInfo.type}<br/></span>:<React.Fragment/>}
        {cardInfo.race?<span>Race: {cardInfo.race}<br/></span>:<React.Fragment/>}
        {cardInfo.attribute?<span>Attribute: {cardInfo.attribute}<br/></span>:<React.Fragment/>}
        {cardInfo.atk?<span>ATK: {cardInfo.atk}<br/></span>:<React.Fragment/>}
        {cardInfo.def?<span>DEF: {cardInfo.def}<br/></span>:<React.Fragment/>}
        {cardInfo.desc?<span>Description: {cardInfo.desc}<br/></span>:<React.Fragment/>} 
    </div>

    const DialogDisplay = <div className="card-modal">
        {cardInfo.card_images[0].image_url?
            <img src={cardInfo.card_images[0].image_url} alt={cardInfo.name}/>
            :
            <img src={placeholder} alt={cardInfo.name}/>
        }
        <div>
            {cardInfo.name?<h6>{cardInfo.name}<br/></h6>:<React.Fragment/>}
            {cardInfo.level?<span>LV: {cardInfo.level}<br/></span>:<React.Fragment/>}
            {cardInfo.type?<span>Type: {cardInfo.type}<br/></span>:<React.Fragment/>}
            {cardInfo.race?<span>Race: {cardInfo.race}<br/></span>:<React.Fragment/>}
            {cardInfo.attribute?<span>Attribute: {cardInfo.attribute}<br/></span>:<React.Fragment/>}
            {cardInfo.atk?<span>ATK: {cardInfo.atk}<br/></span>:<React.Fragment/>}
            {cardInfo.def?<span>DEF: {cardInfo.def}<br/></span>:<React.Fragment/>}
            {cardInfo.desc?<span>Description: {cardInfo.desc}<br/></span>:<React.Fragment/>} 
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