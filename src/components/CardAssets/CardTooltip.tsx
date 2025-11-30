// Library import
import { FC } from 'react'

// Component imports
import { CardDescription } from "."

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygoOpenAPI.types'

interface CardTooltipProps {
    cardInfo: cardType,
    children?: React.ReactNode,
}

const CardTooltip: FC<CardTooltipProps> = (props) => {
    
    return (
        <div className="card-tooltip">
            {props.children}
            <CardDescription cardInfo={props.cardInfo}/>
        </div>
    )
}

export default CardTooltip