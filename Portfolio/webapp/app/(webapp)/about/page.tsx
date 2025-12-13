import AboutHeroSection from "@/components/about/aboutHeroSection"
import ApproachSection from "@/components/about/approachSection"
import CeoMessageSection from "@/components/about/ceoMessage"
import CompanyHistorySection from "@/components/about/companyHistorySection"
import GoalsSection from "@/components/about/goalSection"
import MissionVisionSection from "@/components/about/missionVisionSection"
import SetsUsApartSection from "@/components/about/setsUsApart"
import AwardsSection from "@/components/shared/awards/awards"
import Banner from "@/components/shared/banner/banner"
import CtaSection from "@/components/shared/cta-banner/cta_Banner"
import type { Metadata } from "next"


export const metadata: Metadata = {
    title: "About Us - Your Trusted IT Security Partner",
    description: "Learn about our mission, vision, and commitment to delivering secure and scalable IT solutions.",
}

export default function AboutPage() {
    return (
        <section className="flex flex-col justify-start min-h-screen">
            <Banner title="About Our Company" content="Our Story is defined by a simple unwavering mission: to provide enterprise-class IT and security solutions built on the pillars of integrity, precision, and a relentless commitment to your success." />
            <AboutHeroSection />
            <MissionVisionSection />
            <CompanyHistorySection />
            <ApproachSection />
            <CeoMessageSection />
            <GoalsSection />
            <SetsUsApartSection />
            <AwardsSection />
            <div className="mb-14">
                <CtaSection title="Proactive Protection. Unwavering Support. Your Digital Security, Solved." />
            </div>
        </section>
    )
}
