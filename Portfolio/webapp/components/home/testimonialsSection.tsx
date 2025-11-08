"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import testimonial1 from "@/assets/images/testimonial-1.png"
import Image from "next/image"

const testimonials = [
    {
        id: 1,
        quote:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        name: "Mattie Warner",
        position: "Founder & CEO",
        logo: testimonial1,
        bgColor: "from-red-600 to-red-700",
    },
    {
        id: 2,
        quote:
            "Outstanding cybersecurity services! Their team provided comprehensive solutions that protected our entire infrastructure. The attention to detail and proactive approach exceeded our expectations.",
        name: "James Mitchell",
        position: "CTO, Tech Solutions Inc",
        logo: testimonial1,
        bgColor: "from-blue-700 to-blue-800",
    },
]

export default function TestimonialsSection() {

    const [currentIndex, setCurrentIndex] = useState(0)

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }

    const currentTestimonial = testimonials[currentIndex]

    return (
        <section className="bg-gray-50 py-9">
            <div className="container mx-auto flex flex-col gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className=""
                >
                    <span className="about-section">TESTIMONIALS</span>
                    <div className='flex justify-start flex-wrap'>
                        <h2 className='section-first-heading leading-9!'>
                            What our clients
                            <span className='section-second-heading'> are saying</span>
                        </h2>
                    </div>
                </motion.div>

                <div className="relative flex items-center gap-6 ">
                    {/* Main testimonial card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-wrap shadow-2xl gap-2"
                            >
                                {/* Logo side*/}
                                <div
                                    className={`flex items-center justify-center w-auto md:w-[250px]`}
                                >
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Image src={testimonial1} alt="testimonial" />
                                    </motion.div>
                                </div>

                                {/* Testimonial content - Cyan gradient background */}
                                <div className="rounded-2xl flex-1 bg-gradient-to-br from-cyan-400 to-cyan-600 p-12 md:p-16 text-white w-3/5 relative">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                        <p className="text-sm md:text-base leading-relaxed mb-8">"{currentTestimonial.quote}"</p>
                                        <div>
                                            <h4 className="font-bold text-lg">{currentTestimonial.name}</h4>
                                            <p className="text-cyan-50 text-sm">{currentTestimonial.position}</p>
                                        </div>
                                    </motion.div>

                                    {/* Decorative quote icon */}
                                    <div className="absolute bottom-8 right-8 opacity-20">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <div className="flex flex-col gap-3">
                        <motion.button
                            onClick={goToPrevious}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full transition-colors shadow-lg"
                            aria-label="Previous testimonial"
                        >
                            <FiChevronUp className="text-xl" />
                        </motion.button>
                        <motion.button
                            onClick={goToNext}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors shadow-lg border border-gray-200"
                            aria-label="Next testimonial"
                        >
                            <FiChevronDown className="text-xl" />
                        </motion.button>
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-cyan-500" : "w-2 bg-gray-300"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
