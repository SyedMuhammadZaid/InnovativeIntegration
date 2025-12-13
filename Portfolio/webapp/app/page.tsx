import AboutUsSection from "@/components/home/aboutUsSection";
import BlogSection from "@/components/home/blogsSection";
import CustomersAndPartnersSection from "@/components/home/customersAndPartnersSection";
import FaqSection from "@/components/home/faqSection";
import HeroSection from "@/components/home/heroSection";
import ProjectsSection from "@/components/home/projectsSection";
import ServicesSection from "@/components/home/servicesSection";
import TestimonialsSection from "@/components/home/testimonialsSection";
import WhyChooseUsSection from "@/components/home/whyChooseUsSection";
import CtaSection from "@/components/shared/cta-banner/cta_Banner";

export default function Home() {
  return (
    <section className="flex flex-col justify-start min-h-screen">
      <HeroSection />
      <CustomersAndPartnersSection />
      <AboutUsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FaqSection />
      <section className="bg-white py-20 px-4 md:px-8 lg:px-16">
        <CtaSection title="Proactive Protection, Unwavering Support. Your Digital Security, Solved." />
      </section>
      <BlogSection />
    </section>
  );
}
