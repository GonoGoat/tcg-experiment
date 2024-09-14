import React, {useState} from 'react'
import shortid from 'shortid'

import './blank_card.css'
import placeholder from '../../res/placeholder.png'

import useDeckStore from '../../Zustand/DeckStore/store'
import useStatStore from '../../Zustand/StatStore/store'

const BlankCard = ({index, source, id, isHandlingMarking, markers}) => {
    const [menu, setMenu] = useState(false);

    const addCard = useDeckStore(state => state.addCard)
    // TODO : Remove all exemplaries of same card
    const removeCard = useDeckStore(state => state.removeCard)

    const handleMarking = useStatStore(state => state.handleMarking)
    // Options : 
    // - In lister
    //      Blank : Main - Extra - Side
    // - In Deck : Remove
    //    Side : Remove
    
    const displayMenu = 
    <div className='blank-menu'>
        {source === global.config.sources.LISTER ?
            <React.Fragment>
                <div onMouseDown={() => addCard({type : "blank", id: shortid.generate()},global.config.sources.MAIN)}>
                    <strong>Main</strong>
                </div>
                <div onMouseDown={() => addCard({type : "blank", id: shortid.generate()}, global.config.sources.BLANK_EXTRA)}>
                    <strong>Extra</strong>
                </div>
                <div onMouseDown={() => addCard({type : "blank", id: shortid.generate()}, global.config.sources.SIDE)}>
                    <strong>Side</strong>
                </div>
            </React.Fragment>
            :
            <div onMouseDown={() => removeCard("blank", source, index)}>
                <strong>Remove</strong>
            </div>
        }
        {markers ? markers.map(marker => <div>{marker}</div>) : <React.Fragment/>}
    </div>
    
    return (
            <div
                className="blank-card" 
                tabIndex="0"

                onMouseDown={() => isHandlingMarking? handleMarking(id) : setMenu(!menu)}
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