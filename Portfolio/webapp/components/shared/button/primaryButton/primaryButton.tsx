import React from 'react'
import { Button } from 'antd';

interface PrimaryButtonInterface {
    text: string,
    className: string,
    onClick: () => void;
    icon?: React.ReactNode
}

const PrimaryButton = ({ text, className, onClick, icon }: PrimaryButtonInterface) => {
    return (
        <Button type="primary" icon={icon} iconPosition='end' className={className} onClick={onClick}>
            {text}
        </Button>
    )
}

export default PrimaryButton