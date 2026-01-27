"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FiServer, FiCloud } from "react-icons/fi"

const icons = [FiServer, FiCloud, FiServer, FiCloud, FiServer, FiCloud];

export default function VendorsSection({ content, title }: { content: any, title: string }) {

    const [modifedContent, setModifiedContent] = useState<any[]>([])

    useEffect(() => {
        if (content) {
            const vendors: any = []
            content?.forEach((item: any, index: any) => vendors.push(
                {
                    ...item,
                    icon: icons[index]
                }
            ));
            setModifiedContent(vendors)
        }
    }, [content]);

    console.log("modifedContent", modifedContent)

    return (
        <div className="flex flex-col gap-3">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-first-heading"
            >
                Technology & Vendor Expertise
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="section-description text-lg"
            >
                We partner with most trusted names in the {title ?? "-"} industry:
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
                {modifedContent.map((vendor: any, index: any) => (
                    <motion.div
                        key={vendor?.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 primary-linear-gradient rounded-lg flex items-center justify-center">
                                    <vendor.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{vendor.title}</h3>
                                <p className="section-description leading-relaxed">{vendor.content}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
