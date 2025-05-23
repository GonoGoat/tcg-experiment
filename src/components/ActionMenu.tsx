import {useState, FC} from 'react'

import 'assets/style/components/ActionMenu.css'


interface ActionProps {
    label: string,
    onClick: () => void
}

interface ActionMenuProps {
    actions: ActionProps[]
}

const ActionMenu: FC<ActionMenuProps> = ({actions}) => {
    const [isHovering, setHovering] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <div className='menu'>
            {actions.map( (action, index) => 
                <div onMouseDown={action.onClick} key={index}>
                    <strong>{action.label}</strong>
                </div>
            )}
        </div>
    )
    
}

export default ActionMenu

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