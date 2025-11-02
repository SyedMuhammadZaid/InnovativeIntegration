import React from 'react'
import { Button } from 'antd';

interface SecondaryButtonInterface {
    text: string,
    className?: string,
    onClick: () => void;
    icon?: React.ReactNode
}

const SecondaryButton = ({ text, className, onClick, icon }: SecondaryButtonInterface) => {
    return (
        <Button icon={icon} iconPosition='end' className={className} onClick={onClick}>
            {text}
        </Button>
    )
}

export default SecondaryButton