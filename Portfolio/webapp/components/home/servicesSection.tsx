"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiShield, FiMonitor, FiLock, FiCloud, FiSettings } from "react-icons/fi"
import { HiArrowRight } from "react-icons/hi"
import Link from "next/link"
import Image from "next/image"
import counter1Fig from "@/assets/images/counter1-fig.png"
import counter2Fig from "@/assets/images/counter2-fig.png"
import counter3Fig from "@/assets/images/counter3-fig.png"
import service1 from "@/assets/images/service-1.png"
import service2 from "@/assets/images/service-2.png"
import service3 from "@/assets/images/service-3.png"
import service4 from "@/assets/images/service-4.png"
import service5 from "@/assets/images/service-5.png"
import Counter from "../shared/counter/counter"


const services = [
    {
        icon: FiShield,
        title: "Network & Security",
        color: "from-cyan-500 to-blue-600",
        description: "We build and secure your digital backbone with enterprise-class network solutions, ensuring seamless connectivity and proactive defense against cyber threats.",
        image: service1,
        link: "/services/serviceDetail/1"
    },
    {
        icon: FiMonitor,
        title: "Application Delivery & Monitoring",
        color: "from-purple-500 to-pink-600",
        description: "Boost your business performance by optimizing application delivery. Our constant monitoring guarantees high availability, speed, and a flawless user experience.",
        image: service2,
        link: "/services/serviceDetail/2"
    },
    {
        icon: FiLock,
        title: "Cybersecurity",
        color: "from-blue-500 to-cyan-600",
        description: "Safeguard your business with our comprehensive cybersecurity services. We provide proactive threat detection and expert breach response to secure your assets and reputation.        ",
        image: service3,
        link: "/services/serviceDetail/3"
    },
    {
        icon: FiCloud,
        title: "Private Cloud",
        color: "from-indigo-500 to-purple-600",
        description: "Gain ultimate control over your IT infrastructure with a tailored private cloud. We deliver a secure, scalable, and dedicated environment to drive your innovation.",
        image: service4,
        link: "/services/serviceDetail/4"
    },
    {
        icon: FiSettings,
        title: "Professional Services",
        color: "from-cyan-500 to-teal-600",
        description: " Leverage our technical expertise to transform your IT landscape. We're your trusted partner for strategic consulting, seamless integration, and project success.",
        image: service5,
        link: "/services/serviceDetail/5"
    },
]

const stats = [
    { value: 17, label: "Years Experience", image: counter1Fig },
    { value: 1000, label: "Project Completed", image: counter2Fig },
    { value: 600, label: "Happy Clients", image: counter3Fig },
]

export default function ServicesSection() {

    const [activeService, setActiveService] = useState<number | null>(null);

    const toggleService = (index: number) => {
        setActiveService(activeService === index ? null : index)
    }

    return (
        <section className="services-section relative py-10 md:py-20 px-4 md:px-8 lg:px-16">

            <div className="services-overlay"></div>
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto relative z-10 p-2 flex flex-col gap-5 sm:gap-10 md:gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="about-section text-white!">OUR SERVICES</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">What We Offer</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left side - Service list */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div
                                    onClick={() => toggleService(index)}
                                    className={`bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden cursor-pointer transition-all ${activeService === index ? "border-cyan-500/60 bg-white/10" : "border-cyan-500/20 hover:bg-white/10"
                                        }`}
                                >
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`bg-gradient-to-br ${service.color} p-3 rounded-lg`}>
                                                <service.icon className="text-white text-xl" />
                                            </div>
                                            <span className="text-white font-semibold">{service.title}</span>
                                        </div>
                                        <motion.div animate={{ rotate: activeService === index ? 90 : 0 }} transition={{ duration: 0.3 }}>
                                            <HiArrowRight className="text-cyan-400 text-xl" />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {activeService === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 border-t flex flex-col gap-2 border-cyan-500/20">
                                                    <p className="section-description !text-gray-300 leading-relaxed">{service.description}</p>
                                                    <Link href={service.link} className="secondary-text-color">Learn More</Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right side - Dynamic Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block relative top-2"
                    >
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    // key={activeService ?? "default"}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        opacity: { duration: 0.3 },
                                        scale: { duration: 0.3 },
                                        y: {
                                            duration: 4,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        },
                                    }}
                                >
                                    <Image
                                        src={activeService !== null ? services[activeService].image : services[0].image}
                                        alt={activeService !== null ? services[activeService].title : services[0].title}
                                        className="w-full h-auto rounded-2xl"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Glowing effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-cyan-500/20 blur-3xl -z-10" />
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-3/4 w-full mx-auto h-[1px] bg-gray-400 opacity-15"></div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center flex flex-col justify-center items-center"
                        >
                            <div className="inline-block p-4 bg-white/5 rounded-lg mb-4 w-fit">
                                <Image
                                    src={stat.image}
                                    alt="counterImg"
                                    width={100}
                                    height={100}
                                    className="w-[50px] h-[50px] object-contain smooth-scaling-icon"
                                />
                            </div>
                            <Counter from={0} to={stat.value} className="text-4xl md:text-5xl font-bold text-white mb-2" />
                            <p className="section-description text-gray-400!">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
