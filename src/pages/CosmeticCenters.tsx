
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { useHomePageData } from "@/hooks/useHomePageData";
import { MedicalCard } from "@/components/ui/medical-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star, Search } from "lucide-react";

const CosmeticCenters = () => {
  const navigate = useNavigate();
  const { cosmeticCenters, isLoading, simulateLoading } = useHomePageData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [localLoading, setLocalLoading] = useState(false);

  // Create an array of all unique services
  const allServices = Array.from(
    new Set(cosmeticCenters.flatMap(center => center.services))
  );

  // Filter centers based on search, services, and rating
  const filteredCenters = cosmeticCenters.filter(center => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by selected services
    const matchesServices = selectedServices.length === 0 || 
      selectedServices.some(service => center.services.includes(service));
    
    // Filter by rating
    const matchesRating = ratingFilter === 0 || center.rating >= ratingFilter;
    
    return matchesSearch && matchesServices && matchesRating;
  });

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    
    // Simulate loading effect
    setTimeout(() => {
      setLocalLoading(false);
    }, 800);
  };

  // Hide global loader after initial load
  useEffect(() => {
    if (!isLoading) {
      // Ensure isLoading is properly reset after data load
      simulateLoading(() => {}, 0);
    }
  }, [isLoading, simulateLoading]);

  return (
    <PageLayout>
      {(isLoading || localLoading) && <PageLoader />}
      <div className="container mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">مراكز التجميل المتميزة</h1>
          <p className="text-gray-600">اكتشف أفضل مراكز التجميل واحصل على الإطلالة المثالية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">البحث والتصفية</h3>
                
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative mb-6">
                    <Input
                      placeholder="ابحث عن مراكز أو خدمات..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </form>
                
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-3">التقييم</h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">التقييم الأدنى: {ratingFilter}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < ratingFilter ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0]}
                      max={5}
                      step={0.5}
                      value={[ratingFilter]}
                      onValueChange={(value) => setRatingFilter(value[0])}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-3">الخدمات المتاحة</h4>
                  <div className="space-y-2 h-[300px] overflow-y-auto">
                    {allServices.map(service => (
                      <div key={service} className="flex items-center">
                        <Checkbox
                          id={`service-${service}`}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label htmlFor={`service-${service}`} className="ml-2 text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedServices([]);
                    setRatingFilter(0);
                  }}
                >
                  إعادة ضبط التصفية
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Centers list */}
          <div className="lg:col-span-3">
            {filteredCenters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCenters.map(center => (
                  <MedicalCard
                    key={center.id}
                    id={center.id}
                    title={center.name}
                    subtitle={center.address}
                    description={center.description.length > 80 ? center.description.substring(0, 80) + "..." : center.description}
                    images={center.images}
                    badges={center.services.slice(0, 3)}
                    rating={center.rating}
                    link={`/cosmetic-centers/${center.id}`}
                    type="center"
                    additionalInfo={
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{center.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">({center.reviewCount})</span>
                        </div>
                        <span className="text-medical-primary font-medium">{center.priceRange}</span>
                      </div>
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">لا توجد نتائج مطابقة</h3>
                <p className="text-gray-600">يرجى تعديل معايير البحث للعثور على مراكز التجميل</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CosmeticCenters;
