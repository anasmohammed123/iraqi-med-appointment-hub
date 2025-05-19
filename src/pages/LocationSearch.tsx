
import React, { useState, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MedicalCard } from "@/components/ui/medical-card";
import { Video, Phone, Home, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// نوع لنتائج البحث
interface SearchResult {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  images: string[];
  rating?: number;
  link: string;
  type: "doctor" | "hospital" | "center";
  consultationTypes?: ("video" | "phone" | "home")[];
}

// نوع للأطباء من قاعدة البيانات
interface Doctor {
  id: string;
  name: string;
  name_ar: string;
  specialty?: {
    name: string;
    name_ar: string;
  };
  bio?: string;
  bio_ar?: string;
  image?: string;
  rating?: number;
  consultation_types?: {
    type: string;
  }[];
}

// نوع للتخصصات من قاعدة البيانات
interface Specialty {
  id: string;
  name: string;
  name_ar: string;
}

const LocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [distance, setDistance] = useState([50]); // Default value for the slider
  const [consultationTypes, setConsultationTypes] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  // استخدام React Query لجلب التخصصات
  const { isLoading: isLoadingSpecialties } = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("specialties")
        .select("*")
        .order("name_ar", { ascending: true });

      if (error) {
        console.error("Error fetching specialties:", error);
        return [];
      }

      setSpecialties(data || []);
      return data;
    }
  });

  // استخدام React Query لجلب نتائج البحث
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchResults", searchTerm, selectedSpecialty, consultationTypes],
    queryFn: async () => {
      // بناء استعلام قاعدة البيانات
      let query = supabase
        .from("doctors")
        .select(`
          id,
          name,
          name_ar,
          bio,
          bio_ar,
          image,
          rating,
          specialty_id,
          specialties (
            id,
            name,
            name_ar
          ),
          doctor_consultation_types (
            type
          )
        `);

      // إضافة فلتر للبحث بالنص
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,name_ar.ilike.%${searchTerm}%`);
      }

      // إضافة فلتر للتخصصات
      if (selectedSpecialty) {
        query = query.eq("specialty_id", selectedSpecialty);
      }

      // الحصول على النتائج
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching search results:", error);
        return [];
      }

      // تحويل النتائج إلى الشكل المطلوب للعرض
      const results: SearchResult[] = await Promise.all(
        (data || []).map(async (doctor: any) => {
          // الحصول على أنواع الاستشارات للطبيب
          const doctorConsultationTypes: ("video" | "phone" | "home")[] = 
            (doctor.doctor_consultation_types || [])
              .map((item: { type: string }) => item.type as "video" | "phone" | "home");

          // فلترة الأطباء حسب أنواع الاستشارة المطلوبة
          if (consultationTypes.length > 0) {
            // إذا لم يكن لدى الطبيب أي من أنواع الاستشارة المطلوبة، تخطيه
            const hasRequiredConsultationType = consultationTypes.some(type => 
              doctorConsultationTypes.includes(type as "video" | "phone" | "home")
            );
            
            if (!hasRequiredConsultationType) {
              return null;
            }
          }

          return {
            id: parseInt(doctor.id),
            title: doctor.name_ar,
            subtitle: doctor.specialties?.name_ar || "",
            description: doctor.bio_ar || "",
            images: [doctor.image || "https://placehold.co/300x300/1E88E5/FFFFFF?text=طبيب"],
            rating: doctor.rating || 0,
            link: `/doctors/${doctor.id}`,
            type: "doctor" as const,
            consultationTypes: doctorConsultationTypes,
          };
        })
      );

      // إزالة النتائج الفارغة (null) الناتجة عن الفلترة
      return results.filter(result => result !== null);
    },
    enabled: true,
  });

  const toggleConsultationType = (type: string) => {
    if (consultationTypes.includes(type)) {
      setConsultationTypes(consultationTypes.filter((t) => t !== type));
    } else {
      setConsultationTypes([...consultationTypes, type]);
    }
  };

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
              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع التخصصات</SelectItem>
                  {isLoadingSpecialties ? (
                    <SelectItem value="" disabled>جاري التحميل...</SelectItem>
                  ) : (
                    specialties.map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.id}>
                        {specialty.name_ar}
                      </SelectItem>
                    ))
                  )}
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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-medical-primary animate-spin" />
              <span className="mr-2">جاري تحميل النتائج...</span>
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((result) => (
                <MedicalCard key={result.id} {...result} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">لا توجد نتائج مطابقة للبحث. يرجى تغيير معايير البحث.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LocationSearch;
