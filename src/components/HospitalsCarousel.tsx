
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Clock } from 'lucide-react';

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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">المشافي المتميزة</h2>
          <p className="text-gray-600">اكتشف أفضل المشافي والمراكز الطبية المتميزة</p>
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
                <Link to={`/hospitals/${hospital.id}`} className="block">
                  <Card className="h-full hover:shadow-lg hover:border-medical-primary transition-all">
                    <AspectRatio ratio={4 / 3}>
                      <img 
                        src={hospital.imageUrl} 
                        alt={hospital.name}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </AspectRatio>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">{hospital.name}</h3>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <MapPin size={14} className="ml-1" />
                        <span>{hospital.address}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <Clock size={14} className="ml-1" />
                        <span>{hospital.hours}</span>
                      </div>
                      
                      <div className="text-medical-primary text-sm font-medium mt-2">
                        {hospital.doctors} طبيب متاح
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
