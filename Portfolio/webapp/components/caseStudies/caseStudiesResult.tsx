"use client"

import { motion } from "framer-motion"
import { FiCheckCircle } from "react-icons/fi"

export default function CaseStudyResults({ content }: any) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
        >
            <h2 className="text-2xl font-bold text-gray-900">Result:</h2>
            <div className="space-y-4">
                {
                    content?.result.map((result: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FiCheckCircle className="text-cyan-500 text-xl flex-shrink-0 mt-1" />
                            <div>
                                <span className="section-description text-base!"> {result}</span>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    )
}
