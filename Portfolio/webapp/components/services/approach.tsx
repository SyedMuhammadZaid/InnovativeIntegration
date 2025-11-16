"use client"

import { motion } from "framer-motion"
import { Collapse } from "antd"
import type { CollapseProps } from "antd"
import { FiChevronDown } from "react-icons/fi"
import Image from "next/image"
import { useEffect, useState } from "react"
import servicesApproach from "@/assets/images/services-approach.png"
import { MdAssessment } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import { GrDeploy } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";

export default function ApproachAccordion({ content }: { content: any }) {
    
    return (
        <div className="flex flex-col gap-3">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-first-heading"
            >
                Our Proven Approach
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="section-description text-lg"
            >
                We provide a 360-degree process of securing your network with a structured deployment process.
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-12 items-center mt-2">
                {/* Left side - Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
                >
                    <Image src={servicesApproach} alt="Our Proven Approach" fill className="object-cover" />
                </motion.div>

                {/* Right side - Accordion */}
                {/* <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="col-span-1"
                >
                    <Collapse
                        items={modifedContent}
                        ghost
                        expandIconPosition="end"
                        className="bg-transparent border"
                        style={{
                            background: "transparent",
                        }}
                    />
                </motion.div> */}

                <div className="grid grid-cols-2 gap-5">
                    {content.map((approach: any, index: any) => (
                        <motion.div
                            key={approach?.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start gap-4">
                                {/* <div className="flex-shrink-0">
                                    <div className="w-12 h-12 primary-linear-gradient rounded-lg flex items-center justify-center">
                                        <useCase.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div> */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{approach?.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{approach?.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
