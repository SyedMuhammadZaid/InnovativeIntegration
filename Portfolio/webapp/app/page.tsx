import CustomersAndPartnersSection from "@/components/home/customersAndPartnersSection";
import HeroSection from "@/components/home/heroSection";

export default function Home() {
  return (
    <section className="flex flex-col justify-start min-h-screen">
      <HeroSection />
      <CustomersAndPartnersSection />
    </section>
  );
}
