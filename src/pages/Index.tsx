
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SpecialtiesSection } from "@/components/SpecialtiesSection";
import { HospitalsCarousel } from "@/components/HospitalsCarousel";
import { FeaturedDoctors } from "@/components/FeaturedDoctors";
import { OffersSection } from "@/components/OffersSection";
import { AppPromoSection } from "@/components/AppPromoSection";
import { FAQSection } from "@/components/FAQSection";
import { PharmacyRequestSection } from "@/components/PharmacyRequestSection";
import { TopMedicalCentersSection } from "@/components/TopMedicalCentersSection";
import { DoctorsBySpecializationSection } from "@/components/DoctorsBySpecializationSection";
import { PatientActionsSection } from "@/components/PatientActionsSection";
import { CTASection } from "@/components/CTASection";
import { OnlineDoctorsSection } from "@/components/OnlineDoctorsSection";
import { CosmeticCentersSection } from "@/components/CosmeticCentersSection";
import { PageLoader } from "@/components/ui/loader";
import { useHomePageData } from "@/hooks/useHomePageData";

const Index = () => {
  // Use our custom hook to get all the data
  const {
    topSpecialties,
    featuredDoctors,
    hospitals,
    promos,
    faqs,
    medicalCenters,
    cardiacDoctors,
    onlineDoctors,
    cosmeticCenters,
    isLoading,
    simulateLoading
  } = useHomePageData();

  // Simulate initial page loading
  useEffect(() => {
    simulateLoading(() => {}, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col dir-rtl">
      {isLoading && <PageLoader />}
      
      <Navbar />
      
      {/* Hero Section with Search Form */}
      <HeroSection />
      
      {/* Specialties Section */}
      <SpecialtiesSection specialties={topSpecialties} />
      
      {/* Hospitals Section */}
      <HospitalsCarousel hospitals={hospitals} />
      
      {/* Featured Doctors Section */}
      <FeaturedDoctors doctors={featuredDoctors} />
      
      {/* Online Doctors Section */}
      <OnlineDoctorsSection doctors={onlineDoctors} />
      
      {/* Cosmetic Centers Section - New */}
      <CosmeticCentersSection centers={cosmeticCenters} />
      
      {/* Top Medical Centers Section */}
      <TopMedicalCentersSection centers={medicalCenters} />
      
      {/* Doctors By Specialization Section */}
      <DoctorsBySpecializationSection doctors={cardiacDoctors} specialization="القلب" />
      
      {/* Patient Actions Section */}
      <PatientActionsSection />
      
      {/* Promos Section */}
      <OffersSection offers={promos} />
      
      {/* Pharmacy Request Section */}
      <PharmacyRequestSection />
      
      {/* App Promo Section */}
      <AppPromoSection />
      
      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
