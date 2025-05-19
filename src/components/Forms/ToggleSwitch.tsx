import { FC } from 'react';
import {RadioInputType} from './RadioInput';
import RadioInput from './RadioInput';

interface ToggleSwitchProps {
    className: string,
    label: string,
    name: string,
    radioInputs: RadioInputType[]
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({className, label, name, radioInputs}) => {    
    return (
        <div className={className}>
            <div className='col-25'>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="switch-toggle col-75">
                {radioInputs.map( (radioInput: RadioInputType, index: number) => <RadioInput key={index} props={radioInput}/>)}
            </div>
        </div>
    )
    
}

export default ToggleSwitch