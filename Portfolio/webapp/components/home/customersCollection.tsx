'use client';
import { Tabs } from 'antd'
import React, { useState } from 'react'
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { MdScreenshotMonitor } from "react-icons/md";
import * as motion from "motion/react-client";
import alfalah from "@/assets/images/customers/bank/Alfalah.png"
import hbl from "@/assets/images/customers/bank/hbl.png"
import meezan from "@/assets/images/customers/bank/Alfalah.png"
import oneLink from "@/assets/images/customers/bank/oneLink.png"
import standard from "@/assets/images/customers/bank/standard.jpg"
import ubl from "@/assets/images/customers/bank/ubl.png"
import KE from "@/assets/images/customers/oil/KE.png"
import parco from "@/assets/images/customers/oil/parco.png"
import pso from "@/assets/images/customers/oil/pso.png"
import SSGC from "@/assets/images/customers/oil/SSGC.png"
import jazz from "@/assets/images/customers/telecommunication/jazz.png"
import mobilink from "@/assets/images/customers/telecommunication/mobilink.png"
import telenor from "@/assets/images/customers/telecommunication/telenor.png"
import zong from "@/assets/images/customers/telecommunication/zong.png"
import dp from "@/assets/images/customers/logistics/dp.png"
import kict from "@/assets/images/customers/logistics/kict.png"
import tcs from "@/assets/images/customers/logistics/tcs.png"

import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import PrimaryButton from '../shared/button/primaryButton/primaryButton';
import { useRouter } from 'next/navigation';


const bankItems = [
    {
        id: 1,
        image: alfalah
    },
    {
        id: 2,
        image: hbl
    },
    {
        id: 3,
        image: meezan
    },
    {
        id: 4,
        image: oneLink
    },
    {
        id: 5,
        image: standard
    },
    {
        id: 6,
        image: ubl
    },
]

const oilItems = [
    {
        id: 1,
        image: KE
    },
    {
        id: 2,
        image: parco
    },
    {
        id: 3,
        image: pso
    },
    {
        id: 4,
        image: SSGC
    }
]

const telecommunicationItems = [
    {
        id: 1,
        image: jazz
    },
    {
        id: 2,
        image: mobilink
    },
    {
        id: 3,
        image: telenor
    },
    {
        id: 4,
        image: zong
    }
]

const logistics = [
    {
        id: 1,
        image: dp
    },
    {
        id: 2,
        image: kict
    },
    // {
    //     id: 3,
    //     image: south
    // },
    {
        id: 4,
        image: tcs
    },
]

const tabItems = [
    {
        key: 'Banking & Finance',
        label: 'Banking & Finance',
        children: bankItems,
        icon: <FaCloudDownloadAlt color='#FBBD01' />,
        color: '#FBBD01'
    },
    {
        key: 'Energy, Oil & Gas',
        label: 'Energy, Oil & Gas',
        children: oilItems,
        icon: <MdSecurity color='#E9012D' />,
        color: '#E9012D'
    },
    // {
    //     key: 'Pharmacia ,Health & Education',
    //     label: 'Pharmacia ,Health & Education',
    //     children: networkSecurityItems,
    //     icon: <BiNetworkChart color='#00B050' />,
    //     color: '#00B050'
    // },
    {
        key: 'Telecommunication',
        label: 'Telecommunication',
        children: telecommunicationItems,
        icon: <MdScreenshotMonitor color='#2D88CA' />,
        color: '#2D88CA'
    },
    {
        key: 'Transportation And Logistics',
        label: 'Transportation And Logistics',
        children: logistics,
        icon: <MdScreenshotMonitor color='#2D88CA' />,
        color: '#2D88CA'
    },
    // {
    //     key: 'Information Technology',
    //     label: 'Information Technology',
    //     children: networkSecurityItems,
    //     icon: <BiNetworkChart color='#00B050' />,
    //     color: '#00B050'
    // },
    // {
    //     key: 'Others',
    //     label: 'Others',
    //     children: applicationDeliveryMonitoringItems,
    //     icon: <MdScreenshotMonitor color='#2D88CA' />,
    //     color: '#2D88CA'
    // },
]

const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const CustomersCollection = () => {

    const [activeKey, setActiveKey] = useState("Banking & Finance")
    const router = useRouter();

    return (
        <div className='partners-collection'>
            <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={tabItems.map((tab) => ({
                    key: tab.key,
                    label: tab.label,
                    icon: tab.icon,
                    children: (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeKey} // 👈 THIS forces animation on tab change
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{
                                    duration: 0.4,
                                    type: "spring",
                                    bounce: 0.3,
                                }}
                                className="flex gap-4 items-center justify-around flex-wrap"
                            >
                                {tab.children.map((item) => (
                                    <Image
                                        key={item.id}
                                        src={item.image}
                                        alt="partnerImg"
                                        width={100}
                                        height={100}
                                        className="collection-item"
                                    />
                                ))}
                            </motion.div>
                            <p className='text-center mt-7'>
                                <PrimaryButton text='Show more' className='primary-btn py-1!' onClick={() => router.push('/customers')}/>
                            </p>
                        </AnimatePresence>
                    ),
                }))}
            />
        </div>
    )
}

export default CustomersCollection