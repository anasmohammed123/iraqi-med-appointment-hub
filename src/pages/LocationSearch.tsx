import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MedicalCard } from "@/components/ui/medical-card";
import { Video, Phone, Home } from "lucide-react";

const LocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [distance, setDistance] = useState([50]); // Default value for the slider
  const [consultationTypes, setConsultationTypes] = useState<string[]>([]);

  const toggleConsultationType = (type: string) => {
    if (consultationTypes.includes(type)) {
      setConsultationTypes(consultationTypes.filter((t) => t !== type));
    } else {
      setConsultationTypes([...consultationTypes, type]);
    }
  };

  // Mock data for demonstration
  const searchResults = [
    {
      id: 1,
      title: "عيادة الدكتور أحمد",
      subtitle: "أخصائي طب العيون",
      description: "عيادة متخصصة في علاج أمراض العيون وجراحات تصحيح النظر.",
      images: ["https://placehold.co/300x200/1E88E5/FFFFFF?text=Doctor+A"],
      rating: 4.5,
      link: "/doctors/1",
      type: "doctor" as const,
      consultationTypes: ["video", "phone"],
    },
    {
      id: 2,
      title: "مستشفى الشفاء",
      subtitle: "مستشفى عام",
      description: "مستشفى يقدم خدمات طبية شاملة في مختلف التخصصات.",
      images: ["https://placehold.co/300x200/4CAF50/FFFFFF?text=Hospital+B"],
      rating: 4.2,
      link: "/hospitals/2",
      type: "hospital" as const,
      consultationTypes: ["home"],
    },
    {
      id: 3,
      title: "مركز تجميل النرجس",
      subtitle: "مركز تجميل متخصص",
      description: "مركز يقدم خدمات تجميلية وعلاجية متقدمة.",
      images: ["https://placehold.co/300x200/FF9800/FFFFFF?text=Cosmetic+Center+C"],
      rating: 4.8,
      link: "/cosmetic-centers/3",
      type: "center" as const,
      consultationTypes: ["video"],
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">البحث عن الأطباء والمراكز الطبية</h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Term Input */}
            <div>
              <Input
                type="text"
                placeholder="ابحث عن طبيب، مستشفى، أو مركز طبي..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Specialty Select */}
            <div>
              <Select onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع التخصصات</SelectItem>
                  <SelectItem value="cardiology">قلب</SelectItem>
                  <SelectItem value="dermatology">جلدية</SelectItem>
                  {/* Add more specialties as needed */}
                </SelectContent>
              </Select>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="distance">المسافة: {distance[0]} كم</Label>
              </div>
              <Slider
                id="distance"
                defaultValue={distance}
                max={100}
                step={10}
                onValueChange={setDistance}
              />
            </div>
          </div>

          {/* Consultation type filters */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">نوع الاستشارة</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={consultationTypes.includes("video") ? "default" : "outline"} 
                size="sm"
                className="flex gap-2"
                onClick={() => toggleConsultationType("video")}
              >
                <Video size={16} className="text-green-600" aria-label="استشارة فيديو" />
                فيديو
              </Button>
              <Button 
                variant={consultationTypes.includes("phone") ? "default" : "outline"} 
                size="sm"
                className="flex gap-2"
                onClick={() => toggleConsultationType("phone")}
              >
                <Phone size={16} className="text-blue-600" aria-label="استشارة هاتفية" />
                هاتف
              </Button>
              <Button 
                variant={consultationTypes.includes("home") ? "default" : "outline"} 
                size="sm"
                className="flex gap-2"
                onClick={() => toggleConsultationType("home")}
              >
                <Home size={16} className="text-red-600" aria-label="زيارة منزلية" />
                زيارة منزلية
              </Button>
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">نتائج البحث</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((result) => (
              <MedicalCard key={result.id} {...result} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LocationSearch;
