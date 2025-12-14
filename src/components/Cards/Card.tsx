// Library imports
import { useState, FC, MouseEvent, KeyboardEvent } from 'react'

// Component imports
import { CardDialog, CardPlaceholder, CardDescription } from "components/Cards"

// Style imports
import 'assets/style/components/Card.css'

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygoOpenAPI.types'

// Context imports
import useVisualizerStore from "context/VisualizerStore/store"

interface CardProps {
    cardInfo: cardType,
    children?: React.ReactNode,
    defaultMenu?: boolean,
    menuToggleMode?: boolean,
    extraClickHandler?: () => void
}

const Card: FC<CardProps> = ({cardInfo, children, defaultMenu = false, menuToggleMode = true, extraClickHandler = () => null}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [menu, setMenu] = useState(defaultMenu);
    const img_url: string = cardInfo.image_url

    const setCard = useVisualizerStore((state) => state.setCard)

    const handleKeyPress = (event: KeyboardEvent) => {
        setOpen(false);
        /*if (event.key !== "escapeKeyDown") {
            setHovering(false)
        }*/
    }

    const handleClick = (event: MouseEvent) => {
        if(event.buttons === 2){ //if right click opens modal
            setOpen(true)
            event.preventDefault()
        }
        else { // Middle and left click
            if (!open) {
                setCard(cardInfo)
                extraClickHandler()
                setMenu(menuToggleMode ? !menu : menu)
            }
        }
    }
    
    return (
        <div className="card">
            <CardPlaceholder img={img_url} name={cardInfo.name} clickHandler={(e: MouseEvent)=>handleClick(e)}/>
            {menu ? children : <></>}
            <CardDialog open={open} KeyPressHandler={handleKeyPress} cardInfo={cardInfo}/>
        </div>
    )
    
}

export default Card