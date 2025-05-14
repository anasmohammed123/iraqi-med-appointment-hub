
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">أطباؤنا المتميزون</h2>
          <p className="text-gray-600">نخبة من الأطباء ذوي الخبرة والكفاءة</p>
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
                <Link to={`/doctors/${doctor.id}`}>
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
