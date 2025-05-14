
import React from 'react';
import { Button } from "@/components/ui/button";
import { Apple, Phone } from 'lucide-react';

export const AppPromoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-right mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">تطبيقنا الآن متاح للتحميل</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg md:mr-auto md:ml-0 mx-auto">
              احجز مواعيدك، تواصل مع الأطباء، واحصل على استشارات طبية فورية من خلال تطبيقنا للهواتف الذكية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-gray-800 hover:bg-black text-white flex items-center gap-2">
                <Apple size={20} />
                <div className="text-right">
                  <div className="text-xs">تحميل من</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </Button>
              <Button className="bg-gray-800 hover:bg-black text-white flex items-center gap-2">
                <Phone size={20} />
                <div className="text-right">
                  <div className="text-xs">تحميل من</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-80">
              <img 
                src="https://placehold.co/500x600/1E88E5/FFFFFF?text=تطبيق+الموبايل" 
                alt="تطبيق الموبايل" 
                className="rounded-3xl shadow-2xl max-w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-medical-accent rounded-full opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-medical-primary rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
