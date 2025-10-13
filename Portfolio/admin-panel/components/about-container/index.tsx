import { Button } from 'antd'
import React from 'react'

interface AboutContainerInterface {
    heading: string,
    btnText: string,
    btnClickHandler?: React.MouseEventHandler<HTMLElement>
}

const AboutContainer = ({ heading, btnText, btnClickHandler }: AboutContainerInterface) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-200 rounded-2xl">
            <h2 className='primary-heading'>{heading}</h2>
            <Button type="primary" className='primary-btn' size='large' onClick={btnClickHandler}>
                {btnText}
            </Button>
        </div>
    )
}

export default AboutContainer