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
        <div className={className}>
            <div className='col-25'>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="col-75">
                <input className="number-input" name={name} type="text" inputMode='decimal' value={value} onChange={onChange}/>
            </div>
        </div>
    )
    
}

export default NumberInput