"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import aboutSetsUsApart1 from "@/assets/images/about-sets-apart-1.jpg"
import aboutSetsUsApart2 from "@/assets/images/about-sets-apart-2.jpg"
import aboutSetsUsApart3 from "@/assets/images/about-sets-apart-3.jpg"

export default function SetsUsApartSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const cards = [
        {
            title: "Focus & Philosophy",
            subtitle: "Engineered for Your Success Details",
            image: aboutSetsUsApart1,
            expandedText:
                "We are fundamentally problem-solvers, not product vendors. Our engineering-first philosophy means we meticulously design tailored solutions to your unique challenges, ensuring optimal performance and true business value."
        },
        {
            title: "Team & Expertise",
            subtitle: "Elite Certified Professionals Details",
            image: aboutSetsUsApart2,
            expandedText:
                "Our strength is our people: a team of passionate, highly certified experts. They specialize in architecting, implementing, and supporting mission-critical infrastructure, ensuring the seamless operation and growth of your business."
        },
        {
            title: "Commitment & Approach",
            subtitle: "Future-Ready Innovation Details",
            image: aboutSetsUsApart3,
            expandedText:
                "We maintain your competitive edge through continuous investment in our team's expertise and the latest technologies. This proactive approach ensures you're always equipped to thrive in a rapidly evolving IT landscape."
        },
    ]

    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="section-first-heading">What Sets Us Apart</h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer h-[500px] shadow-xl"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={card.image || "/placeholder.svg"}
                                    alt={card.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Dark overlay - becomes darker on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent group-hover:from-slate-900 group-hover:via-slate-900/80 transition-all duration-500" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-end p-8 z-10">
                                {/* Title - always visible, becomes bolder on hover */}
                                <motion.h3
                                    className="text-xl text-white mb-2 transition-all duration-300 group-hover:font-extrabold"
                                    animate={{
                                        fontWeight: hoveredIndex === index ? 800 : 700,
                                    }}
                                >
                                    {card.title}
                                </motion.h3>

                                {/* Subtitle - always visible */}
                                <p className="text-slate-300 text-sm mb-4">{card.subtitle}</p>

                                {/* Expanded text - fades in on hover */}
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{
                                        opacity: hoveredIndex === index ? 1 : 0,
                                        height: hoveredIndex === index ? "auto" : 0,
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-slate-200 leading-relaxed">{card.expandedText}</p>
                                </motion.div>
                            </div>

                            {/* Hover glow effect - travels from bottom to top */}
                            <motion.div
                                className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-cyan-500/30 via-cyan-400/20 to-transparent backdrop-blur-xl"
                                initial={{ y: "100%" }}
                                animate={{
                                    y: hoveredIndex === index ? "0%" : "100%",
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                }}
                            />

                            {/* Glowing border on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl border-2 border-cyan-500"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: hoveredIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Additional glow effect */}
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl -z-10"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: hoveredIndex === index ? 0.6 : 0,
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
