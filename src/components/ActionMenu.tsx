import { FC } from 'react'

import 'assets/style/components/ActionMenu.css'


interface ActionProps {
    label: string,
    onClick: () => void
}

interface ActionMenuProps {
    actions: ActionProps[]
}


const ActionMenu: FC<ActionMenuProps> = ({actions}) => {
    
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