// Library imports
import { useState, FC, MouseEvent } from 'react'

// Component imports
import { CardDialog, CardPlaceholder } from "components/Cards"

// Style imports
import 'assets/style/components/Card.css'

// Enum/Interface/Type imports
import { cardInfo as cardType } from 'types/ygopro.types'

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
    const img_url: string = cardInfo.card_images[0].image_url_small

    const setCard = useVisualizerStore((state) => state.setCard)

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
            {open ? 
                <CardDialog close={() => setOpen(false)} cardInfo={cardInfo}/>
                :
                <></>
            }
        </div>
    )
    
}

export default Card