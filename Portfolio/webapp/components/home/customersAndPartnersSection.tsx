'use client';
import { Radio } from 'antd'
import React, { useState } from 'react'
import { AnimatePresence, motion, scale } from "motion/react"
import PartnersCollection from './partnersCollection';
import CustomersCollection from './customersCollection';


const CustomersAndPartnersSection = () => {

    const [radioValue, setRadioValue] = useState('Partner')

    const radioSelectionHandler = (value: any) => {
        setRadioValue(value?.target.value)
    }

    return (
        // main section
        <section className='bg-[#F2F2F5] flex flex-col gap-4 py-7!'>
            {/* container */}
            <section className='container flex flex-col gap-6'>
                {/* about section */}
                <section className='w-full md:max-w-3/5 mx-auto text-center'>
                    <div className='flex justify-center flex-wrap'>
                        <h2 className='section-first-heading'>
                            Meet Our Partners
                            <span className='section-second-heading'> and Customers</span>
                        </h2>
                    </div>
                    <span className='section-description'>
                        Our partnerships with global technology pioneers and our commitment to customer success are the pillars of our reputation. We deliver solutions that major brands rely on every day.
                    </span>
                </section>
                {/* radio selection */}
                <section className='flex items-center justify-center flex-col gap-7'>
                    <Radio.Group value={radioValue} defaultValue="Partner" className='flex! flex-nowrap md:flex-wrap gap-1' onChange={radioSelectionHandler}>
                        <Radio value="Partner" className='border border-[#d6d3d3] rounded-md md:px-8! px-3! font-semibold py-3! flex! items-center bg-white'>Partner Alliances</Radio>
                        <Radio value="Customer" className='border border-[#d6d3d3] rounded-md md:px-8! px-3! font-semibold py-3! flex! items-center! bg-white'>Customers</Radio>
                    </Radio.Group>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={radioValue ? radioValue : "empty"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {
                                radioValue == 'Partner' ? <PartnersCollection /> : <CustomersCollection />
                            }
                        </motion.div>
                    </AnimatePresence>
                </section>
            </section>
        </section>
    )
}

export default CustomersAndPartnersSection