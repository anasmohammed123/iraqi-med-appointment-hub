
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">عروض وخصومات حصرية</h2>
          <p className="text-gray-600">استفد من أحدث العروض والخصومات على الخدمات الطبية المتميزة</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-lg hover:border-medical-primary transition-all">
              <CardContent className="p-0">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {offer.images.map((image, index) => (
                      <CarouselItem key={index} className="basis-full">
                        <div className="relative">
                          <img 
                            src={image} 
                            alt={`${offer.title} - صورة ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {offer.images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8" />
                      <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" />
                    </>
                  )}
                </Carousel>
                
                <div className="p-4">
                  <Link to={`/promos/${offer.id}`}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-medical-primary transition-colors">{offer.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      ينتهي في: {offer.endDate}
                    </span>
                    <Link to={`/promos/${offer.id}`} className="text-medical-primary text-sm font-medium hover:underline">
                      تفاصيل أكثر
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
