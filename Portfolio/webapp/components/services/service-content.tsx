"use client"

import { motion } from "framer-motion"

export default function ServiceContent({ content }: { content: any }) {
    console.log("content", content)
    return (
        <div className="">
            <div className="">
                <motion.div
                    key={content?.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-6"
                >
                    <h2 className="section-first-heading">
                        {content?.contentTitle}
                    </h2>
                    <p className="section-description">
                        {content?.contentTagLine}
                    </p>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold">
                            <span className="text-linear-gradient">What & Why: </span>
                            <span className="text-linear-gradient">{content?.what}</span>
                        </h3>
                        <p className="section-description leading-relaxed">
                            {content?.content}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
