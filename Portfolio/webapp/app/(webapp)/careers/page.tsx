'use client';
import Banner from "@/components/shared/banner/banner";
import PrimaryButton from "@/components/shared/button/primaryButton/primaryButton";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import { getCareers } from "@/utils/apis/careers";
import useMessage from "@/utils/hooks/useMessage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import CareerApplicationModal from "./careerModal";
import AwardsSection from "@/components/shared/awards/awards";

export default function Careers() {

    const { showLoader, hideLoader } = useLoader();
    const { successMsg, errorMsg, contextHolder } = useMessage();
    const [careers, setCareers] = useState([]);
    const [modalInfo, setModalInfo] = useState({
        open: false,
        id: null,
        title: "",
        tagline: "",
        description: ""
    })

    useEffect(() => {
        (async () => {
            try {
                showLoader()
                const allCareers: any = await getCareers();
                if (allCareers?.success) {
                    setCareers(allCareers?.data)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                hideLoader()
            }
        })()
    }, [])

    const applyCareerHandler = (career: any) => {
        setModalInfo({
            open: true,
            id: career?.id,
            title: career?.title,
            tagline: career?.tagline,
            description: career?.description
        })
    }

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title="Careers" content="Innovative Integration enjoys hiring extra ordinary talent. You are invited to apply if you have relevant experience and enthusiastic to work for any of the following positions." />
            <section className="container py-6! flex flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center flex flex-col justify-center items-center"
                >
                    <span className="about-section">JOIN OUR TEAM</span>
                    <div className='flex justify-start flex-wrap'>
                        <h2 className='section-first-heading leading-9!'>
                            Join Innovative Integration & <br />
                            <span className='section-second-heading'> Drive Your Exciting</span>
                        </h2>
                    </div>
                </motion.div>
                <div className="flex flex-col gap-5">
                    {
                        careers.map((career: any, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="cursor-pointer p-3 rounded-xl bg-white"
                                >
                                    <div className="rounded-bl-2xl flex items-center justify-between">
                                        <div className="w-full flex flex-col gap-2">
                                            <p className="text-lg font-semibold">
                                                {career?.title}
                                            </p>
                                            <span className="text-sm secondary-text-color">{career?.tagline}</span>
                                            <div className="text-sm text-wrap max-w-[900px]">
                                                <p className="break-all">{career?.description}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <PrimaryButton
                                                text='Apply Now'
                                                className='primary-btn'
                                                onClick={() => applyCareerHandler(career)}
                                                icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )

                        })
                    }
                </div>
                <div className="mb-4">
                    <p>Interested applications can also apply on E- mail address</p>
                    <span className="text-red-400 font-semibold cursor-pointer underline">careers@innovativeintegration.net</span>
                </div>
                {/* <AwardsSection /> */}
            </section>
            <CareerApplicationModal
                open={modalInfo?.open}
                onClose={() => setModalInfo({ ...modalInfo, open: false })}
                role={modalInfo?.title}
                department={modalInfo?.tagline}
                qualification={modalInfo?.description}
            />
        </section>
    )
}