
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, ChevronRight } from 'lucide-react';
import { MedicalCard } from "@/components/ui/medical-card";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface FeaturedDoctorsProps {
  doctors: Doctor[];
}

export const FeaturedDoctors = ({ doctors }: FeaturedDoctorsProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">أطباؤنا المتميزون</h2>
          <Link to="/doctors" className="flex items-center text-medical-primary hover:underline">
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
            {doctors.map((doctor) => (
              <CarouselItem key={doctor.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                <MedicalCard
                  id={doctor.id}
                  title={doctor.name}
                  subtitle={doctor.specialty}
                  images={doctor.imageUrl}
                  rating={doctor.rating}
                  badges={[doctor.specialty]}
                  link={`/doctors/${doctor.id}`}
                  type="doctor"
                  additionalInfo={
                    <div className="text-gray-500 text-xs text-center">
                      ({doctor.reviews} تقييم)
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
