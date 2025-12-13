"use client"

import { motion } from "framer-motion"
import { FaCircleCheck } from "react-icons/fa6"

const principles = [
    "We are a team of passionate problem-solvers, not salespeople, dedicated to delivering consistent, deep technical capability.",
    "We align exclusively with world-class vendors to provide robust and reliable solutions.",
    "Our zero-debt operations and strict ethical code build relationships based on unwavering trust and professionalism.",
    "We measure our success through the long-term partnerships and trust we earn from our satisfied clients."
]

export default function CeoMessageSection() {
    return (
        <section className="py-10! bg-white container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto text-center"
            >
                {/* Label */}
                <p className="about-section">CEO MESSAGE</p>

                {/* Heading with gradient highlight */}
                <div className="relative inline-block mb-8">
                    <h2 className="section-first-heading text-slate-900 relative z-10">Innovative Integration</h2>
                    <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 blur-sm -z-0" />
                </div>

                {/* Message Content */}
                <div className="text-description space-y-5 leading-relaxed">
                    <p className="text-start">
                        My journey to founding Innovative Integration in 2007 was driven by a clear need for change. After earning my Master's in Networks and working at Cisco, I saw firsthand the industry's challenges from poor financial discipline to a disconnect in service delivery. I observed a "brain drain" of talent and a widespread dissatisfaction among customers, suppliers, and employees alike, confirming that a better way was essential. This motivated me to build a company committed to providing world-class solutions, where integrity, engineering excellence, and customer trust would always be our guiding principles.
                    </p>

                    <p className="text-start">
                        The Four Core Principles that Drive Us
                        <div className="flex flex-col gap-3 mt-3">
                            {
                                principles.map((principle, index) => {
                                    return (
                                        <div className="flex items-center gap-3" key={index}>
                                            <FaCircleCheck className="primary-text-color" size={20} />
                                            <p>{principle}</p>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </p>


                </div>
            </motion.div>
        </section>
    )
}
