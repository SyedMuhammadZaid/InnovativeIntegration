"use client"

import { motion } from "framer-motion"
import { FiShield, FiCheckCircle, FiUsers } from "react-icons/fi"
import Image from "next/image"
import aboutApproach from "@/assets/images/about-approach.png"

export default function ApproachSection() {
    const approaches = [
        {
            icon: <FiShield className="text-3xl" />,
            title: "Proactive Security Posture",
            description:
                "We don't wait for threats to happen. Our team is committed to continuous, proactive monitoring, identifying vulnerabilities and mitigating risks with the precision and foresight needed to keep you a step ahead.",
        },
        {
            icon: <FiCheckCircle className="text-3xl" />,
            title: "A Foundation of Trust",
            description:
                "Our data is your most valuable asset. We build robust solutions that establish a foundation of trust, ensuring sensitive information is protected with best-in-class access controls and an unwavering commitment to integrity.",
        },
        {
            icon: <FiUsers className="text-3xl" />,
            title: "Empowering Your Team",
            description:
                "Technology is only one part of the solution. We empower your greatest asset your people through comprehensive training programs that transform your team into a formidable first line of defense against modern cyber threats.",
        },
    ]

    return (
        <section className="py-14 bg-gradient-to-br from-slate-50 to-white">
            <div className="container mx-auto px-4 flex flex-col gap-7">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-4"
                >
                    <span className="about-section">OUR APPROACH</span>
                    <div className='flex justify-center items-center'>
                        <h2 className='section-first-heading leading-9! text-center'>
                            Strengthening security<br />
                            <span className='section-second-heading'> your future</span>
                        </h2>
                    </div>
                    <p className="section-description max-w-[600px] text-center">
                        At Innovative Integration, we believe true security is a proactive partnership. Our approach is built on three core pillars that ensure your business is not just protected, but resilient.
                    </p>
                </motion.div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-0 items-center relative">
                        {/* Left: Approach Cards - positioned to overlap right side */}
                        <div className="z-10">
                            <div className="lg:absolute lg:top-1/2 lg:left-1/3 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[700px] space-y-2">
                                {approaches.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                        className="bg-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-cyan-400 group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-cyan-50 rounded-xl group-hover:bg-cyan-500 text-cyan-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 leading-relaxed text-[13px]">{item.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Large Image - sits behind overlapping cards */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative lg:block hidden"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
                                <Image
                                    src={aboutApproach}
                                    alt="Proactive Security Shield"
                                    width={600}
                                    height={700}
                                    className="w-full h-auto object-cover"
                                />

                                {/* Glowing border effect */}
                                <motion.div
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl opacity-30 blur-xl -z-10"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
