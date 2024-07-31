import React, {useState} from 'react'
import './blank_card.css'
import placeholder from '../../res/placeholder.png'
import useDeckStore from '../../Zustand/DeckStore/store'

const BlankCard = ({isInLister, index, zone}) => {
    const [menu, setMenu] = useState(false);

    const addCard = useDeckStore(state => state.addCard)
    const removeCard = useDeckStore(state => state.removeCard)

    // TODO : Distinction for main and extra
    const displayMenu = 
        <div className='blank-menu'>
            {zone !== "main" ?
                <div onMouseDown={() => addCard({type : "blank"},"main")}>
                    <strong>Main/Extra</strong>
                </div>
                :
                <React.Fragment/>
            }
            {zone !== "side" ?
                <div onMouseDown={() => addCard({type : "blank"}, "side")}>
                    <strong>Side</strong>
                </div>
                :
                <React.Fragment/>
            }   
            {zone !== "lister" ?
                <div onMouseDown={() => removeCard("blank",zone, index)}>
                    <strong>Remove</strong>
                </div>
                :
                <React.Fragment/>
            }
        </div>
    
    return (
            <div
                className="blank-card" 
                tabIndex="0"

                onMouseDown={() => setMenu(!menu)}
            >
                <img
                    src={placeholder}
                    width="90px" 
                    height="120px" 
                    alt="Blank card"
                />
                {menu ? displayMenu : <React.Fragment/>}
            </div>
    )
    
}


export default BlankCard