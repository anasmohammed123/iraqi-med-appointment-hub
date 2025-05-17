
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Briefcase, Building, Compass } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

export const SearchHeroForm = () => {
  const navigate = useNavigate();
  const [province, setProvince] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [insurance, setInsurance] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const provinces = ["بغداد", "البصرة", "أربيل", "الموصل", "النجف", "كربلاء", "صلاح الدين"];
  const areas = ["الكرخ", "الرصافة", "المنصور", "الكرادة", "الأعظمية", "زيونة", "الكاظمية"];
  const specialties = ["قلب", "عيون", "أطفال", "جلدية", "عظام", "نسائية", "أسنان", "أذن وأنف وحنجرة", "تغذية"];
  const insuranceCompanies = ["شركة التأمين الوطنية", "شركة الخليج للتأمين", "شركة الرافدين للتأمين", "شركة بغداد للتأمين", "شركة الأمين للتأمين"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // بناء المعطيات للبحث
    const searchParams = new URLSearchParams();
    if (province) searchParams.append('province', province);
    if (location) searchParams.append('location', location);
    if (specialty) searchParams.append('specialty', specialty);
    if (insurance) searchParams.append('insurance', insurance);
    if (doctorName) searchParams.append('name', doctorName);
    
    // توجيه المستخدم إلى صفحة الأطباء مع معطيات البحث
    navigate(`/doctors?${searchParams.toString()}`);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="province" className="text-gray-800 flex items-center gap-1">
              <MapPin size={16} className="opacity-70" />
              <span>المحافظة</span>
            </Label>
            <select 
              id="province" 
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-2 border rounded-md bg-white text-gray-800"
            >
              <option value="">اختر المحافظة</option>
              {provinces.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-800 flex items-center gap-1">
              <MapPin size={16} className="opacity-70" />
              <span>المنطقة</span>
            </Label>
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
            <Label htmlFor="specialty" className="text-gray-800 flex items-center gap-1">
              <Briefcase size={16} className="opacity-70" />
              <span>الاختصاص</span>
            </Label>
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
            <Label htmlFor="insurance" className="text-gray-800 flex items-center gap-1">
              <Building size={16} className="opacity-70" />
              <span>شركة التأمين</span>
            </Label>
            <select 
              id="insurance" 
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="w-full p-2 border rounded-md bg-white text-gray-800"
            >
              <option value="">اختر شركة التأمين</option>
              {insuranceCompanies.map((company) => (
                <option key={company} value={company}>{company}</option>
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
          
          <div className="flex items-end gap-2">
            <Button type="submit" className="flex-1 bg-medical-primary hover:bg-medical-dark flex items-center justify-center gap-2">
              <Search size={18} />
              <span>بحث</span>
            </Button>
            
            <Link to="/location-search">
              <Button type="button" variant="outline" className="h-full flex items-center justify-center gap-2 border-medical-primary text-medical-primary hover:bg-medical-light">
                <Compass size={18} />
                <span className="hidden sm:inline">بحث حسب الموقع</span>
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
