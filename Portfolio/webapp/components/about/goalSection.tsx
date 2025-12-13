"use client"

import { motion } from "framer-motion"
import { FiAward, FiUsers, FiTrendingUp } from "react-icons/fi"

export default function GoalsSection() {
    const goals = [
        {
            icon: <FiAward className="text-4xl" />,
            title: "Market Leadership",
            description:
                "Lead the evolution of secure IT infrastructure, consistently introducing cutting-edge solutions to keep our clients ahead."
        },
        {
            icon: <FiUsers className="text-4xl" />,
            title: "Customer Partnerships",
            description:
                "Cultivate profound, lasting relationships where we become an essential extension of our clients' success, built on trust and value."
        },
        {
            icon: <FiTrendingUp className="text-4xl" />,
            title: "Team Excellence",
            description:
                "Empower the brightest minds in an environment of continuous innovation, integrity, and exceptional performance, driving collective success."
        },
    ]

    return (
        <section className="py-10! bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 flex flex-col gap-7">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="section-first-heading">Our Goals</h2>
                    <p className="mx-auto section-description max-w-[700px]">
                        At Innovative Integration, our vision for the future is clear. We're driven by strategic objectives designed to push boundaries, empower our clients, and strengthen our position as industry leaders.
                    </p>
                </motion.div>

                {/* Goals Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-br from-[#050A30] to-[#0A124F] rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="grid md:grid-cols-3 gap-8">
                        {goals.map((goal, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="relative group"
                            >
                                <div className="text-center space-y-4 p-6 rounded-2xl transition-all duration-300 hover:bg-white/5 border-2 border-transparent hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20">
                                    {/* Icon */}
                                    <div className="inline-block p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                                        {goal.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white">{goal.title}</h3>

                                    {/* Description */}
                                    <p className="text-slate-300 leading-relaxed">{goal.description}</p>
                                </div>

                                {/* Divider (not on last item) */}
                                {index < goals.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
