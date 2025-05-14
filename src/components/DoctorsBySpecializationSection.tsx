
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Users, ChevronRight } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface DoctorsBySpecializationSectionProps {
  doctors: Doctor[];
  specialization: string;
}

export const DoctorsBySpecializationSection = ({ doctors, specialization }: DoctorsBySpecializationSectionProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Users size={24} className="text-medical-primary" />
            <h2 className="text-2xl font-bold text-gray-800">أطباء {specialization} الأكثر زيارة</h2>
          </div>
          <Link 
            to={`/doctors?specialty=${encodeURIComponent(specialization)}`}
            className="flex items-center text-medical-primary hover:underline"
          >
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
                <Link to={`/doctors/${doctor.id}`} className="block">
                  <Card className="h-full hover:shadow-lg hover:border-medical-primary transition-all">
                    <CardContent className="p-4">
                      <AspectRatio ratio={1 / 1} className="mb-4">
                        <img
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          className="rounded-full object-cover"
                        />
                      </AspectRatio>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{doctor.name}</h3>
                      <Badge className="mb-2 bg-medical-light text-medical-primary">{doctor.specialty}</Badge>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center text-yellow-500">
                          <Star fill="currentColor" size={14} />
                          <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                        </div>
                        <span className="text-gray-500 text-xs mr-1">({doctor.reviews} تقييم)</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
