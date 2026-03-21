// Library import
import { FC, ChangeEvent } from 'react';

// Component imports
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
        <>
            <label className={className} htmlFor={name}>{label}</label>
            <div className={className}>
                <Button className={name} isButtonDisabled={isButtonDisabled} onClick={onClick} label={displayName}/>
                <input className="number-input" name={name} type="text" inputMode='decimal' value={value} onChange={onChange}/>
            </div>
        </>
    )
}

export default NumberInputWithButton