
import React, { useState, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { useHomePageData } from "@/hooks/useHomePageData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map } from "@/components/Map";
import { toast } from "@/components/ui/use-toast";
import { Compass, MapPin, Filter, Video, Phone, Home } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { specialties } from "@/data/mockData";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance?: number;
  time?: number;
  consultationTypes?: ("video" | "phone" | "home")[];
}

const LocationSearch = () => {
  const { isLoading, simulateLoading } = useHomePageData();
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [nearbyDoctors, setNearbyDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedConsultTypes, setSelectedConsultTypes] = useState<string[]>([]);
  
  // Mock data for nearby doctors
  const mockDoctors: Doctor[] = [
    {
      id: 1,
      name: "د. أحمد الحسيني",
      specialty: "طب القلب",
      location: {
        lat: 33.315241,
        lng: 44.376904,
        address: "شارع فلسطين، بغداد"
      },
      consultationTypes: ["video", "phone"]
    },
    {
      id: 2,
      name: "د. سارة المالكي",
      specialty: "طب الأطفال",
      location: {
        lat: 33.323461,
        lng: 44.394198,
        address: "الكرادة، بغداد"
      },
      consultationTypes: ["video", "phone", "home"]
    },
    {
      id: 3,
      name: "د. محمد العبيدي",
      specialty: "جراحة العظام",
      location: {
        lat: 33.309565,
        lng: 44.382509,
        address: "المنصور، بغداد"
      },
      consultationTypes: ["home"]
    },
    {
      id: 4,
      name: "د. فاطمة الياسري",
      specialty: "طب العيون",
      location: {
        lat: 33.321090,
        lng: 44.375976,
        address: "الجادرية، بغداد"
      },
      consultationTypes: ["video"]
    },
    {
      id: 5,
      name: "د. علي الموسوي",
      specialty: "طب الأسنان",
      location: {
        lat: 33.314026,
        lng: 44.363756,
        address: "الحارثية، بغداد"
      },
      consultationTypes: ["phone"]
    }
  ];

  useEffect(() => {
    if (nearbyDoctors.length > 0) {
      let filtered = [...nearbyDoctors];
      
      // Filter by specialty
      if (selectedSpecialty) {
        filtered = filtered.filter(doctor => 
          doctor.specialty === selectedSpecialty || 
          // Match English specialty names to Arabic ones for demo purpose
          specialties.some(s => s.nameAr === selectedSpecialty && s.name === doctor.specialty)
        );
      }
      
      // Filter by consultation types
      if (selectedConsultTypes.length > 0) {
        filtered = filtered.filter(doctor => 
          doctor.consultationTypes && selectedConsultTypes.some(type => 
            doctor.consultationTypes?.includes(type as "video" | "phone" | "home")
          )
        );
      }
      
      setFilteredDoctors(filtered);
    }
  }, [selectedSpecialty, nearbyDoctors, selectedConsultTypes]);

  const getUserLocation = () => {
    setLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          findNearbyDoctors(userPos);
          setLoadingLocation(false);
          
          toast({
            title: "تم تحديد موقعك بنجاح",
            description: "يتم البحث عن الأطباء القريبين منك",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingLocation(false);
          
          toast({
            title: "تعذر تحديد موقعك",
            description: "يرجى السماح للمتصفح بالوصول إلى موقعك الجغرافي",
            variant: "destructive"
          });
        }
      );
    } else {
      setLoadingLocation(false);
      toast({
        title: "المتصفح لا يدعم تحديد الموقع",
        description: "يرجى استخدام متصفح حديث",
        variant: "destructive"
      });
    }
  };

  const findNearbyDoctors = (location: {lat: number, lng: number}) => {
    simulateLoading(() => {
      // In a real app, you would send the coordinates to a backend to find nearby doctors
      // Here we're just adding random distances and times to our mock data
      const doctorsWithDistance = mockDoctors.map(doctor => {
        // Calculate mock distance (would be done with real geo calculations in production)
        const distance = calculateMockDistance(location, doctor.location);
        const time = Math.round(distance * 3); // Rough estimate: 3 minutes per km
        
        return {
          ...doctor,
          distance: distance,
          time: time
        };
      });
      
      // Sort by distance
      doctorsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      
      setNearbyDoctors(doctorsWithDistance);
      setFilteredDoctors(doctorsWithDistance);
    });
  };

  const calculateMockDistance = (point1: {lat: number, lng: number}, point2: {lat: number, lng: number}) => {
    // This is a simplified mock calculation
    // In a real app, you would use the Haversine formula or a mapping service API
    const latDiff = Math.abs(point1.lat - point2.lat);
    const lngDiff = Math.abs(point1.lng - point2.lng);
    
    // Convert to rough kilometers (this is just for demonstration)
    return Math.round((latDiff + lngDiff) * 100) / 10;
  };

  const toggleConsultType = (type: string) => {
    setSelectedConsultTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">البحث عن أطباء قريبين منك</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اسمح لنا بالوصول إلى موقعك الجغرافي لنساعدك في العثور على أقرب الأطباء إليك
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <Button 
              onClick={getUserLocation}
              className="bg-medical-primary hover:bg-medical-dark w-full md:w-auto"
              disabled={loadingLocation}
            >
              {loadingLocation ? (
                <span className="flex items-center">جاري تحديد الموقع...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <Compass size={18} />
                  حدد موقعي الحالي
                </span>
              )}
            </Button>
            
            {userLocation && (
              <div className="w-full md:w-auto mt-2 md:mt-0 space-y-2">
                <div className="flex gap-2 flex-wrap items-center justify-center">
                  <div>
                    <Label htmlFor="specialty-filter" className="sr-only">تصفية حسب التخصص</Label>
                    <Select
                      value={selectedSpecialty}
                      onValueChange={setSelectedSpecialty}
                    >
                      <SelectTrigger id="specialty-filter" className="w-[200px]">
                        <div className="flex items-center gap-2">
                          <Filter size={16} />
                          <SelectValue placeholder="تصفية حسب التخصص" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">جميع التخصصات</SelectItem>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.id} value={specialty.nameAr}>
                            {specialty.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-md border">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox 
                        id="video" 
                        checked={selectedConsultTypes.includes("video")} 
                        onCheckedChange={() => toggleConsultType("video")} 
                      />
                      <Label htmlFor="video" className="flex items-center gap-1 cursor-pointer">
                        <Video size={16} className="text-green-600" />
                        <span>فيديو</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox 
                        id="phone" 
                        checked={selectedConsultTypes.includes("phone")} 
                        onCheckedChange={() => toggleConsultType("phone")} 
                      />
                      <Label htmlFor="phone" className="flex items-center gap-1 cursor-pointer">
                        <Phone size={16} className="text-blue-600" />
                        <span>اتصال</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox 
                        id="home" 
                        checked={selectedConsultTypes.includes("home")} 
                        onCheckedChange={() => toggleConsultType("home")} 
                      />
                      <Label htmlFor="home" className="flex items-center gap-1 cursor-pointer">
                        <Home size={16} className="text-red-600" />
                        <span>زيارة منزلية</span>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Map userLocation={userLocation} doctors={filteredDoctors} />
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={20} className="text-medical-primary" />
                  الأطباء القريبون منك
                  {selectedSpecialty && (
                    <span className="text-sm font-normal bg-medical-light text-medical-primary px-2 py-0.5 rounded-full">
                      {selectedSpecialty}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="h-[400px] overflow-y-auto">
                {filteredDoctors.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDoctors.map((doctor) => (
                      <Card key={doctor.id} className="border border-gray-200 hover:border-medical-primary transition-colors">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPin size={14} />
                              <span>{doctor.location.address}</span>
                            </div>
                            {doctor.distance !== undefined && (
                              <div className="flex justify-between text-medical-primary">
                                <span>المسافة: {doctor.distance} كم</span>
                                <span>الوقت: {doctor.time} دقيقة</span>
                              </div>
                            )}
                          </div>

                          {/* Show consultation type icons */}
                          {doctor.consultationTypes && doctor.consultationTypes.length > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              {doctor.consultationTypes.includes("video") && (
                                <Video size={16} className="text-green-600" title="استشارة فيديو" />
                              )}
                              {doctor.consultationTypes.includes("phone") && (
                                <Phone size={16} className="text-blue-600" title="استشارة هاتفية" />
                              )}
                              {doctor.consultationTypes.includes("home") && (
                                <Home size={16} className="text-red-600" title="زيارة منزلية" />
                              )}
                            </div>
                          )}
                          
                          <Button variant="outline" className="w-full mt-3 text-xs">
                            عرض الصفحة
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : userLocation ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>
                      {selectedSpecialty 
                        ? `لا يوجد أطباء بتخصص ${selectedSpecialty} قريبين من موقعك` 
                        : "لا يوجد أطباء قريبين من موقعك الحالي"}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>يرجى تحديد موقعك لعرض الأطباء القريبين منك</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="border-t pt-4">
                <p className="text-xs text-gray-500 text-center w-full">
                  المسافات والأوقات المعروضة تقديرية وقد تختلف حسب حالة المرور
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LocationSearch;
