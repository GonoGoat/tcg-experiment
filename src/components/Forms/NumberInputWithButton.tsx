import { FC, ChangeEvent } from 'react';

import Button from './Button';

interface NumberInputWithButtonProps {
    // Number input props
    className: string,
    label: string,
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,

    // Button props
    isButtonDisabled: boolean,
    onClick: () => void,
    displayName: string
}

const NumberInputWithButton: FC<NumberInputWithButtonProps> = ({className, label, name, value, onChange, isButtonDisabled, onClick, displayName}) => {    
    return (
        <div className={className}>
            <div className='col-25'>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="col-75">
                <Button className={name} isButtonDisabled={isButtonDisabled} onClick={onClick} label={displayName}/>
                <input className="number-input" name={name} type="text" inputMode='decimal' value={value} onChange={onChange}/>
            </div>
        </div>
    )
}

export default NumberInputWithButton