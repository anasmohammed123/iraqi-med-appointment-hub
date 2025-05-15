
import React from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance?: number;
  time?: number;
}

interface MapProps {
  userLocation: {lat: number, lng: number} | null;
  doctors?: Doctor[];
}

export const Map = ({ userLocation, doctors }: MapProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          لتفعيل خرائط الموقع الجغرافي، يرجى إضافة مفتاح API للخرائط.
        </p>
        <p className="text-sm text-gray-500">
          في تطبيق حقيقي، ستظهر هنا خريطة تفاعلية تعرض موقعك والأطباء القريبين منك.
        </p>
      </div>
    </div>
  );
};
