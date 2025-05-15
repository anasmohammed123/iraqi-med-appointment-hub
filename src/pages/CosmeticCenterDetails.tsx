
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { useHomePageData } from "@/hooks/useHomePageData";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LazyImage } from "@/components/ui/lazy-image";
import { Star, Phone, Mail, Globe, Clock, MapPin } from "lucide-react";
import { CosmeticCenter } from "@/data/cosmeticCentersData";
import { toast } from "@/hooks/use-toast";

const CosmeticCenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { cosmeticCenters, isLoading, simulateLoading } = useHomePageData();
  const [center, setCenter] = useState<CosmeticCenter | null>(null);

  useEffect(() => {
    if (id) {
      simulateLoading(() => {
        const foundCenter = cosmeticCenters.find(c => c.id === parseInt(id));
        if (foundCenter) {
          setCenter(foundCenter);
        } else {
          toast({
            title: "خطأ في العثور على المركز",
            description: "لم يتم العثور على مركز التجميل المطلوب",
            variant: "destructive"
          });
        }
      });
    }
  }, [id, cosmeticCenters, simulateLoading]);

  const handleBookAppointment = () => {
    toast({
      title: "تم طلب الموعد",
      description: "سيتم التواصل معك قريباً لتأكيد الموعد"
    });
  };

  if (!center && !isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">لم يتم العثور على مركز التجميل</h2>
          <p className="mb-6">المركز الذي تبحث عنه غير موجود أو تم حذفه</p>
          <Link to="/cosmetic-centers">
            <Button>العودة إلى مراكز التجميل</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      {center && (
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Image carousel */}
              <div className="mb-6 rounded-lg overflow-hidden border shadow-sm">
                <Carousel>
                  <CarouselContent>
                    {center.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <AspectRatio ratio={16 / 9}>
                          <LazyImage
                            src={image}
                            alt={`${center.name} - صورة ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <CarouselPrevious className="h-8 w-8 mr-2 bg-white/70" />
                    <CarouselNext className="h-8 w-8 ml-2 bg-white/70" />
                  </div>
                </Carousel>
              </div>

              {/* Center details tabs */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="about">نبذة عن المركز</TabsTrigger>
                  <TabsTrigger value="services">الخدمات</TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="pt-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">عن المركز</h3>
                      <p className="mb-6">{center.description}</p>
                      
                      <h4 className="font-semibold mb-3">التخصصات</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {center.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <h4 className="font-semibold mb-3">ساعات العمل</h4>
                      <div className="flex items-center text-gray-700 mb-6">
                        <Clock size={18} className="ml-2" />
                        <span>{center.workingHours}</span>
                      </div>
                      
                      <h4 className="font-semibold mb-3">الموقع</h4>
                      <div className="flex items-center text-gray-700">
                        <MapPin size={18} className="ml-2" />
                        <span>{center.address}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="services">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">الخدمات المقدمة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {center.services.map((service, idx) => (
                          <Card key={idx} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="font-medium">{service}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="ml-4">
                          <div className="flex items-center">
                            <span className="text-3xl font-bold mr-2">{center.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={20} 
                                  className={i < Math.floor(center.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-gray-600 mt-1">
                            بناءً على {center.reviewCount} تقييم
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-center text-gray-500 py-8">
                        سيتم عرض تقييمات العملاء هنا في النسخة النهائية من الموقع
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Contact card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone size={18} className="ml-2 text-medical-primary" />
                        <span className="text-gray-800">{center.contactInfo.phone}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail size={18} className="ml-2 text-medical-primary" />
                        <span className="text-gray-800">{center.contactInfo.email}</span>
                      </div>
                      
                      {center.contactInfo.website && (
                        <div className="flex items-center">
                          <Globe size={18} className="ml-2 text-medical-primary" />
                          <span className="text-gray-800">{center.contactInfo.website}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <Button className="w-full" onClick={handleBookAppointment}>
                        حجز موعد
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        طلب استشارة
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Price range card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">نطاق الأسعار</h3>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-medical-primary">
                        {center.priceRange}
                      </span>
                    </div>
                    <p className="text-sm text-center text-gray-600 mt-2">
                      {center.priceRange === '$$$$' && 'أسعار فاخرة'}
                      {center.priceRange === '$$$' && 'أسعار مرتفعة'}
                      {center.priceRange === '$$' && 'أسعار متوسطة'}
                      {center.priceRange === '$' && 'أسعار اقتصادية'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default CosmeticCenterDetails;
