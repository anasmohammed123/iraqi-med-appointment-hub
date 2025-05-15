
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MedicalCard } from "@/components/ui/medical-card";

interface Offer {
  id: number;
  title: string;
  description: string;
  endDate: string;
  images: string[];
}

interface OffersSectionProps {
  offers: Offer[];
}

export const OffersSection = ({ offers }: OffersSectionProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">عروض وخصومات حصرية</h2>
          <Link to="/promos" className="flex items-center text-medical-primary hover:underline">
            عرض المزيد
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <MedicalCard
              key={offer.id}
              id={offer.id}
              title={offer.title}
              description={offer.description}
              images={offer.images}
              link={`/promos/${offer.id}`}
              type="offer"
              additionalInfo={
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    ينتهي في: {offer.endDate}
                  </span>
                  <Link to={`/promos/${offer.id}`} className="text-medical-primary text-sm font-medium hover:underline">
                    تفاصيل أكثر
                  </Link>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
