
import React from 'react';
import { SearchHeroForm } from "@/components/SearchHeroForm";

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-medical-primary to-medical-dark text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            ابحث عن أفضل الأطباء واحجز موعدك بكل سهولة
          </h1>
          <p className="text-lg mb-8 text-white/90">
            منصة الطب العراقية تساعدك في العثور على الأطباء المناسبين وحجز المواعيد بكل يسر وسهولة.
          </p>
          
          <SearchHeroForm />
        </div>
      </div>
    </section>
  );
};
