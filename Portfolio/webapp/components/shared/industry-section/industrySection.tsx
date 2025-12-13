"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Logo {
    name: string
    image: any
}

interface IndustrySectionProps {
    name: string
    description: string
    bgColor: string
    textColor?: string
    logos: Logo[]
}

export default function IndustrySection({
    name,
    description,
    bgColor,
    textColor = "text-gray-900",
    logos,
}: IndustrySectionProps) {
    // Determine grid columns based on number of logos
    const getGridCols = () => {
        if (logos.length <= 4) return "grid-cols-2 md:grid-cols-4"
        if (logos.length <= 8) return "grid-cols-2 md:grid-cols-4"
        return "grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
    }

    return (
        <section className={`${bgColor} py-16 md:py-20`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-4`}>{name}</h2>
                    <p className={`${textColor} opacity-90 text-base md:text-lg max-w-3xl mx-auto`}>{description}</p>
                </motion.div>

                {/* Logos Grid */}
                <div className={`grid ${getGridCols()} gap-6`}>
                    {logos.map((logo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white rounded-lg p-8 flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 aspect-square"
                        >
                            <Image
                                src={logo.image || "/placeholder.svg"}
                                alt={logo.name}
                                width={150}
                                height={150}
                                className="w-auto h-auto max-w-full max-h-[80px] object-contain"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
