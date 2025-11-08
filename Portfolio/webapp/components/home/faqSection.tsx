"use client"

import { motion } from "framer-motion"
import { Collapse } from "antd"
import type { CollapseProps } from "antd"
import homeFaq from "@/assets/images/home-faq.png"
import Image from "next/image"

const faqItems: CollapseProps["items"] = [
    {
        key: "1",
        label: "What is Cybersecurity?",
        children: (
            <p>
                Cybersecurity encompasses the comprehensive set of technologies, processes, and controls designed to protect systems, networks, and data from digital threats. Its purpose is to ensure the confidentiality, integrity, and availability of information against malicious attacks.
            </p>
        ),
    },
    {
        key: "2",
        label: "Why is cybersecurity important?",
        children: (
            <p>
                Cybersecurity is crucial for safeguarding your business from data breaches and cyberattacks. It protects sensitive information, ensures uninterrupted business operations, and prevents financial loss and reputational damage.
            </p>
        ),
    },
    {
        key: "3",
        label: "What are the most common cyber threats?",
        children: (
            <p>
                Common cyber threats include phishing attacks, which trick employees into revealing sensitive information; malware and ransomware, which can steal data or lock down your systems; and DDoS attacks, which can take your website offline.
            </p>
        ),
    },
    {
        key: "4",
        label: "How can I protect my business from cyber attacks?",
        children: (
            <p>
                You can protect your business by implementing a multi-layered security strategy. This includes deploying firewalls and antivirus software, regularly training your employees on security best practices, and partnering with experts to monitor and manage your systems.
            </p>
        ),
    },
]

export default function FaqSection() {
    return (
        <section className="bg-[#F2F2F5] py-9">
            <div className="container">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 p-2 items-center">
                    {/* Left side - Image */}
                    <div className="col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-start mb-6"
                        >
                            <span className="about-section">FAQ</span>
                            <div className='flex justify-start flex-wrap'>
                                <h2 className='section-first-heading leading-9!'>
                                    Cybersecurity questions <br />
                                    <span className='section-second-heading'> answered clearly</span>
                                </h2>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src={homeFaq}
                                alt="Cybersecurity FAQ"
                                width={400}
                                height={400}
                                className="rounded-2xl shadow-2xl w-[350px]"
                            />
                        </motion.div>
                    </div>

                    {/* Right side - FAQ */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="col-span-3"
                    >
                        <Collapse
                            items={faqItems}
                            ghost
                            expandIconPosition="end"
                            className="bg-transparent border"
                            style={{
                                background: "transparent",
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
