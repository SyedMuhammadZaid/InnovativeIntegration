"use client"

import { motion } from "framer-motion"
import project2 from "@/assets/images/project-2.png"
import Image from "next/image"

export default function CaseStudyHero({ content }: any) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
        >
            <div className="">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Client Name:</h3>
                <h1 className="text-4xl md:text-4xl font-bold text-gray-900">{content?.clientName}</h1>
            </div>

            <p className="section-description leading-relaxed text-base!">
                {content?.description}
            </p>

            {/* Banner Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500" />
                <Image src={`https://innovativeintegration-production-0f11.up.railway.app${content?.imageUrl}`} alt="caseStudyImg" width={400} height={400} className="w-full h-64 object-cover opacity-90" />
            </div>
        </motion.section>
    )
}
