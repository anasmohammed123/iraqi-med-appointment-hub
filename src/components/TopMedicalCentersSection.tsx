
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Building, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
                <Link to={`/centers/${center.id}`} className="block">
                  <Card className="h-full hover:shadow-lg hover:border-medical-primary transition-all">
                    <div className="relative h-48">
                      <img 
                        src={center.imageUrl} 
                        alt={center.name}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-white text-medical-primary">
                        {center.visits} زيارة
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 text-yellow-500 mb-2">
                        <Star size={14} fill="currentColor" />
                        <span className="font-medium">{center.rating}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">{center.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {center.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <Building size={16} className="text-medical-primary" />
                        <span className="text-sm text-medical-primary font-medium">عرض التفاصيل</span>
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
