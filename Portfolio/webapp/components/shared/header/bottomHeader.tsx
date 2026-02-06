'use client';
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Logo from '@/assets/images/logo.png'
import PrimaryButton from '../button/primaryButton/primaryButton';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Dropdown } from 'antd';
import { FaChevronDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import DrawerNav from './drawerNav';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const BottomHeader = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const dropdownValuesNavigator = useCallback((link: string) => (
        router.push(link)
    ), [])

    useEffect(() => {
        if (pathname) {
            setDrawerOpen(false)
        }
    }, [pathname])

    const navItems = useMemo(() => (
        [
            {
                id: 1,
                title: "About Us",
                link: "/about",
                isDropDown: false
            },
            {
                id: 2,
                title: "Services",
                link: "/services",
                isDropDown: false
            },
            {
                id: 3,
                title: "Resources",
                link: "/",
                isDropDown: true,
                dropdownValues: [
                    {
                        key: '1',
                        icon: <IoIosArrowDroprightCircle />,
                        label: "Case Study",
                        onClick: () => dropdownValuesNavigator('/caseStudies')
                    },
                    {
                        key: '2',
                        icon: <IoIosArrowDroprightCircle />,
                        label: "Events",
                        onClick: () => dropdownValuesNavigator('/events')
                    },
                    {
                        key: '3',
                        icon: <IoIosArrowDroprightCircle />,
                        label: "Blogs",
                        onClick: () => dropdownValuesNavigator('/blogs')
                    },
                ]
            },
            {
                id: 4,
                title: "Customers",
                link: "/customers",
                isDropDown: false
            },
            {
                id: 5,
                title: "Our Partners",
                link: "/partners",
                isDropDown: false
            },
            {
                id: 6,
                title: "Support Portal",
                link: "/",
                isDropDown: false
            },
        ]
    ), [])


    const contactUsHandler = () => {
        router.push('/contact')
    }

    const drawerOpenHandler = () => {
        setDrawerOpen(!drawerOpen)
    }

    const supportPortalHandler = () => {
        window.open("https://myiipl.on.spiceworks.com/portal/registrations", "_blank");
    }

    // const homeRedirectHandler = () => {
    //     router.push('/')
    // }

    return (
        <header className='w-full py-2'>
            <section className='container flex items-center justify-between'>
                <section>
                    <Link href={'/'}>
                        <Image  src={Logo} alt='logo' priority width={150} height={150} className='w-[110px] cursor-pointer' />
                    </Link>
                </section>
                {/* for large devices view */}
                <nav className='hidden lg:block'>
                    <ul className='flex items-center gap-7'>
                        {
                            navItems.map((navItem) => {
                                return (
                                    <li className='smooth-scaling-text cursor-pointer font-medium text-[15px] text-[#010535]' key={navItem.id}>
                                        {
                                            navItem.isDropDown ?
                                                <Dropdown
                                                    trigger={["hover"]}
                                                    menu={{ items: navItem.dropdownValues }}>
                                                    <Link href={"/"} className='flex items-center gap-2'>
                                                        {navItem.title}
                                                        <FaChevronDown />
                                                    </Link>
                                                </Dropdown>
                                                :
                                                navItem?.title == "Support Portal" ?
                                                    <p onClick={supportPortalHandler}>{navItem.title}</p>
                                                    :
                                                    <Link href={navItem?.link}>
                                                        {navItem.title}
                                                    </Link>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <PrimaryButton
                    text='Contact Us'
                    className='primary-btn hidden! lg:inline-flex!'
                    onClick={contactUsHandler}
                    icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                />
                {/* for small devices view */}
                <RxHamburgerMenu className='block lg:hidden cursor-pointer' size={24} onClick={drawerOpenHandler} />
                <DrawerNav
                    open={drawerOpen}
                    onClose={drawerOpenHandler}
                    children={
                        <ul className='flex flex-col gap-5'>
                            {
                                navItems.map((navItem) => {
                                    return (
                                        <li className='cursor-pointer font-medium text-[15px] primary-text-color' key={navItem.id}>
                                            {
                                                navItem.isDropDown ?
                                                    <Dropdown
                                                        trigger={["hover"]}
                                                        menu={{ items: navItem.dropdownValues }}>
                                                        <Link href={"/"} className='flex items-center gap-2 text-[#003173]!'>
                                                            {navItem.title}
                                                            <FaChevronDown />
                                                        </Link>
                                                    </Dropdown>
                                                    :
                                                    navItem?.title == "Support Portal" ?
                                                        <p onClick={supportPortalHandler} className='flex items-center gap-2 text-[#003173]!'>{navItem.title}</p>
                                                        :
                                                        <Link href={navItem?.link} className='flex items-center gap-2 text-[#003173]!'>
                                                            {navItem.title}
                                                        </Link>
                                            }
                                        </li>
                                    )
                                })
                            }
                            <PrimaryButton
                                text='Contact Us'
                                className='primary-btn w-fit!'
                                onClick={contactUsHandler}
                                icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                            />
                        </ul>
                    }
                />
            </section>
        </header>
    )
}

export default BottomHeader