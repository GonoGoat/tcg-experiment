// Library import
import { FC, MouseEvent } from "react"

// Static imports
import "assets/style/components/CardPlaceholder.css"

// Static asset import
import placeholder from 'assets/pictures/placeholder.png'

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
                alt={props.name}
                onMouseDown={e => props.clickHandler(e)}
            />
        </div>
    )
    
}

export default CardPlaceholder