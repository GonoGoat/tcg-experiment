// Library import
import { FC, ChangeEvent } from 'react';

interface NumberInputProps {
    className: string,
    label: string,
    labelClassName? : string,
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const NumberInput: FC<NumberInputProps> = ({className, label, labelClassName=className, name, value, onChange}) => {    
    return (
        <>
            <label className={labelClassName} htmlFor={name}>{label}</label>
            <input className={`number-input ${className}`} id={name} type="text" inputMode='decimal' value={value} onChange={onChange}/>
        </>
    )
    
}

export default NumberInput