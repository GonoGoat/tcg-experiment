// Library import
import { FC } from 'react'

// Component imports
import { CardDescription } from "."

// Style imports
import 'assets/style/components/CardTooltip.css'

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygoOpenAPI.types'

interface CardTooltipProps {
    open: boolean
    cardInfo: cardType
}

const CardTooltip: FC<CardTooltipProps> = (props) => {
    
    return (
        <div className="tooltip">
            <CardDescription cardInfo={props.cardInfo}/>
        </div>
    )
}

export default CardTooltip