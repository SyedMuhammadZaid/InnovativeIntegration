'use client';
import React from 'react';
import { motion, useInView } from "motion/react";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import SecondaryButton from '../shared/button/secondaryButton/secondaryButton';

const HeroSection = () => {

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const learnMoreHandler = () => { }

    return (
        <section className="hero-section flex items-center justify-center">
            <video autoPlay loop muted playsInline className="hero-video">
                <source src={'/heroSection.mp4'} type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>

            <section className="hero-content container w-full flex flex-col gap-3 items-start justify-center px-2 h-full">

                <div className='flex gap-1 items-center'>
                    <MdOutlineSecurity color='#54CDE2E5' />
                    <h3 className="text-white font-semibold tracking-wide">WELCOME CYBER SECURITY</h3>
                </div>

                <div ref={ref} className="flex flex-col">
                    {/* Line 1 */}
                    <div>
                        {"Secure your world,".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, x: -18 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="font-bold text-5xl tracking-wider inline-block text-white"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>

                    {/* Line 2 */}
                    <div>
                        {"effortlessly today!".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, x: -18 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: (i + 20) * 0.05 }} // 🔥 Delay based on line 1's length
                                className="font-bold text-5xl tracking-wider inline-block text-white"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                </div>
                <p>
                    Protect your digital world with seamless, cutting-edge cybersecurity
                    <br />solutions designed to safeguard your data, systems, and peace of mind.
                </p>

                <SecondaryButton
                    text='Learn More'
                    onClick={learnMoreHandler}
                    className='secondary-btn'
                    icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                />
            </section>
        </section>
    );
};

export default HeroSection;
