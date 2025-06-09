import { FC, KeyboardEvent } from 'react'
import Dialog from '@mui/material/Dialog'

import 'assets/style/components/CardDialog.css'
import {cardInfo as cardType} from 'types/ygopro.types'

interface CardDialogProps {
    open: boolean
    cardInfo: cardType,
    KeyPressHandler: (e: KeyboardEvent) => void
}

const CardDialog: FC<CardDialogProps> = (props) => {

    const DialogDisplay = (
        <div className="card-modal">
            <img src={props.cardInfo.card_images[0].image_url} alt={props.cardInfo.name}/>
            <div>
                {props.cardInfo.name?<h6>{props.cardInfo.name}<br/></h6>:<></>}
                {props.cardInfo.level?<span>LV: {props.cardInfo.level}<br/></span>:<></>}
                {props.cardInfo.type?<span>Type: {props.cardInfo.type}<br/></span>:<></>}
                {props.cardInfo.race?<span>Race: {props.cardInfo.race}<br/></span>:<></>}
                {props.cardInfo.attribute?<span>Attribute: {props.cardInfo.attribute}<br/></span>:<></>}
                {props.cardInfo.atk?<span>ATK: {props.cardInfo.atk}<br/></span>:<></>}
                {props.cardInfo.def?<span>DEF: {props.cardInfo.def}<br/></span>:<></>}
                {props.cardInfo.desc?<span>Description: {props.cardInfo.desc}<br/></span>:<></>} 
            </div>
        </div>
    )
    

    return (
        <Dialog open={props.open} onKeyDown={props.KeyPressHandler} maxWidth="md">
            {DialogDisplay}
        </Dialog>
    )
}

export default CardDialog