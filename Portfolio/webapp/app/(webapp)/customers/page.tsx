import type { Metadata } from "next"
import IndustrySection from "@/components/shared/industry-section/industrySection"
import Banner from "@/components/shared/banner/banner"
import hbl from "../../../assets/images/AllCustomers/hbl.png"
import ubl from "../../../assets/images/AllCustomers/ubl.png"
import stateBank from "../../../assets/images/AllCustomers/state_of_pakistan.png"
import alfalah from "../../../assets/images/AllCustomers/Alfalah.png"
import standardChartered from "../../../assets/images/AllCustomers/standard.jpg"
import bankIslami from "../../../assets/images/AllCustomers/bankIslami.png"
import mcb from "../../../assets/images/AllCustomers/mcb.png"
import bankAlhabib from "../../../assets/images/AllCustomers/bankAlHabib.png"
import habibMetro from "../../../assets/images/AllCustomers/habibMetro.jpg"
import deutsche from "../../../assets/images/AllCustomers/deutsche.png"
import ubank from "../../../assets/images/AllCustomers/Ubank.jpg"
import nrsp from "../../../assets/images/AllCustomers/nrsp.png"
import mobilink from "../../../assets/images/AllCustomers/mobilink.jpg"
import jsbank from "../../../assets/images/AllCustomers/jsbank.png"
import khushaliBank from "../../../assets/images/AllCustomers/khushaliBank.jpg"
import energyEni from "@/assets/images/AllCustomers/energy_eni.png"
import energyKe from "@/assets/images/AllCustomers/energy_ke.png"
import energyParco from "@/assets/images/AllCustomers/energy_parco.png"
import energyPso from "@/assets/images/AllCustomers/energy_pso.png"
import energySsgcl from "@/assets/images/AllCustomers/energy_ssgcl.png"
import energySui from "@/assets/images/AllCustomers/energy_sui.png"
import energyUep from "@/assets/images/AllCustomers/energy_uep.png"
import pharmaAgha from "@/assets/images/AllCustomers/pharma_agha.png"
import pharmaLums from "@/assets/images/AllCustomers/pharma_lums.png"
import pharmaMerck from "@/assets/images/AllCustomers/pharma_merck.png"
import pharmaUs from "@/assets/images/AllCustomers/pharma_us.png"
import telecomJazz from "@/assets/images/AllCustomers/telecomm_jazz.png"
import telecomMobilink from "@/assets/images/AllCustomers/telecomm_mobilink.png"
import telecomTelenor from "@/assets/images/AllCustomers/telecomm_telenor.png"
import telecomZong from "@/assets/images/AllCustomers/telecomm_zong.png"
import tcs from "@/assets/images/AllCustomers/logistics_tcs.png"
import telecomDp from "@/assets/images/AllCustomers/logisctics_dp.png"
import telecomKict from "@/assets/images/AllCustomers/logisctics_kict.png"
import telecomSapt from "@/assets/images/AllCustomers/logisctics_sapt.png"
import contour from "@/assets/images/AllCustomers/It_contour.png"
import mentor from "@/assets/images/AllCustomers/It_mentor.png"
import nielsen from "@/assets/images/AllCustomers/It_nielsen.png"
import trg from "@/assets/images/AllCustomers/It_trg.png"
import atlas from "@/assets/images/AllCustomers/other_atlas.png"
import coca from "@/assets/images/AllCustomers/other_coca.png"
import psel from "@/assets/images/AllCustomers/other_psel.png"
import yamaha from "@/assets/images/AllCustomers/other_yamaha.png"
import CtaSection from "@/components/shared/cta-banner/cta_Banner"

export const metadata: Metadata = {
    title: "Our Customers - Trusted by Leading Organizations",
    description:
        "We proudly serve leading organizations across Banking & Finance, Energy, Healthcare, Telecom, and more industries.",
}

const industries = [
    {
        name: "Banking & Finance",
        description: "We are trusted by the financial industry as partners for secure banking operations",
        bgColor: "bg-gray-100",
        logos: [
            { name: "HBL", image: hbl },
            { name: "UBL", image: ubl },
            { name: "State Bank", image: stateBank },
            { name: "Standard Chartered", image: standardChartered },
            { name: "Bank Alfalah", image: alfalah },
            { name: "BankIslami", image: bankIslami },
            { name: "MCB Bank", image: mcb },
            { name: "Bank AlHabib", image: bankAlhabib },
            { name: "Habib Metro", image: habibMetro },
            { name: "Deutsche Bank", image: deutsche },
            { name: "UBank", image: ubank },
            { name: "NRSP Microfinance", image: nrsp },
            { name: "Mobilink Bank", image: mobilink },
            { name: "JS Bank", image: jsbank },
            { name: "Khushhali Bank", image: khushaliBank },
        ],
    },
    {
        name: "Energy, Oil & Gas",
        description: "Powering the energy sector with secure and reliable IT solutions",
        bgColor: "bg-orange-500",
        textColor: "text-white",
        logos: [
            { name: "Eni", image: energyEni },
            { name: "Ke", image: energyKe },
            { name: "Parco", image: energyParco },
            { name: "Pso", image: energyPso },
            { name: "Ssgcl", image: energySsgcl },
            { name: "Sui", image: energySui },
            { name: "Uep", image: energyUep },
        ],
    },
    {
        name: "Pharmacia, Health & Education",
        description: "Supporting healthcare and education with innovative technology solutions",
        bgColor: "bg-amber-400",
        textColor: "text-gray-900",
        logos: [
            { name: "agha", image: pharmaAgha },
            { name: "lums", image: pharmaLums },
            { name: "merck", image: pharmaMerck },
            { name: "pharmaUs", image: pharmaUs },
        ],
    },
    {
        name: "Telecommunication",
        description: "We empower telecommunications with our advanced security and network solutions",
        bgColor: "bg-cyan-400",
        textColor: "text-gray-900",
        logos: [

            { name: "jazz", image: telecomJazz },
            { name: "mobilink", image: telecomMobilink },
            { name: "telenor", image: telecomTelenor },
            { name: "zong", image: telecomZong },
        ],
    },
    {
        name: "Transportation And Logistics",
        description: "Delivering secure logistics and transportation management systems",
        bgColor: "bg-purple-600",
        textColor: "text-white",
        logos: [
            { name: "dp", image: telecomDp },
            { name: "kict", image: telecomKict },
            { name: "sapt", image: telecomSapt },
            { name: "TCS", image: tcs },
        ],
    },
    {
        name: "Information Technology",
        description: "Partnering with IT leaders to deliver cutting-edge cybersecurity solutions",
        bgColor: "bg-blue-500",
        textColor: "text-white",
        logos: [
            { name: "contour", image: contour },
            { name: "mentor", image: mentor },
            { name: "nielsen", image: nielsen },
            { name: "trg", image: trg },
        ],
    },
    {
        name: "Other",
        description: "Serving diverse industries with tailored IT security and infrastructure solutions",
        bgColor: "bg-lime-500",
        textColor: "text-gray-900",
        logos: [
            { name: "atlas", image: atlas },
            { name: "coca cola", image: coca },
            { name: "psel", image: psel },
            { name: "yamaha", image: yamaha },
        ],
    },
]

export default function CustomersPage() {
    return (
        <section className="flex flex-col gap-5 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title="Our Customers" content="We are proud to serve leading organizations across diverse industries, delivering cutting-edge cybersecurity solutions and exceptional IT services that drive success and innovation." />
            {industries.map((industry, index) => (
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
