"use client"

import { motion } from "framer-motion"
import { Button } from "antd"
import { FiArrowRight } from "react-icons/fi"
import Image from "next/image"
import PrimaryButton from "../button/primaryButton/primaryButton"
import f5 from "@/assets/images/Awards/f5-2.png"
import fortinet from "@/assets/images/Awards/fortinet.png"
import netApp from "@/assets/images/Awards/Netapp.png"
import veritas from "@/assets/images/Awards/veritas.png"
import veritasGold from "@/assets/images/Awards/veritas gold.png"
import nextWave from "@/assets/images/Awards/nextWave.jpg"

export default function AwardsSection() {
    const awards = [
        { name: "f5", image: f5 },
        { name: "fortinet", image: fortinet },
        { name: "netApp", image: netApp },
        { name: "veritas", image: veritas },
        { name: "veritasGold", image: veritasGold },
        { name: "nextWave", image: nextWave },
    ]

    return (
        <section className="pb-3">
            <div className="container mx-auto px-4 flex flex-col gap-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className='flex justify-center flex-wrap flex-col'>
                        <h2 className='section-first-heading leading-9!'>
                            Awards &
                            <span className='section-second-heading'> Certifications</span>
                        </h2>
                        <p className="section-description">
                            We uphold the highest industry standards, evidenced by our numerous awards and certifications.
                        </p>
                    </div>

                </motion.div>

                {/* Awards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                    {awards.map((award, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                            className="relative group"
                        >
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-cyan-500 backdrop-blur-xl h-full flex items-center justify-center">
                                <div className="relative w-full h-32">
                                    <Image
                                        src={award.image || "/placeholder.svg"}
                                        alt={award.name}
                                        fill
                                        className="object-contain group-hover:grayscale-0 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
