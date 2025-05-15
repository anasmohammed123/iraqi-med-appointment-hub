
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/lazy-image";
import { Video, Phone, ChevronRight } from 'lucide-react';
import { OnlineDoctor } from '@/data/onlineDoctorsData';

interface OnlineDoctorsSectionProps {
  doctors: OnlineDoctor[];
}

export const OnlineDoctorsSection = ({ doctors }: OnlineDoctorsSectionProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">أطباء متاحون للاستشارة</h2>
          <Link to="/online-doctors" className="flex items-center text-medical-primary hover:underline">
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
                <Card className="h-full hover:shadow-lg hover:border-medical-primary transition-all">
                  <CardContent className="p-4">
                    <AspectRatio ratio={1 / 1} className="mb-4">
                      <LazyImage
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="rounded-full object-cover"
                      />
                    </AspectRatio>
                    <h3 className="font-semibold text-gray-800 text-center text-lg mb-1">{doctor.name}</h3>
                    <div className="text-center">
                      <Badge className="mb-2 bg-medical-light text-medical-primary">{doctor.specialty}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 mt-3 mb-3">
                      {doctor.availableFor.includes("video") && (
                        <div className="flex items-center text-green-600" title="استشارة فيديو">
                          <Video size={18} />
                        </div>
                      )}
                      {doctor.availableFor.includes("phone") && (
                        <div className="flex items-center text-blue-600" title="استشارة هاتفية">
                          <Phone size={18} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 mb-3">
                      <div className="flex items-center text-yellow-500">
                        <span>★</span>
                        <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                      </div>
                      <div className="text-medical-primary font-semibold">
                        {doctor.price} د.ع
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      حجز موعد
                    </Button>
                  </CardContent>
                </Card>
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
