"use client"

import { motion } from "framer-motion"
import { Collapse } from "antd"
import type { CollapseProps } from "antd"
import { FiChevronDown } from "react-icons/fi"
import { useEffect, useState } from "react"

const faqItems: CollapseProps["items"] = [
    {
        key: "1",
        label: "Why is an NGFW necessary if I already have a traditional firewall?",
        children: (
            <p className="text-gray-600 leading-relaxed">
                A traditional firewall filters traffic based on IP addresses and ports, leaving you exposed to application-layer
                attacks and sophisticated cyber threats. In contrast, a NGFW deeply inspects traffic for malicious content,
                identifies applications operating within the network, and actively blocks threats in real time. NGFWs provide
                deeper insight into user activity and allow you to enforce granular security policies based on business needs,
                ensuring a much higher level of protection.
            </p>
        ),
    },
    {
        key: "2",
        label: "Will an NGFW slow down my network performance?",
        children: (
            <p className="text-gray-600 leading-relaxed">
                Modern NGFWs are designed with high-performance hardware and optimized software to handle large volumes of
                traffic without significant latency. While deep packet inspection does require processing power, our
                enterprise-grade solutions from Palo Alto Networks and Fortinet are engineered to maintain network speed while
                providing comprehensive security. Many organizations actually experience improved network performance due to
                better traffic management and reduced security incidents.
            </p>
        ),
    },
    {
        key: "3",
        label: "How long does a typical NGFW deployment take?",
        children: (
            <p className="text-gray-600 leading-relaxed">
                The deployment timeline varies based on your network size, complexity, and specific requirements. For small to
                medium businesses, implementation typically takes 2-4 weeks. Larger enterprises with multiple locations may
                require 6-12 weeks for a complete rollout. Our phased approach ensures minimal disruption to your operations,
                with critical protections activated early in the process while fine-tuning continues in the background.
            </p>
        ),
    },
]

export default function ServiceFAQSection({ content }: { content: any }) {

    const [modifedContent, setModifiedContent] = useState<any[]>([])
    useEffect(() => {
        if (content) {
            const faqs: any = []
            content?.forEach((item: any, index: any) => faqs.push(
                {
                    key: item?.id,
                    label: item?.ques,
                    children: item?.content
                }
            ));
            console.log(faqs)
            setModifiedContent(faqs)
        }
    }, [content])

    return (
        <div className="flex flex-col gap-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-first-heading"
            >
                Frequently <span className="section-second-heading">asked questions</span>
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="col-span-3"
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
            </motion.div>
        </div>
    )
}
