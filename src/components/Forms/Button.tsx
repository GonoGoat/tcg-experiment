// Library import
import { FC, MouseEvent } from 'react';

interface ButtonProps {
    className?: string,
    value?: string,
    label: string,
    isButtonDisabled?: boolean,
    onClick: (e: MouseEvent) => void
}

const Button: FC<ButtonProps> = ({className, value, label, isButtonDisabled = false, onClick}) => {    
    return (
        <button
            className={className}
            value={value}
            disabled={isButtonDisabled}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button