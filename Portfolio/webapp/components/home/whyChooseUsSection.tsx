"use client"

import { motion } from "framer-motion"
import { FiCheckCircle } from "react-icons/fi"
import whyChooseUs from "@/assets/images/whyChooseUs.png"
import Image from "next/image"
import PrimaryButton from "../shared/button/primaryButton/primaryButton"
import { IoIosArrowDroprightCircle } from "react-icons/io"

const benefits = ["Proactive Threat Defense", "Data Integrity & Protection", "24/7 Expert Partner Support"]

export default function WhyChooseUsSection() {
    return (
        <section className="bg-white container py-12!">
            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Image src={whyChooseUs} alt="Security Results" />
                        </motion.div>
                    </motion.div>

                    {/* Right side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        <span className="about-section">Why Choose Us</span>
                        <div className='flex justify-start flex-wrap'>
                            <h2 className='section-first-heading leading-9!'>
                                We Deliver Results <br />
                                <span className='section-second-heading'> You Can Trust</span>
                            </h2>
                        </div>
                        <p className="section-description">
                            Choosing a technology partner is a critical decision. We stand out by offering more than just services; we offer a relentless commitment to your success. Our expert team provides intelligent, reliable, and secure solutions designed to transform your operations and safeguard your future with unwavering integrity and precision.
                        </p>

                        <div className="space-y-4">
                            <h3 className="font-bold text-xl italic">Here's why you should choose us</h3>
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <FiCheckCircle className="text-cyan-600 text-xl flex-shrink-0" />
                                    <span className="section-description">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <PrimaryButton
                            text='More About'
                            className='primary-btn hidden! lg:inline-flex! w-fit'
                            onClick={() => ''}
                            icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
