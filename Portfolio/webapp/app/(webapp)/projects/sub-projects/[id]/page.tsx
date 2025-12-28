'use client';

import Banner from "@/components/shared/banner/banner";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import { getSubProjects } from "@/utils/apis/project";
import { ParentLayerProjectsMapping, ParentLayerProjectsMappingDescription } from "@/utils/constants";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import project2 from "@/assets/images/project-2.png"
import { useRouter } from "next/navigation";

export default function SubProjects({ params }: { params: { id: string } }) {


    const { id } = params;
    const idAsNumber = Number(id);
    const { showLoader, hideLoader } = useLoader();
    const [subProjects, setSubProjects] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (idAsNumber) {
            (async () => {
                try {
                    showLoader()
                    let res: any = await getSubProjects({ id: idAsNumber });
                    if (res?.success) {
                        setSubProjects(res?.data)
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

    const projectsRedirectHandler = (project: any) => {
        localStorage.setItem('subProjectName', project.name)
        router.push(`/projects/${String(project?.id)}`)
    }

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title={ParentLayerProjectsMapping[id]} content={ParentLayerProjectsMappingDescription[id]} />
            <section className="container py-6! flex flex-col gap-8">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] gap-6">
                    {
                        subProjects?.map((project: any, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="cursor-pointer"
                                    onClick={() => projectsRedirectHandler(project)}
                                >
                                    <div className="relative w-[250px] h-[300px] flex flex-col rounded-xl">
                                        <div className="w-full h-[60%]">
                                            <Image src={`https://innovativeintegration-production-0f11.up.railway.app${project?.imageUrl}`} alt="eventImg" width={400} height={400} className="w-full h-full object-cover rounded-tl-xl rounded-tr-xl" />
                                        </div>

                                        <div className="h-full bg-white rounded-bl-2xl rounded-br-2xl p-3 flex flex-col gap-2 items-center justify-center w-full">
                                            <p className="truncate text-wrap w-full h-full text-start ">
                                                {project?.name}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </section>
        </section>
    )
}