'use client';
import { Tabs, TabsProps } from 'antd'
import React, { useState } from 'react'
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";
import { MdScreenshotMonitor } from "react-icons/md";
import * as motion from "motion/react-client";
import cohesity from "@/assets/images/partners/privateCloud/cohesity.png"
import netapp from "@/assets/images/partners/privateCloud/netapp.png"
import trilio from "@/assets/images/partners/privateCloud/trilio.png"
import vmware from "@/assets/images/partners/privateCloud/vmware.png"
import fortinet from "@/assets/images/partners/cyberSecurity/fortinet.png"
import netscout from "@/assets/images/partners/cyberSecurity/netscout.png"
import paloalto from "@/assets/images/partners/cyberSecurity/paloalto.png"
import recordedFuture from "@/assets/images/partners/cyberSecurity/recordedFuture.png"
import cisco from "@/assets/images/partners/network&Security/cisco.png"
import f5 from "@/assets/images/partners/network&Security/f5.png"
import forescout from "@/assets/images/partners/network&Security/forescout.png"
import riverbad from "@/assets/images/partners/network&Security/riverbad.png"
import appDynamics from "@/assets/images/partners/ApplicationDelivery&Monitoring/appDynamics.png"
import datadog from "@/assets/images/partners/ApplicationDelivery&Monitoring/datadog.png"
import logrhythm from "@/assets/images/partners/ApplicationDelivery&Monitoring/logrhythm.png"
import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import PrimaryButton from '../shared/button/primaryButton/primaryButton';


const privateCloudItems = [
    {
        id: 1,
        image: cohesity
    },
    {
        id: 2,
        image: netapp
    },
    {
        id: 3,
        image: vmware
    },
    {
        id: 4,
        image: trilio
    },

]

const cyberSecurityItems = [
    {
        id: 1,
        image: fortinet
    },
    {
        id: 2,
        image: netscout
    },
    {
        id: 3,
        image: paloalto
    },
    // {
    //     id: 4,
    //     image: recordedFuture
    // }
]

const networkSecurityItems = [
    // {
    //     id: 1,
    //     image: cisco
    // },
    // {
    //     id: 2,
    //     image: f5
    // },
    {
        id: 3,
        image: forescout
    },
    {
        id: 4,
        image: netscout
    },
    {
        id: 5,
        image: paloalto
    },
    {
        id: 6,
        image: riverbad
    }
]

const applicationDeliveryMonitoringItems = [
    {
        id: 1,
        image: appDynamics
    },
    {
        id: 2,
        image: datadog
    },
    // {
    //     id: 3,
    //     image: f5
    // },
    {
        id: 4,
        image: logrhythm
    },
]

const tabItems = [
    {
        key: 'Banking & Finance',
        label: 'Banking & Finance',
        children: privateCloudItems,
        icon: <FaCloudDownloadAlt color='#FBBD01' />,
        color: '#FBBD01'
    },
    {
        key: 'Energy, Oil & Gas',
        label: 'Energy, Oil & Gas',
        children: cyberSecurityItems,
        icon: <MdSecurity color='#E9012D' />,
        color: '#E9012D'
    },
    {
        key: 'Pharmacia ,Health & Education',
        label: 'Pharmacia ,Health & Education',
        children: networkSecurityItems,
        icon: <BiNetworkChart color='#00B050' />,
        color: '#00B050'
    },
    {
        key: 'Transportation And Logistics',
        label: 'Transportation And Logistics',
        children: applicationDeliveryMonitoringItems,
        icon: <MdScreenshotMonitor color='#2D88CA' />,
        color: '#2D88CA'
    },
    {
        key: 'Information Technology',
        label: 'Information Technology',
        children: networkSecurityItems,
        icon: <BiNetworkChart color='#00B050' />,
        color: '#00B050'
    },
    {
        key: 'Telecommunication',
        label: 'Telecommunication',
        children: applicationDeliveryMonitoringItems,
        icon: <MdScreenshotMonitor color='#2D88CA' />,
        color: '#2D88CA'
    },
    {
        key: 'Others',
        label: 'Others',
        children: applicationDeliveryMonitoringItems,
        icon: <MdScreenshotMonitor color='#2D88CA' />,
        color: '#2D88CA'
    },
]

const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const CustomersCollection = () => {

    const [activeKey, setActiveKey] = useState("Private Cloud")

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
                                <Link href={'/'}>
                                    <PrimaryButton text='Show more' className='primary-btn py-1!' onClick={() => alert('')} />
                                </Link>
                            </p>
                        </AnimatePresence>
                    ),
                }))}
            />
        </div>
    )
}

export default CustomersCollection