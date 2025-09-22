// Library import
import { FC } from "react"

// Static imports
//import "assets/style/components/CardPlaceholder.css"

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygoOpenAPI.types'

interface CardDescriptionProps {
    cardInfo: cardType,
    className?: string,
}

const CardDescription: FC<CardDescriptionProps> = (props) => {
    
    return (
        <div className="card-description">
            {props.cardInfo.name?<h6>{props.cardInfo.name}<br/></h6>:<></>}
            {props.cardInfo.level?<span>LV: {props.cardInfo.level}<br/></span>:<></>}
            {props.cardInfo.type?<span>Card Type: {props.cardInfo.type}<br/></span>:<></>}
            {props.cardInfo.race?<span>Card subtype: {props.cardInfo.race}<br/></span>:<></>}
            {props.cardInfo.attribute?<span>Attribute: {props.cardInfo.attribute}<br/></span>:<></>}
            {props.cardInfo.attack?<span>ATK: {props.cardInfo.attack}<br/></span>:<></>}
            {props.cardInfo.defense?<span>DEF: {props.cardInfo.defense}<br/></span>:<></>}
            {props.cardInfo.description?<span>Description: {props.cardInfo.description}<br/></span>:<></>} 
        </div>
    )
    
}

export default CardDescription