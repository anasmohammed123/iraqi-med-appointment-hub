
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Briefcase, Building, Compass, Home, Video, Phone } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const SearchHeroForm = () => {
  const navigate = useNavigate();
  const [province, setProvince] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [insurance, setInsurance] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [consultationTypes, setConsultationTypes] = useState<string[]>([]);

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
    
    // Add consultation types to search params
    if (consultationTypes.length > 0) {
      consultationTypes.forEach(type => {
        searchParams.append('consultType', type);
      });
    }
    
    // توجيه المستخدم إلى صفحة الأطباء مع معطيات البحث
    navigate(`/doctors?${searchParams.toString()}`);
  };

  const toggleConsultationType = (type: string) => {
    setConsultationTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
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
          
          <div className="space-y-2 lg:col-span-3">
            <Label className="text-gray-800">نوع الاستشارة</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="video-consult" 
                  checked={consultationTypes.includes("video")}
                  onCheckedChange={() => toggleConsultationType("video")}
                />
                <label
                  htmlFor="video-consult"
                  className="flex items-center gap-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Video className="h-4 w-4 text-green-600" />
                  استشارة فيديو
                </label>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="phone-consult" 
                  checked={consultationTypes.includes("phone")}
                  onCheckedChange={() => toggleConsultationType("phone")}
                />
                <label
                  htmlFor="phone-consult"
                  className="flex items-center gap-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Phone className="h-4 w-4 text-blue-600" />
                  استشارة هاتفية
                </label>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="home-visit" 
                  checked={consultationTypes.includes("home")}
                  onCheckedChange={() => toggleConsultationType("home")}
                />
                <label
                  htmlFor="home-visit"
                  className="flex items-center gap-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Home className="h-4 w-4 text-red-600" />
                  زيارة منزلية
                </label>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
            <Button type="submit" className="w-full md:w-auto bg-medical-primary hover:bg-medical-dark flex items-center justify-center gap-2">
              <Search size={18} />
              <span>بحث</span>
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/location-search" className="w-full md:w-auto">
                    <Button type="button" variant="outline" className="w-full h-full flex items-center justify-center gap-2 border-medical-primary text-medical-primary hover:bg-medical-light">
                      <Compass size={18} />
                      <span>بحث حسب الموقع</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>البحث عن الأطباء القريبين من موقعك الحالي</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/home-services" className="w-full md:w-auto">
                    <Button type="button" variant="outline" className="w-full h-full flex items-center justify-center gap-2 border-medical-primary text-medical-primary hover:bg-medical-light">
                      <Home size={18} />
                      <span>الخدمات المنزلية</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>استكشاف خدمات الرعاية الصحية المنزلية</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
