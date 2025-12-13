"use client"

import { motion } from "framer-motion"
import { Button } from "antd"
import { FiArrowRight, FiPlayCircle } from "react-icons/fi"
import Image from "next/image"
import aboutHeader from '@/assets/images/about-header.png'

export default function AboutHeroSection() {
    return (
        <section className="container mx-auto px-4 relative py-9! overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            </div>

            <div className=" relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col gap-4">
                        <h1 className="section-first-heading leading-tight">
                            Your Trusted Partner For Secure And Scalable IT Solutions.
                        </h1>

                        <p className="section-description leading-relaxed text-base!">
                            As we grow, our foundation remains rooted in three core values:{" "}
                            <span className="font-semibold text-slate-900">honesty, accountability,</span> and{" "}
                            <span className="font-semibold text-slate-900">technical depth</span>. These principles guide every
                            partnership we forge. Whether you are a progressive enterprise or a cloud-native disruptor, we create
                            tailored IT security frameworks and cutting-edge infrastructure solutions designed for resilience, speed,
                            and long-term success in a complex digital environment with you, not just for you.
                        </p>    
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            >
                                <Image
                                    src={aboutHeader}
                                    alt="Futuristic Digital Security"
                                    width={600}
                                    height={500}
                                    className="rounded-xl w-full h-auto object-cover"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
