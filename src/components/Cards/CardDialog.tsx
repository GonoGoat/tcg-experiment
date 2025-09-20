// Library import
import { FC, KeyboardEvent } from 'react'

// Component imports
import { CardDescription } from "components/Cards"
import useOutsideClick from 'hooks/useOutsideClick'

// Style imports
import 'assets/style/components/CardDialog.css'

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygoOpenAPI.types'

interface CardDialogProps {
    open: boolean
    cardInfo: cardType,
    KeyPressHandler: (e: KeyboardEvent) => void,
    OutsideClickHandler: () => void
}

const CardDialog: FC<CardDialogProps> = (props) => {

    const ref = useOutsideClick(props.OutsideClickHandler);
    
    return (
        props.open ? (
            <div className={"modal"} tabIndex={1} onKeyDown={props.KeyPressHandler}>
                <div className='modal-content' ref={ref}>
                    <img src={props.cardInfo.image_url} alt={props.cardInfo.name}/>
                    <CardDescription cardInfo={props.cardInfo}/>
                </div>
            </div>
        )    
        :
        <></>
    )
}

export default CardDialog