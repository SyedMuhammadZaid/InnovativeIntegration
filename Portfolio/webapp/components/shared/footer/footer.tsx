import Image from 'next/image'
import React from 'react'
import logo from '@/assets/images/footerLogo.png'
import { FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import dayjs from 'dayjs'

const Footer = () => {
    return (
        <footer className='py-5'>
            <section className='container flex flex-col gap-4'>
                {/* first section */}
                <section className='flex items-center justify-between'>
                    <Image
                        src={logo}
                        alt='logo'
                        width={200}
                        height={200}
                        className='w-[100px]'
                    />
                    <div className='flex gap-4'>
                        <div className='rounded-full p-2 flex items-center justify-center border border-white'>
                            <FaLinkedin size={20} className='cursor-pointer smooth-scaling-icon' color='white' />
                        </div>
                        <div className='rounded-full p-2 flex items-center justify-center border border-white'>
                            <FaSquareXTwitter size={20} className='cursor-pointer smooth-scaling-icon' color='white' />
                        </div>
                    </div>
                </section>
                <div className='h-[1px] opacity-25 w-full bg-white'></div>
                {/* second section */}
                <section className='flex items-start flex-wrap justify-between w-full px-4 gap-6'>
                    {/* first section */}
                    <section className='flex flex-col gap-3'>
                        <p className='font-semibold text-base text-white'>Quick Links</p>
                        <ul className='flex flex-col gap-1 text-white font-light'>
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/'}>About</Link></li>
                            <li><Link href={'/'}>Services</Link></li>
                            <li><Link href={'/'}>Blogs</Link></li>
                            <li><Link href={'/'}>Case Studies</Link></li>
                            <li><Link href={'/'}>Events</Link></li>
                        </ul>
                    </section>
                    {/* second section */}
                    <section className='flex flex-col gap-3'>
                        <p className='font-semibold text-base text-white'>Services</p>
                        <ul className='flex flex-col gap-1 text-white font-light'>
                            <li><Link href={'/'}>Network & Security</Link></li>
                            <li><Link href={'/'}>Application Delivery & Monitoring</Link></li>
                            <li><Link href={'/'}>Cybersecurity</Link></li>
                            <li><Link href={'/'}>Private Cloud</Link></li>
                            <li><Link href={'/'}>Professional Services</Link></li>
                        </ul>
                    </section>

                    {/* third section */}
                    <section className='flex flex-col gap-3'>
                        <p className='font-semibold text-base text-white'>Contact</p>
                        <ul className='flex flex-col gap-1 text-white font-light'>
                            <li className='flex items-center gap-3'>
                                <FaPhoneAlt />
                                +92- 21- 32200013
                            </li>
                            <li className='flex items-center gap-3'>
                                <IoMdMail />
                                info@innovativeintegration.net
                            </li>

                        </ul>
                    </section>

                    {/* fourth section */}
                    <section className='flex flex-col gap-3'>
                        <p className='font-semibold text-base text-white'>Addresses</p>
                        <ul className='flex flex-col gap-1 text-white font-light'>
                            <li className='flex items-start gap-3'>
                                <FaLocationDot />
                                <span className='text-wrap max-w-[200px]'>Head-Quater: B-103 1st Floor Fortune Towers Main Shahrah-e-Faisal Karachi</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaLocationDot />
                                <span className='text-wrap max-w-[200px]'>24, 1st Floor, Al Hafeez View, 67/D-1, Gulberg III Lahore-54000</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaLocationDot />
                                <span className='text-wrap max-w-[200px]'>305, 3rd Floor, Emirates Tower, M-13, F-7 Markaz, Islamabad, 44000</span>
                            </li>
                        </ul>
                    </section>
                </section>
                <div className='h-[1px] opacity-25 w-full bg-white'></div>
                <p className='text-center text-white py-3'>© {dayjs().format('YYYY')} Innovative Integration (Pvt.) Ltd</p>
            </section>
        </footer>
    )
}

export default Footer