// Library imports
import { useState, FC, MouseEvent, KeyboardEvent } from 'react'

// Component imports
import { CardDialog, CardPlaceholder, CardTooltip } from "components/CardAssets"

// Style imports
import 'assets/style/components/Card.css'

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygoOpenAPI.types'

interface CardProps {
    cardInfo: cardType,
    children?: React.ReactNode,
    defaultMenu?: boolean,
    menuToggleMode?: boolean,
    extraClickHandler?: () => void
}

const Card: FC<CardProps> = ({cardInfo, children, defaultMenu = false, menuToggleMode = true, extraClickHandler = () => null}) => {
    const [isHovering, setHovering] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false);
    const [menu, setMenu] = useState(defaultMenu);
    const img_url: string = cardInfo.image_url

    const handleClickOutsideDialog = () => {
        setOpen(false);
        setHovering(false)
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        setOpen(false);
        if (event.key !== "escapeKeyDown") {
            setHovering(false)
        }
    }

    const handleClick = (event: MouseEvent) => {
        setHovering(false) //disables tooltip
        if(event.buttons === 2){ //if right click opens modal
            setOpen(true)
            event.preventDefault()
        }
        else { // Middle and left click
            if (!open) {
                extraClickHandler()
                setMenu(menuToggleMode ? !menu : menu)
            }
        }
    }

    const getCardContent = () => { return (
        <div
            className="card"
            onMouseOver={()=>setHovering(true)}
            onMouseOut={()=>setHovering(false)} 
        >
            <CardPlaceholder img={img_url} name={cardInfo.name} clickHandler={handleClick}/>
            {menu ? children : <></>}
            {open ? 
                <CardDialog open={open} KeyPressHandler={handleKeyPress} cardInfo={cardInfo} OutsideClickHandler={handleClickOutsideDialog}/>
                :
                <></>
            }
        </div>
    )}
    const getCard = getCardContent()
     
    return (isHovering && !open ?
        (
            <CardTooltip cardInfo={cardInfo}>
                {getCard}
            </CardTooltip>
        )
        :
        getCard
    ) 
}

export default Card