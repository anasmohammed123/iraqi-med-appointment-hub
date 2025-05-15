
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, ChevronRight } from 'lucide-react';
import { MedicalCard } from "@/components/ui/medical-card";
import { CosmeticCenter } from '@/data/cosmeticCentersData';

interface CosmeticCentersSectionProps {
  centers: CosmeticCenter[];
}

export const CosmeticCentersSection = ({ centers }: CosmeticCentersSectionProps) => {
  // Sort centers by rating for display
  const sortedCenters = [...centers].sort((a, b) => b.rating - a.rating);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">أفضل مراكز التجميل</h2>
          <Link to="/cosmetic-centers" className="flex items-center text-medical-primary hover:underline">
            عرض المزيد
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {sortedCenters.slice(0, 10).map((center) => (
              <CarouselItem key={center.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <MedicalCard
                  id={center.id}
                  title={center.name}
                  subtitle={center.address}
                  images={center.images[0]}
                  badges={center.services.slice(0, 3)}
                  rating={center.rating}
                  link={`/cosmetic-centers/${center.id}`}
                  type="center"
                  additionalInfo={
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{center.rating}</span>
                        <span className="ml-1 text-xs text-gray-500">({center.reviewCount})</span>
                      </div>
                      <span className="text-medical-primary font-medium">{center.priceRange}</span>
                    </div>
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative -right-4 top-0 translate-y-0 h-8 w-8" />
            <CarouselNext className="relative -left-4 top-0 translate-y-0 h-8 w-8" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
