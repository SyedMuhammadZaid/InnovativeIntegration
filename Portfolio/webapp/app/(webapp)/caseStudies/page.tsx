'use client';
import Banner from "@/components/shared/banner/banner";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import project2 from "@/assets/images/project-2.png"
import { getCaseStudies } from "@/utils/apis/caseStudies";
import CustomPagination from "@/components/shared/pagination/pagination";
import { FiArrowRight, FiCalendar, FiTag } from "react-icons/fi";
import dayjs from "dayjs";

export default function CaseStudies() {

    const router = useRouter();
    const { showLoader, hideLoader } = useLoader();
    const [caseStudies, setCaseStudies] = useState([]);
    const [filters, setFilters] = useState({
        total: 0,
        limit: 8,
        current: 1,
        offset: 0
    });

    useEffect(() => {
        (async () => {
            try {
                showLoader()
                let res: any = await getCaseStudies({ limit: filters.limit, offset: filters.offset });
                if (res?.success) {
                    setCaseStudies(res?.data?.caseStudies);
                    setFilters({ ...filters, total: res?.data?.count || 0 })
                }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                hideLoader()
            }
        })()
    }, [filters.offset])

    const caseStudiesRedirectHandler = (caseStudy: any) => {
        router.push(`/caseStudies/${caseStudy?.id}`)
    }

    const paginationChangeHandler = (page: number, pageSize: number) => {
        let offset = (page - 1) * filters.limit;
        setFilters({ ...filters, current: page, offset })
    }

    const getIndustryColor = (industry: string) => {
        const colors: any = {
            Banking: "from-blue-500 to-cyan-500",
            Healthcare: "from-emerald-500 to-teal-500",
            Technology: "from-purple-500 to-pink-500",
            Finance: "from-amber-500 to-orange-500",
            Retail: "from-rose-500 to-red-500",
        }
        return colors[industry] || "from-cyan-500 to-blue-500"
    }

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title="Our Case Studies" content="Together we build and deliver cutting-edge cybersecurity solutions addressing organizations relevant requirements, pain points and use cases." />
            <section className="container py-6! flex flex-col gap-8">
                {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] gap-6">
                    {
                        caseStudies?.map((caseStudy: any, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="cursor-pointer"
                                    onClick={() => caseStudiesRedirectHandler(caseStudy)}
                                >
                                    <div className="relative w-[250px] h-[300px] flex flex-col rounded-xl">
                                        <div className="w-full h-[60%]">
                                            <Image src={project2 || `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${caseStudy?.imageUrl}`} alt="caseStudyImg" width={400} height={400} className="w-full h-full object-cover rounded-tl-xl rounded-tr-xl" />
                                        </div>

                                        <div className="h-[40%] bg-white rounded-bl-2xl rounded-br-2xl p-3 flex flex-col gap-2 items-center justify-start w-full">
                                            <p className="truncate text-wrap w-full text-start h-fit secondary-text-color font-semibold">
                                                {caseStudy?.clientName}
                                            </p>
                                            <p
                                                className="line-clamp-2 w-full"
                                                title={caseStudy?.title}
                                            >
                                                {caseStudy?.title}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                </div> */}


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {caseStudies?.map((caseStudy: any, index) => {
                        const industry = caseStudy?.industry || "Banking"
                        const gradientColor = getIndustryColor(industry)

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                                onClick={() => caseStudiesRedirectHandler(caseStudy)}
                            >
                                <div className="relative h-[350px] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                                    {/* Image Container with Overlay */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={project2 || `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${caseStudy?.imageUrl}`} alt={caseStudy?.clientName}
                                            width={400}
                                            height={300}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Hover Arrow */}
                                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                                            <FiArrowRight className="w-5 h-5 text-cyan-600" />
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="px-4 py-4 flex flex-col gap-1">
                                        {/* Client Name */}
                                        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 truncate">
                                            {caseStudy?.clientName}
                                        </h3>

                                        {/* Title */}
                                        <p className="text-gray-700 text-sm line-clamp-2 flex-grow leading-relaxed">
                                            {caseStudy?.title}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <FiCalendar className="w-3.5 h-3.5" />
                                                <span>{dayjs(caseStudy?.updatedAt)?.format('MMM DD, YYYY') || "2024"}</span>
                                            </div>
                                            <div className="text-xs font-semibold text-cyan-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                View Details
                                                <FiArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                                    ></div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>


                <div>
                    {
                        caseStudies?.length > 0 &&
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