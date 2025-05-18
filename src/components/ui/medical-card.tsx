
import React from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/ui/lazy-image";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Video, Phone, Home } from "lucide-react";
import { Doctor } from "@/data/mockData";

interface MedicalCardProps {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  images: string[] | string;
  badges?: string[];
  rating?: number;
  link: string;
  type: "hospital" | "center" | "offer" | "doctor";
  additionalInfo?: React.ReactNode;
  className?: string;
  consultationTypes?: ("video" | "phone" | "home")[];
}

export const MedicalCard = ({
  id,
  title,
  subtitle,
  description,
  images,
  badges,
  rating,
  link,
  type,
  additionalInfo,
  className,
  consultationTypes,
}: MedicalCardProps) => {
  const isMultipleImages = Array.isArray(images) && images.length > 1;

  const renderConsultationTypes = () => {
    if (!consultationTypes || consultationTypes.length === 0) return null;
    
    return (
      <div className="flex items-center justify-center gap-3 my-2">
        {consultationTypes.includes("video") && (
          <div className="flex items-center text-green-600" title="استشارة فيديو">
            <Video size={18} />
          </div>
        )}
        {consultationTypes.includes("phone") && (
          <div className="flex items-center text-blue-600" title="استشارة هاتفية">
            <Phone size={18} />
          </div>
        )}
        {consultationTypes.includes("home") && (
          <div className="flex items-center text-red-600" title="زيارة منزلية">
            <Home size={18} />
          </div>
        )}
      </div>
    );
  };

  return (
    <Link to={link} className="block">
      <Card className={cn("h-full hover:shadow-lg hover:border-medical-primary transition-all", className)}>
        <CardContent className="p-0">
          {/* Image section with carousel for multiple images */}
          {isMultipleImages ? (
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {(images as string[]).map((image, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <AspectRatio ratio={type === "doctor" ? 1 / 1 : 3 / 2}>
                      <LazyImage
                        src={image}
                        alt={`${title} - صورة ${index + 1}`}
                        className={cn(
                          "w-full h-full object-cover",
                          type === "doctor" ? "rounded-full" : "rounded-t-lg"
                        )}
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8" />
              <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" />
            </Carousel>
          ) : (
            <AspectRatio ratio={type === "doctor" ? 1 / 1 : 3 / 2}>
              <LazyImage
                src={Array.isArray(images) ? images[0] : images}
                alt={title}
                className={cn(
                  "w-full h-full object-cover",
                  type === "doctor" ? "rounded-full" : "rounded-t-lg"
                )}
              />
            </AspectRatio>
          )}
          
          {/* Content section */}
          <div className="p-4">
            {rating !== undefined && (
              <div className="flex items-center text-yellow-500 mb-2">
                <span>★</span>
                <span className="ml-1 font-medium">{rating}</span>
              </div>
            )}
            
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            
            {subtitle && <p className="text-gray-600 text-sm mb-2">{subtitle}</p>}
            
            {description && <p className="text-gray-600 text-sm mb-3">{description}</p>}
            
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-1 my-2">
                {badges.map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="bg-gray-100">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Render consultation type indicators */}
            {renderConsultationTypes()}
            
            {additionalInfo && <div className="mt-2">{additionalInfo}</div>}
            
            {type === "doctor" && (
              <div className="mt-3 text-center">
                <span className="text-sm px-4 py-2 bg-medical-primary text-white rounded-md inline-block">
                  عرض الصفحة
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
