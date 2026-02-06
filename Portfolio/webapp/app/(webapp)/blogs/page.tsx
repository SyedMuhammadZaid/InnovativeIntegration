'use client';
import Banner from "@/components/shared/banner/banner";
import { getBlogs } from "@/utils/apis/blog";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import project2 from "@/assets/images/project-2.png"
import { FaArrowAltCircleRight } from "react-icons/fa";
import CustomPagination from "@/components/shared/pagination/pagination";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import dayjs from "dayjs";

export default function Blogs() {

    const [blogs, SetBlogs] = useState<any[]>([]);

    const [filters, setFilters] = useState({
        total: 0,
        limit: 6,
        current: 1,
        offset: 0
    });

    const { showLoader, hideLoader } = useLoader()

    useEffect(() => {
        (async () => {
            try {
                showLoader()
                let res: any = await getBlogs({ limit: filters.limit, offset: filters.offset });
                if (res?.success) {
                    SetBlogs(res?.data?.blogs);
                    setFilters({ ...filters, total: res?.data?.count });
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                hideLoader()
            }
        })()
    }, [filters.offset])

    const paginationChangeHandler = (page: number, pageSize: number) => {
        let offset = (page - 1) * filters.limit;
        setFilters({ ...filters, current: page, offset })
    }

    console.log('blogslisting', blogs)

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title="Latest Blogs" content="Explore the latest insights in Cyber Security, Data Management, and Emerging Tech." />
            <section className="container py-6! flex flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className='flex flex-col justify-center items-center text-center flex-wrap '>
                        <span className="about-section">LATEST BLOGS</span>
                        <h2 className='section-first-heading leading-9!'>
                            Our Latest
                            <span className='section-second-heading'> insights Blogs</span>
                        </h2>
                    </div>
                </motion.div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 md:mx-0 mx-auto">
                    {
                        blogs?.length > 0 ?
                        blogs.map((blog, index) => {
                            return (
                                <motion.div
                                    key={blog?.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    // viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group cursor-pointer max-w-[300px]"
                                >
                                    <Link href={`/blogs/${blog?.id}`}>
                                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                                            {/* Image Container */}
                                            <div className="relative h-56 overflow-hidden">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${blog?.previewImageUrl}`}
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
                            )
                        })
                        :
                        <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No Blogs available at the moment</p>
                    </div>
                    }
                </div>
                <div>
                    {
                        blogs?.length > 0 &&
                        <CustomPagination
                            current={filters.current}
                            total={filters.total}
                            pageSize={filters.limit}
                            paginationChange={paginationChangeHandler}
                        />
                    }
                </div>
            </section>
        </section>
    )
}