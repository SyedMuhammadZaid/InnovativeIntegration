'use client';
import ApproachAccordion from "@/components/services/approach";
import BenefitsGrid from "@/components/services/benefits";
import ServiceFAQSection from "@/components/services/faq";
import ServiceContent from "@/components/services/service-content";
import ServicesTabs from "@/components/services/services-tab";
import UseCasesSection from "@/components/services/useCases";
import VendorsSection from "@/components/services/vendors";
import Banner from "@/components/shared/banner/banner";
import { services } from "@/utils/data/services";
import { useState } from "react";

export default function ServiceDetail({ params }: { params: { id: string } }) {

    const { id } = params;
    let numberId = Number(id);

    // finding current selected service.
    const service = services.find(item => item.id == numberId);

    // titles for listing sub services.
    const serviceTitles = service?.subServices?.map((service) => {
        return (
            {
                id: service.id,
                name: service.title
            }
        )
    });

    // selected sub service of the main service.
    const [selectedSubService, setSelectedSubService] = useState(service?.subServices?.[0]);

    // handler to set active sub service data.
    const selectedSubServiceContent = (id: number) => {
        let currentSubService = service?.subServices.find(service => service.id == id);
        setSelectedSubService(currentSubService)
    }

    console.log("selectedSubService", selectedSubService)

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title={service?.mainService as string} content={service?.content as string} />
            <section className="container py-6! flex flex-col gap-8">
                <ServicesTabs list={serviceTitles} bannerImg={service?.bannerImg} selectedSubServiceContentHandler={selectedSubServiceContent} />
                <ServiceContent content={selectedSubService} />
                <BenefitsGrid content={selectedSubService?.benefits} />
                <VendorsSection content={selectedSubService?.technology} title={selectedSubService?.title} />
                <UseCasesSection content={selectedSubService?.useCases} />
                <ApproachAccordion content={selectedSubService?.approach} />
                <ServiceFAQSection content={selectedSubService?.faqs} />
            </section>
        </section>
    )
}