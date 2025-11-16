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
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                    {
                        blogs.map((blog, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="cursor-pointer"
                                >
                                    <Link href={`/blogs/${String(blog?.id)}`}>
                                        <div className="relative w-[250px] h-[300px]">
                                            <div className="absolute top-0 left-0 w-full h-full z-10">
                                                <Image src={project2 || `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${blog?.previewImageUrl}`} alt="blogImg" width={400} height={400} className="w-full h-full rounded-2xl" />
                                            </div>

                                            <div className="absolute w-full h-full z-20 blogcard-layer opacity-30 rounded-2xl object-cover" />

                                            <div className="z-30 absolute bottom-0 p-3 flex gap-2 items-center justify-between w-full">
                                                <p className="text-white max-w-[180px]">{blog?.previewHeading?.slice(0, 45) + `${blog?.previewHeading?.length > 45 ? "..." : ""}`}</p>
                                                <FaArrowAltCircleRight size={22} color="white" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })
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