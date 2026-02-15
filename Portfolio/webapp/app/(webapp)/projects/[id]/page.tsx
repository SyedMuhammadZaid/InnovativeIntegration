'use client';

import Banner from "@/components/shared/banner/banner";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import Image from "next/image";
import project2 from "@/assets/images/project-2.png"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProject, getProjects } from "@/utils/apis/project";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import CtaSection from "@/components/shared/cta-banner/cta_Banner";
import { AdminPanelUrl } from "@/utils/constants";

export default function Projects({ params }: { params: { id: string } }) {

    const { id } = params;
    const idAsNumber = Number(id);
    const { showLoader, hideLoader } = useLoader();
    const [projects, setProjects] = useState([]);
    const [active, setActive] = useState(0);
    const [activeProject, setActiveProject] = useState<any>(null);
    const [bannerName, setBannerName] = useState(localStorage?.getItem('subProjectName')!)

    useEffect(() => {
        if (idAsNumber) {
            (async () => {
                try {
                    showLoader()
                    let res: any = await getProjects({ id: idAsNumber });
                    if (res?.success) {
                        if (res?.data?.length > 0) {
                            setActiveProject(res.data[0]);
                            setActive(res.data[0]?.id);
                        }
                        setProjects(res?.data);
                    }
                }
                catch (error) {
                    console.log(error)
                }
                finally {
                    hideLoader()
                }
            })()
        }
    }, [id])

    console.log(activeProject)

    const projectHandler = async (project: any) => {
        setActive(project?.id);
        setActiveProject(project)
    }

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title={bannerName} content={''} />
            <section className="container py-6! flex flex-col gap-8">
                <div className="w-full p-3 flex items-center gap-3 flex-wrap">
                    {
                        projects?.length > 0 ?
                            projects.map((project: any, index: any) => {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                        className={`w-fit border p-3 rounded-md cursor-pointer ${project?.id == active ? 'primary-linear-gradient text-white' : 'bg-gray-500 text-white'}`}
                                        onClick={() => projectHandler(project)}
                                    >
                                        <p>{project?.name}</p>
                                    </motion.div>
                                )
                            })
                            :
                            <p className="text-center">No Projects Added</p>
                    }
                </div>
                {
                    activeProject &&
                    <motion.div
                        key={activeProject?.id}
                        className="w-full p-3 flex flex-col gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex flex-col">
                            <h2 className="section-description text-lg!">Client Name:</h2>
                            <h2 className="text-xl font-semibold">{activeProject?.clientName}</h2>
                        </div>
                        <div className="service-tab-listing-item bg-white rounded-bl-xl rounded-br-xl">
                            <Image src={`${AdminPanelUrl}${activeProject?.imageUrl}`} alt="project" width={200} height={200} className="w-full object-cover h-[300px] rounded-tl-xl rounded-tr-xl" />
                            <div className="px-5 py-7 flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold primary-text-color">Challenge</h2>
                                    <p className="section-description text-base!">{activeProject?.challenge}</p>
                                </div>
                                <hr className="text-gray-300" />
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold primary-text-color">Solution</h2>
                                    <p className="section-description text-base!">{activeProject?.solution}</p>
                                </div>
                                <hr className="text-gray-300" />
                                {
                                    activeProject?.approach?.length > 0 &&
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-2xl font-bold primary-text-color">Approach</h2>
                                        <div className="flex flex-col gap-4 p-2">
                                            {
                                                activeProject?.approach?.map((approach: string, index: number) => {
                                                    return (
                                                        <div className="flex items-center gap-3">
                                                            <FaCheckCircle color="#003173" />
                                                            <p className="section-description text-base!" key={index}>{approach}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                                <hr className="text-gray-300" />
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold primary-text-color">Result</h2>
                                    <p className="section-description text-base!">{activeProject?.result}</p>
                                </div>
                                <hr className="text-gray-300" />
                                {
                                    activeProject?.impact?.length > 0 &&
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-2xl font-bold primary-text-color">Measurable Impact</h2>
                                        <div className="flex flex-col gap-4 p-2">
                                            {
                                                activeProject?.impact?.map((impact: string, index: number) => {
                                                    return (
                                                        <div className="flex items-center gap-3">
                                                            <FaCheckCircle color="#003173" />
                                                            <p className="section-description text-base!" key={index}>{impact}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </motion.div>
                }
                <CtaSection title="Proactive Protection. Unwavering Support. Your Digital Security, Solved." />

            </section>
        </section>
    )
}