import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Tooltip, Dialog} from '@material-ui/core'
import './card.css'
import '../../res/placeholder.png'


const Card = ({cardInfo, isDraggable, index}) => {

    const [isHovering, setHovering] = useState(false)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const img_url = cardInfo.card_images[0].image_url_small
    const handleClickOpen = () => setOpen(true)
    const handleClose = (event, reason) => {
        setOpen(false);
        if (reason !== "escapeKeyDown") {
            setHovering(false)
        }
    }
    const handleClick = (event) => {
        setHovering(false) //disables tooltip
        if(event.buttons === 2){ //if right click opens modal
            handleClickOpen()
            event.preventDefault()
            return false
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
            <></>
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
                className="card"
                onMouseOver={()=>setHovering(true)}
                onMouseOut={()=>setHovering(false)}
            >
                {}
                <img
                    src={img_url}
                    width="90px" 
                    height="120px" 
                    onMouseDown={e=>handleClick(e)} 
                    onClick={()=>isDraggable?
                        dispatch({type: 'ADD_CARD_TO_DECK', payload: cardInfo})
                        :
                        dispatch({type: 'REMOVE_CARD', index, payload: {type: cardInfo.type}})
                    }
                    alt={cardInfo.name}
                />
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