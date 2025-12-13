import Link from 'next/link'
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const TopHeader = () => {
    return (
        <section className='w-full primary-linear-gradient py-2'>
            <section className='container flex items-center justify-between'>
                <span className='text-white opacity-80 text-sm'>Cutting-Edge IT Systems Integrator</span>
                <section className='flex items-center gap-3 text-white'>
                    <Link href={'/careers'} className='smooth-scaling-text'>Careers</Link>
                    <span> / </span>
                    <section className='flex items-center gap-2'>
                        <FaLinkedin size={20} className='cursor-pointer smooth-scaling-icon' />
                        <FaSquareXTwitter size={21} className='cursor-pointer smooth-scaling-icon' />
                    </section>
                </section>
            </section>
        </section>
    )
}

export default TopHeader