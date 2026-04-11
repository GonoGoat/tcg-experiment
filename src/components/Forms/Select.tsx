// Library import
import { FC, ChangeEvent } from 'react';

interface SelectProps {
    className: string,
    label?: string,
    name: string,
    options: string[],
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = ({className, label="", name, options, onChange}) => {    
    return (
        <>
            {label ?
                <label className={className} htmlFor={name}>{label}</label>
                :
                <></>
            }
            <select className={className} id={name} onChange={onChange} >
                <option key="0">Unset</option>
                {options.map((option, index) => <option key={index+1}>{option}</option>)}
            </select>
        </>
    )
}

export default Select