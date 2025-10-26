import CustomersAndPartnersSection from "@/components/home/customersAndPartnersSection";

export default function Home() {
  return (
    <div className="flex flex-col justify-start gap-7 min-h-screen">
      {/* video hero section */}
      <h1 className="border">hero section</h1>
      <CustomersAndPartnersSection />
    </div>
  );
}
