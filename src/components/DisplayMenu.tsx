import {useState, FC} from 'react'

import 'assets/style/components/DisplayMenu.css'

interface DisplayMenuProps {
    display: string[]
}


const DisplayMenu: FC<DisplayMenuProps> = ({display}) => {
    
    return (
        <div className='display'>
            {display.map( (item, index) => 
                <div key={index}>
                    <strong>{item}</strong>
                </div>
            )}
        </div>
    )
    
}

export default DisplayMenu

/*
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
        </div>*/