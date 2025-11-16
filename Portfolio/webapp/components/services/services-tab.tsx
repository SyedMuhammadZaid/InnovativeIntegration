"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiChevronRight } from "react-icons/fi"
import Image from "next/image"

const services = [
    {
        id: "ngfw",
        name: "NGFW Solutions",
        image: "/next-generation-firewall-network-security.jpg",
    },
    {
        id: "sase",
        name: "SASE Solutions",
        image: "/secure-access-service-edge-cloud-security.jpg",
    },
    {
        id: "ztna",
        name: "ZTNA Solutions",
        image: "/zero-trust-network-access-cybersecurity.jpg",
    },
    {
        id: "nac",
        name: "Network Access Control(NAC)",
        image: "/network-access-control-infrastructure.jpg",
    },
    {
        id: "iam",
        name: "Identity & Access Management",
        image: "/identity-access-management-security.jpg",
    },
]

export default function ServicesTabs({ list, bannerImg, selectedSubServiceContentHandler }: { list: any, bannerImg: any, selectedSubServiceContentHandler: (id: number) => void }) {

    const [activeService, setActiveService] = useState(list[0]?.id)

    const activeServiceData = list.find((s: any) => s.id === activeService)

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Service tabs */}
            <div className="space-y-3">
                {list.map((service: any, index: any) => (
                    <motion.button
                        key={service.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                            setActiveService(service.id);
                            selectedSubServiceContentHandler(service?.id)
                        }
                        }
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-lg text-left transition-all duration-300 ${activeService === service.id
                            ? "primary-linear-gradient text-white shadow-lg shadow-cyan-500/30"
                            : "bg-gray-100 service-tab-listing-item text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        <span className="font-semibold text-base">{service.name}</span>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeService === service.id ? "bg-white/20" : "bg-cyan-500"
                                }`}
                        >
                            <FiChevronRight className={`w-5 h-5 ${activeService === service.id ? "text-white" : "text-white"}`} />
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Right side - Dynamic image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                    {activeServiceData && (
                        <motion.div
                            key={activeServiceData.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                        >
                            <Image
                                src={bannerImg || "/placeholder.svg"}
                                alt={activeServiceData.name}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
