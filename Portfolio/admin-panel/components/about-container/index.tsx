import { Button } from 'antd'
import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";


interface AboutContainerInterface {
    heading: string,
    btnText: string,
    btnClickHandler?: React.MouseEventHandler<HTMLElement>
    backHandler?: () => void
}

const AboutContainer = ({ heading, btnText, btnClickHandler, backHandler }: AboutContainerInterface) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-200 rounded-2xl">
            <div className='flex items-center gap-2'>
                <IoArrowBackOutline size={23} color='#4A5565' onClick={backHandler} className='cursor-pointer' />
                <h2 className='primary-heading'>{heading}</h2>
            </div>
            <Button type="primary" className='primary-btn' size='large' onClick={btnClickHandler}>
                {btnText}
            </Button>
        </div>
    )
}

export default AboutContainer