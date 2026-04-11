// Library import
import { FC, ChangeEvent } from 'react';

interface NumberInputProps {
    className: string,
    label: string,
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const NumberInput: FC<NumberInputProps> = ({className, label, name, value, onChange}) => {    
    return (
        <>
            <label className={className} htmlFor={name}>{label}</label>
            <input className={`number-input ${className}`} id={name} type="text" inputMode='decimal' value={value} onChange={onChange}/>
        </>
    )
    
}

export default NumberInput