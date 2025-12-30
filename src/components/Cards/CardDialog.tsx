// Library import
import { FC } from 'react'

// Component imports
import { CardDescription } from "."

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygopro.types'

interface CardDialogProps {
    cardInfo: cardType,
    close: () => void
}

const CardDialog: FC<CardDialogProps> = (props) => {
    
    return (
        <div className="card-modal" onMouseDown={() => props.close()}>
            <div className='card-modal-content'>
                <img src={props.cardInfo.card_images[0].image_url} alt={props.cardInfo.name}/>
                <CardDescription cardInfo={props.cardInfo}/>
            </div>
        </div>
    )
}

export default CardDialog