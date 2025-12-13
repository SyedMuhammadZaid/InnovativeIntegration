"use client"

import { motion } from "framer-motion"

export default function CaseStudyChallenge({ content }: any) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
        >
            <h2 className="text-2xl font-bold text-gray-900">Challenge</h2>
            <p className="section-description leading-relaxed text-base!">
                {content?.challenge}
            </p>
        </motion.section>
    )
}
