
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Search } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export const SearchHeroForm = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const areas = ["بغداد - الكرخ", "بغداد - الرصافة", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء"];
  const specialties = ["قلب", "عيون", "أطفال", "جلدية", "عظام", "نسائية", "أسنان", "أذن وأنف وحنجرة", "تغذية"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // بناء المعطيات للبحث
    const searchParams = new URLSearchParams();
    if (location) searchParams.append('location', location);
    if (specialty) searchParams.append('specialty', specialty);
    if (doctorName) searchParams.append('name', doctorName);
    
    // توجيه المستخدم إلى صفحة الأطباء مع معطيات البحث
    navigate(`/doctors?${searchParams.toString()}`);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-800">المنطقة</Label>
            <select 
              id="location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-md bg-white text-gray-800"
            >
              <option value="">اختر المنطقة</option>
              {areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty" className="text-gray-800">الاختصاص</Label>
            <select 
              id="specialty" 
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full p-2 border rounded-md bg-white text-gray-800"
            >
              <option value="">اختر الاختصاص</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="doctorName" className="text-gray-800">اسم الطبيب (اختياري)</Label>
            <Input 
              id="doctorName" 
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="اكتب اسم الطبيب هنا"
              className="bg-white text-gray-800"
            />
          </div>
          
          <div className="flex items-end">
            <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark flex items-center justify-center gap-2">
              <Search size={18} />
              <span>بحث</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
