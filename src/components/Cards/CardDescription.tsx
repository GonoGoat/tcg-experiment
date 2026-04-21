// Library import
import { FC } from "react"

// Static imports
//import "assets/style/components/CardPlaceholder.css"

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygopro.types'

interface CardDescriptionProps {
    cardInfo: cardType,
}

const CardDescription: FC<CardDescriptionProps> = (props) => {
    
    return (
        <div className="card-description">
            {props.cardInfo.name?<h6>{props.cardInfo.name}<br/></h6>:<></>}
            {props.cardInfo.level?<>LV: {props.cardInfo.level}<br/></>:<></>}
            {props.cardInfo.type?<>Card Type: {props.cardInfo.type}<br/></>:<></>}
            {props.cardInfo.race?<>Card subtype: {props.cardInfo.race}<br/></>:<></>}
            {props.cardInfo.attribute?<>Attribute: {props.cardInfo.attribute}<br/></>:<></>}
            {props.cardInfo.atk?<>ATK: {props.cardInfo.atk}<br/></>:<></>}
            {props.cardInfo.def?<>DEF: {props.cardInfo.def}<br/></>:<></>}
            {props.cardInfo.desc?<>Description: {props.cardInfo.desc}<br/></>:<></>} 
        </div>
    )
    
}

export default CardDescription