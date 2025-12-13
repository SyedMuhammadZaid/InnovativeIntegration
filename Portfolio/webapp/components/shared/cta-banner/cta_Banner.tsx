"use client"

import { motion } from "framer-motion"
import { FiPhone, FiClock } from "react-icons/fi"
import CtaImage from "@/assets/images/cta-image.png"
import Image from "next/image"
import SecondaryButton from "../button/secondaryButton/secondaryButton"
import { IoIosArrowDroprightCircle } from "react-icons/io"
import { useRouter } from "next/navigation"
import { MdEmail } from "react-icons/md"

export default function CtaSection({ title }: { title: string }) {
    const router = useRouter();
    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 primary-linear-gradient px-6 py-4 mx-auto">
                    {/* Left side - Content */}
                    <div className="flex flex-col gap-3 justify-around text-white col-span-2">
                        <h2 className="section-first-heading font-semibold! text-white! text-balance">
                            {title}
                        </h2>

                        <div className="flex gap-6 flex-wrap">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-2 rounded-lg">
                                    <FiPhone className=" text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="section-description text-white!">Get contact now</h3>
                                    <p className="section-description text-white!">+92-21-32200013</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-2 rounded-lg">
                                    <MdEmail className=" text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="section-description text-white!">Send E-mail</h3>
                                    <p className="section-description text-white!">info@innovativeintegration.net</p>
                                </div>
                            </div>

                            <SecondaryButton
                                text='Learn More'
                                onClick={() => router.push('/contact')}
                                className='secondary-btn'
                                icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                            />
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="relative flex justify-end items-center col-span-1">
                        <Image
                            src={CtaImage}
                            alt="Security Network"
                            className=" w-[300px] h-[200px] object-contain"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
