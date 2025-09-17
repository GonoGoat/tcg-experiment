// Library import
import { FC } from 'react';

interface ToggleSwitchProps {
    className: string,
    label: string,
    name: string,
    radioInputs: RadioInputProps[]
}

export type RadioInputProps = {
    id: string,
    name: string,
    checked: boolean,
    onClick: () => void,
    displayName: string
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({className, label, name, radioInputs}) => {    
    return (
        <div className={className}>
            <div className='col-25'>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="switch-toggle col-75">
                {radioInputs.map( (radioInput: RadioInputProps) =>
                    <>
                        <input id={radioInput.id} name={radioInput.name} type="radio" readOnly checked={radioInput.checked}/>
                        <label htmlFor={radioInput.id} onClick={radioInput.onClick}>{radioInput.displayName}</label>
                    </>
                )}
            </div>
        </div>
    )
    
}

export default ToggleSwitch