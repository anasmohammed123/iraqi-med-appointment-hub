
import React from "react";
import { Link } from "react-router-dom";
import { Pill } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Medication } from "@/data/medicationsData";

interface MedicationCardProps {
  medication: Medication;
}

export const MedicationCard = ({ medication }: MedicationCardProps) => {
  return (
    <Link to={`/pharmacy/medications/${medication.id}`} className="block">
      <Card className="h-full hover:shadow-lg transition-all border-medical-primary/20 hover:border-medical-primary">
        <CardContent className="p-0">
          <AspectRatio ratio={3/2}>
            <LazyImage 
              src={medication.imageUrl}
              alt={medication.nameAr}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </AspectRatio>
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{medication.nameAr}</h3>
              <span className="text-medical-primary font-bold">{medication.price} $</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{medication.descriptionAr}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={medication.availability ? "default" : "destructive"}>
                {medication.availability ? "متوفر" : "غير متوفر"}
              </Badge>
              <Badge variant="outline" className="bg-gray-100">
                {medication.dosage}
              </Badge>
            </div>
            
            {medication.requiresPrescription && (
              <div className="flex items-center gap-1 text-amber-600 text-sm">
                <Pill size={16} />
                <span>يتطلب وصفة طبية</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
