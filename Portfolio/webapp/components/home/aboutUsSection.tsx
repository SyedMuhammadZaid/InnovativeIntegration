"use client"

import { motion } from "framer-motion"
import { FiPhone, FiCheckCircle, FiArrowRight } from "react-icons/fi"
import aboutUsFig1 from "@/assets/images/aboutUsFig1.png"
import aboutUsFig2 from "@/assets/images/aboutUsFig2.png"
import aboutUsFig3 from "@/assets/images/aboutUsFig3.png"
import Image from "next/image"
import SecondaryButton from "../shared/button/secondaryButton/secondaryButton"
import { IoIosArrowDroprightCircle } from "react-icons/io"
import PrimaryButton from "../shared/button/primaryButton/primaryButton"
import { useRouter } from "next/navigation"

export default function AboutUsSection() {
    const router = useRouter();
    return (
        <section className="container relative bg-white py-12!">
            <div className="mx-auto px-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 gap-4 items-end"
                    >
                        {/* Large image on the left spanning full height */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="h-3/4"
                        >
                            <Image
                                src={aboutUsFig1}
                                alt="Cybersecurity Infrastructure"
                                className="rounded-3xl shadow-lg w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Two smaller images stacked on the right */}
                        <div className="flex flex-col gap-4">
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Image
                                    src={aboutUsFig2}
                                    alt="Digital Security Interface"
                                    className="rounded-3xl shadow-lg w-full h-full object-cover"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Image
                                    src={aboutUsFig3}
                                    alt="Interactive Security"
                                    className="rounded-3xl shadow-lg w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        <span className="about-section">ABOUT US</span>
                        <div className='flex justify-start flex-wrap'>
                            <h2 className='section-first-heading leading-9!'>
                                Your trusted partner in our <br />
                                <span className='section-second-heading'> cyber security solutions</span>
                            </h2>
                        </div>

                        <p className="section-description">
                            At Innovative Integration, we don't just provide solutions we forge a partnership dedicated to your
                            digital safety. Our mission is to deliver enterprise-class cyber security with the{" "}
                            <strong className="text-gray-900">integrity</strong>, <strong className="text-gray-900">precision</strong>
                            , and <strong className="text-gray-900">relentless commitment</strong> your business deserves.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className=" flex items-center justify-center primary-linear-gradient p-6 text-white relative md:rounded-tl-full md:rounded-tr-full md:rounded-br-full"
                        >
                            {/* Decorative background pattern */}
                            {/* <div className="absolute right-0 top-0 w-32 h-32 opacity-20">
                                <img src="/abstract-tech-pattern.png" alt="" className="w-full h-full object-cover" />
                            </div> */}

                            <div className="px-3">
                                <h3 className="text-xl font-medium mb-2">Security Assistance</h3>
                                <p className="text-white/90 text-sm leading-relaxed">
                                    Get peace of mind with our real-time support for all your cyber security concerns. We provide expert
                                    breach response, proactive threat detection, and continuous guidance around the clock.
                                </p>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-3 justify-between flex-wrap">

                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex items-center gap-3">
                                    <FiCheckCircle className="text-cyan-500 text-xl flex-shrink-0" />
                                    <span className="section-description">Threat Detection & Monitoring</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiCheckCircle className="text-cyan-500 text-xl flex-shrink-0" />
                                    <span className="section-description ">Access Control Management</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiCheckCircle className="text-cyan-500 text-xl flex-shrink-0" />
                                    <span className="section-description">Security Awareness Training</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-500 rounded-full p-2 smooth-scaling-icon">
                                        <FiPhone className="text-white" />
                                    </div>
                                    <span className="section-description">+92-21-32200013</span>
                                </div>

                                <PrimaryButton
                                    text='Contact Us'
                                    className='primary-btn hidden! lg:inline-flex!'
                                    onClick={() => router.push('/contact')}
                                    icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                                />
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    )
}
