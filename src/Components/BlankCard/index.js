import React, {useState} from 'react'

import './blank_card.css'
import placeholder from '../../res/placeholder.png'

import useDeckStore from '../../Zustand/DeckStore/store'
import useStatStore from '../../Zustand/StatStore/store'

const BlankCard = ({index, source, id, isHandlingMarking}) => {
    const [menu, setMenu] = useState(false);

    const addCard = useDeckStore(state => state.addCard)
    const removeCard = useDeckStore(state => state.removeCard)

    const addMarker = useDeckStore(state => state.addMarker)
 
    // Options : 
    // - In lister
    //      Blank : Main - Extra - Side
    // - In Deck : Remove
    //    Side : Remove
    
    // TODO : Handler for adding marker
    const displayMenu = 
    <div className='blank-menu'>
        {source === "lister" ?
            <React.Fragment>
                <div onMouseDown={() => addCard({type : "blank"},"main")}>
                    <strong>Main</strong>
                </div>
                <div onMouseDown={() => addCard({type : "blank"},"blank-extra")}>
                    <strong>Extra</strong>
                </div>
                <div onMouseDown={() => addCard({type : "blank"}, "side")}>
                    <strong>Side</strong>
                </div>
            </React.Fragment>
            :
            <div onMouseDown={() => removeCard("blank", source, index)}>
                <strong>Remove</strong>
            </div>
        }
        {id}
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