"use client"

import { motion } from "framer-motion"
import project1 from "@/assets/images/aboutUsFig2.png"
import project2 from "@/assets/images/project-2.png"
import project3 from "@/assets/images/project-3.png"
import project4 from "@/assets/images/project-4.png"
import project5 from "@/assets/images/project-5.png"
import Image from "next/image"
import Link from "next/link"
// import project2 from "@/assets/images/project-2.png"

const projects = [
    {
        title: "Cybersecurity Projects",
        category: "Cybersecurity",
        image: project1,
        gradient: "from-blue-600 to-cyan-500",
        id: 1
    },
    {
        title: "Backup & Network Projects",
        category: "Backup",
        image: project2,
        gradient: "from-purple-600 to-pink-500",
        id: 2
    },
    {
        title: "Enterprise Storage Projects",
        category: "Storage",
        image: project3,
        gradient: "from-cyan-600 to-blue-500",
        id: 3
    },
    {
        title: "Datacenter Projects",
        category: "Datacenter",
        image: project4,
        gradient: "from-pink-600 to-purple-500",
        id: 4
    },
    {
        title: "Traffic Load Balancing Projects",
        category: "Traffic Load",
        image: project5,
        gradient: "from-cyan-600 to-blue-500",
        id: 5
    },
    {
        title: "Server Load Balancing Projects",
        category: "Server Load",
        image: project2,
        gradient: "from-pink-600 to-purple-500",
        id: 6
    },
]

export default function ProjectsSection() {
    return (
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-9!">
            <div className="mx-auto container flex flex-col gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center flex flex-col gap-3"
                >
                    <span className="about-section">OUR PROJECTS</span>
                    <div className='flex justify-center flex-wrap'>
                        <h2 className='section-first-heading leading-9!'>
                            Showcasing our latest <br />
                            <span className='section-second-heading'> Projects</span>
                        </h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer mb-3"
                        >
                            <Link href={`/projects/sub-projects/${project.id}`}>
                                <div className={`relative overflow-hidden ${index == 0 ? 'md:rounded-tl-2xl md:rounded-bl-2xl' : projects.length - 1 == index ? 'md:rounded-tr-2xl md:rounded-br-2xl' : ''} shadow-xl`}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-80 object-cover transition-transform duration-500"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-[#00000073] group-hover:bg-gradient-to-t ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity delay-500 duration-500 ease-in-out`}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <span className="text-xs uppercase tracking-widest opacity-90 border border-white p-1 rounded-md">{project.category}</span>
                                        <h3 className="text-base mt-2 text-balance tracking-normal">{project.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full text-center flex items-center justify-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="section-description text-center max-w-[600px]"
                    >
                        We are pleased to share following projects that we completed with our prestigious customers in Financial, Oil and Gas, and Telco segments in Pakistan.
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
