
import React, { useState, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { MedicationCard } from "@/components/MedicationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { medications, medicationCategories, Medication } from "@/data/medicationsData";
import { Link } from "react-router-dom";
import { Pill } from "lucide-react";

const Pharmacy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>(medications);
  const [isLoading, setIsLoading] = useState(true);

  // Filter medications based on search query and category
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      let filtered = [...medications];
      
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter(med => 
          med.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedCategory) {
        filtered = filtered.filter(med => med.category === selectedCategory);
      }
      
      setFilteredMedications(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <PageLayout
      isLoading={isLoading}
    >
      <div className="py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">الصيدلية الإلكترونية</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اطلب الأدوية والمستلزمات الطبية وسنقوم بتوصيلها إلى منزلك. استشر صيدلي مؤهل وتسوق بأمان.
          </p>
        </div>

        <div className="bg-medical-primary/5 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <Input
                placeholder="ابحث عن دواء..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={selectedCategory || ""}
              onValueChange={(value) => setSelectedCategory(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="تصفية حسب الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الفئات</SelectItem>
                {medicationCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              إعادة ضبط الفلتر
            </Button>
            <span className="text-sm text-gray-600">
              {filteredMedications.length} منتج
            </span>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">جميع المنتجات</TabsTrigger>
            <TabsTrigger value="prescription">تتطلب وصفة طبية</TabsTrigger>
            <TabsTrigger value="otc">بدون وصفة طبية</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedications.map((medication) => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="prescription">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedications
                .filter((med) => med.requiresPrescription)
                .map((medication) => (
                  <MedicationCard key={medication.id} medication={medication} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="otc">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedications
                .filter((med) => !med.requiresPrescription)
                .map((medication) => (
                  <MedicationCard key={medication.id} medication={medication} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">هل لديك وصفة طبية؟</h2>
            <p className="text-gray-600">أرسل صورة الوصفة الطبية وسنتواصل معك للتأكيد</p>
          </div>

          <div className="bg-medical-primary/10 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center justify-center">
              <Pill size={48} className="text-medical-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">أرسل وصفتك الطبية</h3>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                يمكنك إرسال صورة من الوصفة الطبية وسنقوم بتجهيز الأدوية وتوصيلها لك
              </p>
              <Link to="/pharmacy/prescription">
                <Button className="bg-medical-primary hover:bg-medical-dark">
                  إرسال وصفة طبية
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pharmacy;
