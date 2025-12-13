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
import forescout from "@/assets/images/partners/network&Security/forescout.png"
import riverbad from "@/assets/images/partners/network&Security/riverbad.png"
import appDynamics from "@/assets/images/partners/ApplicationDelivery&Monitoring/appDynamics.png"
import datadog from "@/assets/images/partners/ApplicationDelivery&Monitoring/datadog.png"
import logrhythm from "@/assets/images/partners/ApplicationDelivery&Monitoring/logrhythm.png"
import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import PrimaryButton from '../shared/button/primaryButton/primaryButton';
import { useRouter } from 'next/navigation';


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
        key: 'Private Cloud',
        label: 'Private Cloud',
        children: privateCloudItems,
        icon: <FaCloudDownloadAlt color='#FBBD01' />,
        color: '#FBBD01'
    },
    {
        key: 'Cyber Security',
        label: 'Cyber Security',
        children: cyberSecurityItems,
        icon: <MdSecurity color='#E9012D' />,
        color: '#E9012D'
    },
    {
        key: 'Network & Security',
        label: 'Network & Security',
        children: networkSecurityItems,
        icon: <BiNetworkChart color='#00B050' />,
        color: '#00B050'
    },
    {
        key: 'Application Delivery & Monitoring',
        label: 'Application Delivery & Monitoring',
        children: applicationDeliveryMonitoringItems,
        icon: <MdScreenshotMonitor color='#2D88CA' />,
        color: '#2D88CA'
    },
]

const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const PartnersCollection = () => {

    const [activeKey, setActiveKey] = useState("Private Cloud")
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
                                <PrimaryButton text='Show more' className='primary-btn py-1!' onClick={() => router.push('/partners')} />
                            </p>
                        </AnimatePresence>
                    ),
                }))}
            />
        </div>
    )
}

export default PartnersCollection