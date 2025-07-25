import { FC, MouseEvent } from "react"

import placeholder from 'assets/pictures/placeholder.png'
import "assets/style/components/CardPlaceholder.css"

interface CardPlaceholderProps {
    img?: string,
    name: string,
    clickHandler: (e: MouseEvent) => void
}

const CardPlaceholder: FC<CardPlaceholderProps> = (props) => {
    
    return (
        <div className="card-placeholder">
            <img
                src={props.img ? props.img : placeholder}
                width="90px" 
                height="120px" 
                alt={props.name}
                onMouseDown={e => props.clickHandler(e)}
            />
        </div>
    )
    
}

export default CardPlaceholder