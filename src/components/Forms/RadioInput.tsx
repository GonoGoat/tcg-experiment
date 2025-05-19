import { FC } from 'react';

export type RadioInputType = {
    id: string,
    name: string,
    checked: boolean,
    onClick: () => void,
    displayName: string
}

interface RadioInputProps {
    props: RadioInputType
}

const RadioInput: FC<RadioInputProps> = ({props}) => {    
    return (
        <>
            <input id={props.id} name={props.name} type="radio" readOnly checked={props.checked}/>
            <label htmlFor={props.id} onClick={props.onClick}>{props.displayName}</label>
        </>
    )
    
}

export default RadioInput