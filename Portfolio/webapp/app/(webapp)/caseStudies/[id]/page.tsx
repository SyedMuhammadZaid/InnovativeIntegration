'use client';

import CaseStudyAdvantage from "@/components/caseStudies/caseStudiesAdvantanges";
import CaseStudyChallenge from "@/components/caseStudies/caseStudiesChallenge";
import CaseStudyHero from "@/components/caseStudies/caseStudiesHero";
import CaseStudyResults from "@/components/caseStudies/caseStudiesResult";
import CaseStudySolution from "@/components/caseStudies/caseStudiesSolution";
import AwardsSection from "@/components/shared/awards/awards";
import Banner from "@/components/shared/banner/banner";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import { getCaseStudy } from "@/utils/apis/caseStudies";
import { useEffect, useState } from "react";

export default function CaseStudy({ params }: { params: { id: string } }) {

    const { id } = params;
    const idAsNumber = Number(id);
    const { showLoader, hideLoader } = useLoader();
    const [caseStudy, setCaseStudy] = useState<any>(null);

    useEffect(() => {
        if (idAsNumber) {
            (async () => {
                try {
                    showLoader()
                    let res: any = await getCaseStudy({ id: idAsNumber });
                    if (res?.success) {
                        if (res?.data) setCaseStudy(res?.data);
                    }
                } catch (error) {
                    console.log(error)
                }
                finally {
                    hideLoader()
                }
            })()
        }
    }, [id])

    return (
        <section className="flex flex-col justify-start min-h-screen">
            <Banner title={caseStudy?.title ?? '-'} content="" />
            <section className="container py-6! flex flex-col gap-8">
                <div className="w-full flex flex-col gap-8 p-5 rounded-md caseStudy-bg">
                    <CaseStudyHero content={caseStudy} />
                    <CaseStudyChallenge content={caseStudy} />
                    <CaseStudySolution content={caseStudy} />
                    <CaseStudyResults content={caseStudy} />
                    <CaseStudyAdvantage content={caseStudy} />
                </div>
                <AwardsSection />
            </section>
        </section>
    )
}