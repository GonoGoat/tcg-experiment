// Library import
import { FC, KeyboardEvent } from 'react'
import Dialog from '@mui/material/Dialog'

// Component imports
import { CardDescription } from "components/Cards"

// Style imports
import 'assets/style/components/CardDialog.css'

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygopro.types'

interface CardDialogProps {
    open: boolean
    cardInfo: cardType,
    KeyPressHandler: (e: KeyboardEvent) => void
}

const CardDialog: FC<CardDialogProps> = (props) => {
    
    return (
        <Dialog open={props.open} onKeyDown={props.KeyPressHandler} maxWidth="md">
            <CardDescription cardInfo={props.cardInfo}/>
        </Dialog>
    )
}

export default CardDialog