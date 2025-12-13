import Banner from "@/components/shared/banner/banner";
import CtaSection from "@/components/shared/cta-banner/cta_Banner";
import IndustrySection from "@/components/shared/industry-section/industrySection";
import fortniet from "../../../assets/images/AllPartners/fortinet.png"
import recordedFuture from "../../../assets/images/AllPartners/recordedFuture.png"
import netscout from "../../../assets/images/AllPartners/netscout.png"
import paloalto from "../../../assets/images/AllPartners/paloalto.png"
import forescout from "../../../assets/images/AllPartners/forescout.png"
import riverbad from "../../../assets/images/AllPartners/riverbad.png"
import appDynamics from "../../../assets/images/AllPartners/appDynamics.png"
import datadog from "../../../assets/images/AllPartners/datadog.png"
import f5 from "../../../assets/images/AllPartners/f5.png"
import logrhythm from "../../../assets/images/AllPartners/logrhythm.png"
import cohesity from "../../../assets/images/AllPartners/cohesity.png"
import netapp from "../../../assets/images/AllPartners/netapp.png"
import vmware from "../../../assets/images/AllPartners/vmware.png"
import trilio from "../../../assets/images/AllPartners/trilio.png"

const partners = [
    {
        name: "Cyber Security",
        description: "United with industry-leading partners to strengthen your defense against cyber threats.",
        bgColor: "bg-gray-100",
        logos: [
            { name: "fortniet", image: fortniet },
            { name: "recordedFuture", image: recordedFuture },
            { name: "netscout", image: netscout },
            { name: "paloalto", image: paloalto },
        ],
    },
    {
        name: "Private Cloud",
        description: "Powering digital transformation through trusted private cloud partners.",
        bgColor: "bg-amber-600",
        textColor: "text-white",
        logos: [
            { name: "cohesity", image: cohesity },
            { name: "netapp", image: netapp },
            { name: "vmware", image: vmware },
            { name: "trilio", image: trilio },
        ],
    },
    {
        name: "Network & Security",
        description: "Building resilient, high-performance networks with leading security partners.",
        bgColor: "bg-emerald-500",
        textColor: "text-white",
        logos: [
            { name: "netscout", image: netscout },
            { name: "paloalto", image: paloalto },
            { name: "netapp", image: netapp },
            { name: "forescout", image: forescout },
            { name: "riverbad", image: riverbad },
        ],
    },
    {
        name: "Application Delivery & Monitoring",
        description: "Optimizing application performance through powerful monitoring & delivery partners.",
        bgColor: "bg-[#0070C0]",
        textColor: "text-white",
        logos: [

            { name: "appDynamics", image: appDynamics },
            { name: "datadog", image: datadog },
            { name: "f5", image: f5 },
            { name: "logrhythm", image: logrhythm },
        ],
    },
]

export default function PartnersPage() {
    return (
        <section className="flex flex-col gap-5 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title="Our Partners" content="We are pleased to share our partners, Stronger together against cyber threats." />
            {partners.map((industry, index) => (
                <IndustrySection
                    key={index}
                    name={industry.name}
                    description={industry.description}
                    bgColor={industry.bgColor}
                    textColor={industry.textColor}
                    logos={industry.logos}
                />
            ))}
            <div className="mt-4 mb-10">
                <CtaSection title="Proactive Protection. Unwavering Support. Your Digital Security, Solved." />
            </div>
        </section>
    )
}