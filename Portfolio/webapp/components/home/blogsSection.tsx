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
import { useLoader } from "../shared/loadingContext/loaderContext"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
    const { showLoader, hideLoader } = useLoader()
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                showLoader()
                let res: any = await getBlogs({ limit: 4, offset: 0 });
                if (res?.success) {
                    SetBlogs(res?.data?.blogs)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                hideLoader()
            }
        })()
    }, [])

    return (

        <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 px-4 py-10">
            <div className="flex flex-col gap-12 container mx-auto max-w-7xl">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blogs?.length > 0 ? (
                        blogs.map((blog, index) => (
                            <motion.div
                                key={blog?.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer max-w-[300px]"
                            >
                                <Link href={`/blogs/${blog?.id}`}>
                                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative h-56 overflow-hidden">
                                            <Image
                                                src={project2 || `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${blog?.previewImageUrl}`}
                                                alt={blog?.previewHeading}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

                                            <div className="absolute top-4 left-4">
                                                <span className="bg-cyan-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                                                    {blog?.category || "Technology"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between gap-4 text-xs text-gray-500 mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <FiCalendar size={12} />
                                                    <span>{dayjs(blog?.createdAt).format('MMM DD, YYYY')}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FiUser size={12} />
                                                    <span>{blog?.author || "Admin"}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors duration-300 flex-grow">
                                                {blog?.previewHeading}
                                            </h3>

                                            <motion.div
                                                className="flex items-center gap-2 text-cyan-600 font-semibold text-sm mt-auto"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                Read Article
                                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </motion.div>
                                        </div>

                                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No blogs available at the moment</p>
                        </div>
                    )}
                </div>
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => { }}
                    >
                        View All Blogs
                        <IoIosArrowDroprightCircle size={20} />
                    </motion.button>
                </motion.div> */}
                <div className="text-center">
                    <PrimaryButton
                        text='View All Blogs'
                        className='primary-btn hidden! lg:inline-flex! w-fit'
                        onClick={() => router.push('/blogs')}
                        icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                    />
                </div>
            </div>
        </section>
    )
}
