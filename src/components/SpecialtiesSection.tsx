
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Specialty {
  id: number;
  name: string;
  count: number;
  icon: string;
}

interface SpecialtiesSectionProps {
  specialties: Specialty[];
}

export const SpecialtiesSection = ({ specialties }: SpecialtiesSectionProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">اختر التخصص المناسب</h2>
          <p className="text-gray-600">اكتشف الأطباء المتخصصين في جميع المجالات الطبية</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {specialties.map((specialty) => (
            <Link 
              key={specialty.id} 
              to={`/doctors?specialty=${encodeURIComponent(specialty.name)}`}
              className="transition duration-300 hover:scale-105"
            >
              <Card className="h-full text-center hover:shadow-lg hover:border-medical-primary transition-all">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="text-3xl mb-2">{specialty.icon}</div>
                  <h3 className="font-medium text-gray-800 mb-1">{specialty.name}</h3>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                    {specialty.count} طبيب
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
