// Library imports
import { FC } from 'react'

// Style imports
import 'assets/style/components/DisplayMenu.css'

interface DisplayMenuProps {
    display: string[],
    onClickHandler?: () => void
}

const DisplayMenu: FC<DisplayMenuProps> = ({display, onClickHandler = () => null}) => {
    
    return (
        <div className='display' onMouseDown={() => onClickHandler()}>
            {display.map( (item, index) => 
                <div key={index}>
                    <strong>{item}</strong>
                </div>
            )}
        </div>
    )
    
}

export default DisplayMenu