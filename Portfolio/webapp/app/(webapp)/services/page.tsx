'use client';
import Banner from "@/components/shared/banner/banner";
import { motion } from "framer-motion";
import { FaArrowAltCircleRight, FaNetworkWired } from "react-icons/fa";
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
        icon: <FaNetworkWired size={30} className="service-icon group-hover:text-white!" />
    },
    {
        id: 2,
        title: "Application Delivery & Monitoring",
        content: "Boost your business performance by optimizing application delivery.",
        icon: <MdAppSettingsAlt size={30} className="service-icon group-hover:text-white!" />
    },
    {
        id: 3,
        title: "Cybersecurity",
        content: "Safeguard your business with our comprehensive cybersecurity services.",
        icon: <SiCyberdefenders size={30} className="service-icon group-hover:text-white!" />
    },
    {
        id: 4,
        title: "Private Cloud",
        content: "Gain ultimate control over your IT infrastructure with a tailored private cloud.",
        icon: <IoCloudDownload size={30} className="service-icon group-hover:text-white!" />
    },
    {
        id: 5,
        title: "Professional Services",
        content: "Leverage our technical expertise to transform your IT landscape.",
        icon: <IoSettingsSharp size={30} className="service-icon group-hover:text-white!" />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        services?.map((service, index) => {
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    onClick={() => serviceDetailHandler(service?.id)}
                                    className=" flex flex-col gap-6 px-4 py-6 rounded-3xl cursor-pointer service-card group">
                                    <span>{service?.icon}</span>
                                    <div className="flex justify-between items-center">
                                        <h2 className="group-hover:text-white max-w-[70%]">{service?.title}</h2>
                                        <FaArrowAltCircleRight size={20} className="service-icon group-hover:text-white!" />
                                    </div>
                                    <p className="group-hover:text-white">{service?.content}</p>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </section>
        </section>
    )
}