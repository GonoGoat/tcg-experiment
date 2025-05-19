import { FC, ChangeEvent } from 'react';

interface SelectProps {
    className: string,
    label: string,
    name: string,
    options: string[],
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = ({className, label, name, options, onChange}) => {    
    return (
        <div className={className}>
            <div className='col-25'>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className='col-75'>
                <select name='type' onChange={onChange}>
                    <option key="0">Unset</option>
                    {options.map((option, index) => <option key={index+1}>{option}</option>)}
                </select>
            </div>
        </div>
    )
    
}

export default Select