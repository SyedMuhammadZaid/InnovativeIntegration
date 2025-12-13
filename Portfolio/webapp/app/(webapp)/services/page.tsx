'use client';
import Banner from "@/components/shared/banner/banner";
import { motion } from "framer-motion";
import { FaArrowAltCircleRight, FaArrowRight, FaNetworkWired } from "react-icons/fa";
import { MdAppSettingsAlt } from "react-icons/md";
import { SiCyberdefenders } from "react-icons/si";
import { IoCloudDownload } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const services = [
    {
        id: 1,
        title: "Network & Security",
        content: "We build and secure your digital backbone with enterprise-class network solutions.",
        icon: <FaNetworkWired size={40} />,
        gradient: "from-blue-500 to-cyan-500",
        bgPattern: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
    },
    {
        id: 2,
        title: "Application Delivery & Monitoring",
        content: "Boost your business performance by optimizing application delivery.",
        icon: <MdAppSettingsAlt size={40} />,
        gradient: "from-purple-500 to-pink-500",
        bgPattern: "radial-gradient(circle at 80% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
    },
    {
        id: 3,
        title: "Cybersecurity",
        content: "Safeguard your business with our comprehensive cybersecurity services.",
        icon: <SiCyberdefenders size={40} />,
        gradient: "from-emerald-500 to-teal-500",
        bgPattern: "radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
    },
    {
        id: 4,
        title: "Private Cloud",
        content: "Gain ultimate control over your IT infrastructure with a tailored private cloud.",
        icon: <IoCloudDownload size={40} />,
        gradient: "from-orange-500 to-amber-500",
        bgPattern: "radial-gradient(circle at 70% 70%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
    },
    {
        id: 5,
        title: "Professional Services",
        content: "Leverage our technical expertise to transform your IT landscape.",
        icon: <IoSettingsSharp size={40} />,
        gradient: "from-indigo-500 to-blue-500",
        bgPattern: "radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
    },
]

export default function Services() {

    const router = useRouter();
    const serviceDetailHandler = (id: number) => {
        router.push(`/services/serviceDetail/${id}`)
    }

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title="Our Offered Services" content="Stay ahead of tomorrow's cyber security threats with the right tools from Innovative integration." />
            <section className="container py-6! flex flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className='flex justify-center items-center text-center flex-wrap '>
                        <h2 className='section-first-heading leading-9!'>
                            Comprehensive cybersecurity <br />
                            <span className='section-second-heading'> services for protection</span>
                        </h2>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {services?.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            onClick={() => serviceDetailHandler(service?.id)}
                            className="group relative cursor-pointer"
                        >
                            {/* Card */}
                            <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:border-transparent">
                                {/* Background pattern on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: service.bgPattern }}
                                />

                                {/* Gradient border glow on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500 blur-xl`}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon with gradient background */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                                    >
                                        {service?.icon}
                                    </motion.div>

                                    {/* Title with arrow */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                                            {service?.title}
                                        </h3>
                                        <motion.div
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                            className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg`}
                                        >
                                            <FaArrowRight className="text-sm" />
                                        </motion.div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                                        {service?.content}
                                    </p>

                                    {/* Decorative line */}
                                    <div
                                        className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} rounded-full transition-all duration-500`}
                                    />
                                </div>

                                {/* Number badge */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-600 flex items-center justify-center text-slate-400 group-hover:text-white font-bold text-sm transition-all duration-300">
                                    {service.id}
                                </div>
                            </div>

                            {/* Hover glow effect underneath */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10 scale-95`}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
        </section>
    )
}