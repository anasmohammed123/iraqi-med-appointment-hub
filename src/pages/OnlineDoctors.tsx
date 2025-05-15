
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/ui/lazy-image";
import { Video, Phone, Search } from "lucide-react";
import { onlineDoctorsData, OnlineDoctor } from '@/data/onlineDoctorsData';
import { PageLoader } from '@/components/ui/loader';

const OnlineDoctors = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [doctors] = useState<OnlineDoctor[]>(onlineDoctorsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedConsultType, setSelectedConsultType] = useState<string | null>(null);

  // Extract unique specialties
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    
    const matchesConsultType = !selectedConsultType || 
      (selectedConsultType === 'video' && doctor.availableFor.includes('video')) ||
      (selectedConsultType === 'phone' && doctor.availableFor.includes('phone'));
      
    return matchesSearch && matchesSpecialty && matchesConsultType;
  });

  const handleFilter = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <PageLoader />}
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">الأطباء المتاحون للاستشارة</h1>
          
          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">البحث</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border rounded-md pr-10 pl-3 py-2"
                    placeholder="ابحث باسم الطبيب أو التخصص"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">التخصص</label>
                <select 
                  className="w-full border rounded-md px-3 py-2"
                  value={selectedSpecialty || ''}
                  onChange={(e) => setSelectedSpecialty(e.target.value || null)}
                >
                  <option value="">جميع التخصصات</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">نوع الاستشارة</label>
                <select 
                  className="w-full border rounded-md px-3 py-2"
                  value={selectedConsultType || ''}
                  onChange={(e) => setSelectedConsultType(e.target.value || null)}
                >
                  <option value="">الكل</option>
                  <option value="video">استشارة فيديو</option>
                  <option value="phone">استشارة هاتفية</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 text-left">
              <Button onClick={handleFilter}>تطبيق الفلتر</Button>
            </div>
          </div>
          
          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <AspectRatio ratio={1 / 1} className="mb-4">
                    <LazyImage
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="rounded-full object-cover"
                    />
                  </AspectRatio>
                  <h3 className="font-bold text-lg mb-1 text-center">{doctor.name}</h3>
                  <div className="text-center">
                    <Badge className="mb-3 bg-medical-light text-medical-primary">{doctor.specialty}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 mb-3">
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
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-yellow-500">
                      <span>★</span>
                      <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <div className="text-medical-primary font-semibold">
                      {doctor.price} د.ع
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    حجز استشارة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredDoctors.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">لم يتم العثور على أطباء مطابقين لمعايير البحث</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OnlineDoctors;
