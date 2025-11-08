"use client"

import { motion } from "framer-motion"
import { Card } from "antd"
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi"
import { useEffect, useState } from "react"
import { getBlogs } from "@/utils/apis/blog"
import Image from "next/image"
import project2 from "@/assets/images/project-2.png"
import { FaArrowAltCircleRight } from "react-icons/fa"
import PrimaryButton from "../shared/button/primaryButton/primaryButton"
import { IoIosArrowDroprightCircle } from "react-icons/io"

const blogPosts = [
    {
        title: "Top 10 Cybersecurity Threats in 2025",
        excerpt: "Learn about the latest cybersecurity threats and how to protect your business",
        image: "/cybersecurity-threat-detection-blue.jpg",
        date: "March 15, 2025",
        author: "John Smith",
        category: "Security Trends",
    },
    {
        title: "Best Practices for Cloud Security",
        excerpt: "Essential strategies for securing your cloud infrastructure and data",
        image: "/cloud-security-network-hologram.jpg",
        date: "March 12, 2025",
        author: "Sarah Johnson",
        category: "Cloud Security",
    },
    {
        title: "Understanding Zero Trust Architecture",
        excerpt: "A comprehensive guide to implementing zero trust security models",
        image: "/network-security-shield-lock.jpg",
        date: "March 10, 2025",
        author: "Michael Chen",
        category: "Architecture",
    },
]

export default function BlogSection() {

    const [blogs, SetBlogs] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            try {
                let res: any = await getBlogs({ limit: 3, offset: 0 });
                if (res?.success) {
                    SetBlogs(res?.data)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-9">
            <div className="flex flex-col gap-6 container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center flex flex-col gap-2"
                >
                    <span className="about-section">Latest Blogs</span>
                    <div className='flex justify-center flex-wrap'>
                        <h2 className='section-first-heading leading-9!'>
                            Our latest
                            <span className='section-second-heading'> insight blogs</span>
                        </h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 items-start">
                    {
                        blogs?.length > 0
                            ?
                            blogs.map((blog, index) => (
                                <motion.div
                                    key={blog?.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="mx-auto"
                                >
                                    <div className="relative w-[250px] h-[300px]">
                                        <div className="absolute top-0 left-0 w-full h-full z-10">
                                            <Image src={project2 || `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${blog?.previewImageUrl}`} alt="blogImg" width={400} height={400} className="w-full h-full rounded-2xl" />
                                        </div>

                                        <div className="absolute w-full h-full z-20 blogcard-layer opacity-30 rounded-2xl object-cover" />

                                        <div className="z-30 absolute bottom-0 p-3 flex gap-2 items-center">
                                            <p className="text-white max-w-[200px]">{blog?.previewHeading?.slice(0, 45) + "..."}</p>
                                            <FaArrowAltCircleRight size={22} color="white" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                            :
                            <p>No Blogs Available</p>
                    }
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-4"
                >
                    <PrimaryButton                  
                        text='View All'
                        className='primary-btn hidden! lg:inline-flex! w-fit'
                        onClick={() => ''}
                        icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                    />
                </motion.div>
            </div>
        </section>
    )
}
