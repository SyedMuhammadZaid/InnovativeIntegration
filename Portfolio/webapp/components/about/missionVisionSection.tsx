"use client"

import { motion } from "framer-motion"
import { Card } from "antd"
import { FiTarget, FiEye } from "react-icons/fi"
import Image from "next/image"
import aboutMission from "@/assets/images/about-mission.png"
import aboutVision from "@/assets/images/about-vision.png"

export default function MissionVisionSection() {
    const cards = [
        {
            title: "Our Mission",
            content:
                "To empower businesses with seamless, secure, and future-ready IT solutions, driven by integrity and a relentless commitment to your success.",
            image: aboutMission,
        },
        {
            title: "Our Vision",
            content:
                "To be the trusted force in secure enterprise solutions, shaping a future where businesses thrive through ethical and innovative technology.",
            image: aboutVision,
        },
    ]

    return (
        <section className="container py-9! bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <Card
                            hoverable
                            className="h-full border-2 border-slate-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 group bg-[#F2F2F5]!"
                        >
                            <div className="flex flex-wrap md:flex-nowrap justify-between gap-5 w-full">
                                {/* Image */}
                                <div className=" ">
                                    <Image
                                        src={card.image || "/placeholder.svg"}
                                        alt={card.title}
                                        className="w-[600px]! h-full object-cover object-center rounded-xl"
                                    />
                                </div>

                                {/* Icon and Title */}
                                <div className="flex items-start gap-3 flex-col">
                                    <h3 className="text-2xl font-bold text-slate-900">{card.title}</h3>

                                    {/* Content */}
                                    <p className="section-description">{card.content}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
