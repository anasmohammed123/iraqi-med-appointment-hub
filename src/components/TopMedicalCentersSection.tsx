
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Building, ChevronRight } from 'lucide-react';
import { MedicalCard } from "@/components/ui/medical-card";

interface MedicalCenter {
  id: number;
  name: string;
  visits: number;
  rating: number;
  services: string[];
  imageUrl: string;
}

interface TopMedicalCentersSectionProps {
  centers: MedicalCenter[];
}

export const TopMedicalCentersSection = ({ centers }: TopMedicalCentersSectionProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">المراكز الطبية الأكثر زيارة</h2>
          <Link to="/centers" className="flex items-center text-medical-primary hover:underline">
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
            {centers.map((center) => (
              <CarouselItem key={center.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <MedicalCard
                  id={center.id}
                  title={center.name}
                  images={center.imageUrl}
                  badges={center.services}
                  rating={center.rating}
                  link={`/centers/${center.id}`}
                  type="center"
                  additionalInfo={
                    <div className="mt-3 flex items-center justify-between">
                      <Building size={16} className="text-medical-primary" />
                      <span className="text-sm text-medical-primary font-medium">
                        {center.visits} زيارة
                      </span>
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
