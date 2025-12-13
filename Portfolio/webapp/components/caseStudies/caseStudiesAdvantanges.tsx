"use client"

import { motion } from "framer-motion"
import aboutMission from "@/assets/images/about-mission.png";
import Image from "next/image";

export default function CaseStudyAdvantage({ content }: any) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 mt-3"
        >
            <div className="flex flex-row items-start flex-wrap gap-12">
                {/* Text Content */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                        The Innovative
                        <br />
                        Integration Advantage
                    </h2>
                    <p className="section-description leading-relaxed text-base!">
                        {content?.advantage}
                    </p>
                </div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={aboutMission}
                            alt="Data Center Security"
                            className="w-full h-96 object-cover"
                            width={300}
                            height={300}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}
