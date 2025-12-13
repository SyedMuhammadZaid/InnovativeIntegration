import { Drawer } from 'antd'
import Link from 'next/link';
import React from 'react'
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoIosCloseCircle } from "react-icons/io";

interface DrawerNavInterface {
    open: boolean,
    onClose: () => void;
    children: React.ReactNode
}

const DrawerNav = ({ open, onClose, children }: DrawerNavInterface) => {
    return (
        <Drawer
            title={
                <section className='flex flex-col gap-2 flex-wrap'>
                    <section className='flex items-center justify-between'>
                        <span className='opacity-80 text-sm primary-text-color'>Cutting-Edge IT Systems Integrator</span>
                        <IoIosCloseCircle size={25} className='primary-text-color cursor-pointer' onClick={onClose} />
                    </section>
                    <section className='flex items-center gap-3 '>
                        <Link href={'/careers'} className='smooth-scaling-text text-black!'>Careers</Link>
                        <span> / </span>
                        <section className='flex items-center gap-2'>
                            <FaLinkedin size={20} className='cursor-pointer smooth-scaling-icon text-black!' />
                            <FaSquareXTwitter size={21} className='cursor-pointer smooth-scaling-icon text-black!' />
                        </section>
                    </section>
                </section>
            }
            closable={false}
            placement='top'
            open={open}
            height={430}
        >
            {children}
        </Drawer>
    )
}

export default DrawerNav