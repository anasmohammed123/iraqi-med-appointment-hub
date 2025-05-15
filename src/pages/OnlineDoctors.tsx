
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageLoader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/ui/lazy-image";
import { Input } from "@/components/ui/input";
import { Video, Phone, Search } from "lucide-react";
import { onlineDoctors, OnlineDoctor } from '@/data/onlineDoctorsData';

const OnlineDoctors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedConsultTypes, setSelectedConsultTypes] = useState<string[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<OnlineDoctor[]>(onlineDoctors);

  // Get unique specialties
  const specialties = Array.from(new Set(onlineDoctors.map(doctor => doctor.specialty)));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter doctors when filters change
  useEffect(() => {
    const filtered = onlineDoctors.filter(doctor => {
      // Filter by search query
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by specialty
      const matchesSpecialty = selectedSpecialties.length === 0 || 
                              selectedSpecialties.includes(doctor.specialty);
      
      // Filter by consultation type
      const matchesConsultType = selectedConsultTypes.length === 0 || 
                                selectedConsultTypes.some(type => doctor.availableFor.includes(type as "video" | "phone"));
      
      return matchesSearch && matchesSpecialty && matchesConsultType;
    });
    
    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialties, selectedConsultTypes]);

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const toggleConsultType = (type: string) => {
    setSelectedConsultTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen flex flex-col dir-rtl">
      {isLoading && <PageLoader />}
      
      <Navbar />
      
      <div className="bg-gradient-to-b from-medical-light to-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">استشارات طبية عن بُعد</h1>
            <p className="text-xl text-gray-600 mb-6">
              تحدث مع طبيب الآن عبر الفيديو أو الهاتف
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="ابحث عن طبيب أو تخصص..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">فلترة النتائج</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">التخصص</h4>
                    <div className="space-y-2">
                      {specialties.map((specialty) => (
                        <label key={specialty} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSpecialties.includes(specialty)}
                            onChange={() => toggleSpecialty(specialty)}
                            className="rounded text-medical-primary"
                          />
                          <span>{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">نوع الاستشارة</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedConsultTypes.includes("video")}
                          onChange={() => toggleConsultType("video")}
                          className="rounded text-medical-primary"
                        />
                        <span className="flex items-center gap-1">
                          <Video size={16} className="text-green-600" />
                          استشارة فيديو
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedConsultTypes.includes("phone")}
                          onChange={() => toggleConsultType("phone")}
                          className="rounded text-medical-primary"
                        />
                        <span className="flex items-center gap-1">
                          <Phone size={16} className="text-blue-600" />
                          استشارة هاتفية
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    onClick={() => {
                      setSelectedSpecialties([]);
                      setSelectedConsultTypes([]);
                      setSearchQuery("");
                    }}
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Doctors grid */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">
              {filteredDoctors.length} طبيب متاح للاستشارة
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="h-full hover:shadow-lg hover:border-medical-primary transition-all">
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
              ))}
              
              {filteredDoctors.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">لم يتم العثور على أطباء مطابقين للفلاتر المحددة</p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedSpecialties([]);
                      setSelectedConsultTypes([]);
                      setSearchQuery("");
                    }}
                  >
                    إعادة تعيين البحث
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OnlineDoctors;
