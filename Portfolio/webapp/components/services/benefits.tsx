"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { FiShield, FiLayers, FiCpu, FiTrendingUp } from "react-icons/fi"

const benefits = [
    {
        icon: FiShield,
        title: "Granular Application & User Control",
        description:
            "Go beyond simple IP addresses. Our NGFWs identify and control applications and users based on business context. You can safely enable apps while limiting risky actions like file sharing.",
    },
    {
        icon: FiLayers,
        title: "Integrated Threat Prevention",
        description:
            "Our solutions consolidate multiple security functions like Intrusion Prevention Systems (IPS), antivirus, and anti-spyware into a single platform. This eliminates gaps in your infrastructure and provides a strong defense against both known and unknown threats.",
    },
    {
        icon: FiCpu,
        title: "Automated Threat Intelligence",
        description:
            "Leveraging AI and machine learning, our NGFWs stay real-time threat intelligence to detect and stop new attacks. This proactive defense helps you stay ahead of the curve with timely signature updates.",
    },
    {
        icon: FiTrendingUp,
        title: "Scalability & Performance",
        description:
            "Built with custom hardware, these firewalls deliver fast throughput and can impact encrypted traffic without compromising network speed. They are designed to scale to meet the demands of enterprise environments of any size.",
    },
]

const icons = [FiShield, FiLayers, FiCpu, FiTrendingUp];

export default function BenefitsGrid({ content }: { content: any }) {

    const [modifedContent, setModifiedContent] = useState<any[]>([])

    useEffect(() => {
        if (content) {
            const benefits: any = []
            content?.forEach((item: any, index: any) => benefits.push(
                {
                    ...item,
                    icon: icons[index]
                }
            ));
            setModifiedContent(benefits)
        }
    }, [content])


    return (
        <div className="flex flex-col gap-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-first-heading"
            >
                Key Benefits for Businesses
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
                {modifedContent.map((benefit: any, index: any) => (
                    <motion.div
                        key={benefit?.id}
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
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                <p className="section-description leading-relaxed">{benefit.content}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
