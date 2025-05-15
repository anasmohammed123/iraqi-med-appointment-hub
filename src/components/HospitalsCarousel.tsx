
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { MedicalCard } from "@/components/ui/medical-card";

interface Hospital {
  id: number;
  name: string;
  doctors: number;
  address: string;
  hours: string;
  imageUrl: string;
}

interface HospitalsCarouselProps {
  hospitals: Hospital[];
}

export const HospitalsCarousel = ({ hospitals }: HospitalsCarouselProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">المشافي المتميزة</h2>
          <Link to="/hospitals" className="flex items-center text-medical-primary hover:underline">
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
            {hospitals.map((hospital) => (
              <CarouselItem key={hospital.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <MedicalCard
                  id={hospital.id}
                  title={hospital.name}
                  subtitle={hospital.address}
                  images={hospital.imageUrl}
                  link={`/hospitals/${hospital.id}`}
                  type="hospital"
                  additionalInfo={
                    <>
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <Clock size={14} className="ml-1" />
                        <span>{hospital.hours}</span>
                      </div>
                      <div className="text-medical-primary text-sm font-medium mt-2">
                        {hospital.doctors} طبيب متاح
                      </div>
                    </>
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
