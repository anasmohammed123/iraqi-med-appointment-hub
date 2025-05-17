
import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHomePageData } from "@/hooks/useHomePageData";
import { PageLoader } from "@/components/ui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Clock, DollarSign, Phone, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ServiceOffer {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  price: number;
  notes: string;
  date: string;
}

interface ServiceRequest {
  id: number;
  fullName: string;
  specialty: string;
  phoneNumber: string;
  serviceDescription: string;
  date: string;
  status: "pending" | "completed";
  offers: ServiceOffer[];
}

const specialties = [
  "الطب العام",
  "طب القلب",
  "طب الأطفال",
  "الأمراض الجلدية",
  "الجراحة العامة",
  "طب العيون",
  "طب الأسنان",
  "طب النساء والتوليد",
  "العلاج الطبيعي",
  "الأشعة والتصوير الطبي"
];

const ServicePricing = () => {
  const { isLoading, simulateLoading } = useHomePageData();
  const { toast } = useToast();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: 1,
      fullName: "سمير الخليل",
      specialty: "طب العيون",
      phoneNumber: "07701234567",
      serviceDescription: "أحتاج تسعير لعملية الليزك لتصحيح النظر، حيث أعاني من قصر نظر بدرجة -3.5 في كلتا العينين",
      date: "2025-05-10",
      status: "completed",
      offers: [
        {
          id: 1,
          doctorName: "د. خالد المالكي",
          doctorSpecialty: "طب العيون",
          doctorImage: "https://randomuser.me/api/portraits/men/42.jpg",
          price: 1500000,
          notes: "السعر يشمل الفحوصات قبل العملية، والعملية الجراحية بتقنية الفيمتو ليزك، والمتابعة لمدة 6 أشهر بعد العملية",
          date: "2025-05-11"
        },
        {
          id: 2,
          doctorName: "د. مريم الهاشمي",
          doctorSpecialty: "طب العيون",
          doctorImage: "https://randomuser.me/api/portraits/women/42.jpg",
          price: 1350000,
          notes: "تشمل التكلفة العملية بتقنية الليزك التقليدية مع الرعاية اللازمة قبل وبعد العملية والأدوية",
          date: "2025-05-12"
        }
      ]
    },
    {
      id: 2,
      fullName: "فاطمة العبدالله",
      specialty: "طب الأسنان",
      phoneNumber: "07709876543",
      serviceDescription: "أرغب بتركيب تقويم أسنان شفاف نوع انفيزالاين لتعديل تزاحم الأسنان الأمامية",
      date: "2025-05-15",
      status: "pending",
      offers: []
    }
  ]);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [activeTab, setActiveTab] = useState("browse");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !specialty || !phoneNumber || !serviceDescription) {
      toast({
        title: "خطأ في النموذج",
        description: "الرجاء تعبئة جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    simulateLoading(() => {
      const newRequest: ServiceRequest = {
        id: serviceRequests.length + 1,
        fullName,
        specialty,
        phoneNumber,
        serviceDescription,
        date: new Date().toISOString().split('T')[0],
        status: "pending",
        offers: []
      };
      
      setServiceRequests([newRequest, ...serviceRequests]);
      
      // Reset form
      setFullName("");
      setSpecialty("");
      setPhoneNumber("");
      setServiceDescription("");
      
      // Show success message
      toast({
        title: "تم إرسال طلبك بنجاح",
        description: "سيتم تقديم عروض أسعار من الأطباء المختصين قريباً",
      });
      
      // Switch to browse tab
      setActiveTab("browse");
    });
  };

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">تسعير الخدمات الطبية</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            احصل على أسعار تنافسية من مختلف الأطباء للخدمات الطبية التي تحتاجها، ثم اختر العرض المناسب لك
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">طلبات التسعير</TabsTrigger>
            <TabsTrigger value="request">طلب تسعير جديد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="mt-6">
            <div className="space-y-8">
              {serviceRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{request.specialty}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{request.fullName}</span>
                          <span>•</span>
                          <Phone className="h-4 w-4" />
                          <span>{request.phoneNumber}</span>
                          <span>•</span>
                          <span>{request.date}</span>
                        </CardDescription>
                      </div>
                      <Badge variant={request.status === "completed" ? "outline" : "secondary"}>
                        {request.status === "pending" ? (
                          <><Clock className="h-3 w-3 mr-1" /> بانتظار العروض</>
                        ) : (
                          <><Check className="h-3 w-3 mr-1" /> تم تقديم عروض</>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{request.serviceDescription}</p>
                    
                    {request.offers.length > 0 ? (
                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          عروض الأسعار ({request.offers.length})
                        </h4>
                        
                        {request.offers.map((offer) => (
                          <div key={offer.id} className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar>
                                <AvatarImage src={offer.doctorImage} />
                                <AvatarFallback>{offer.doctorName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">{offer.doctorName}</div>
                                <div className="text-sm text-medical-primary">{offer.doctorSpecialty}</div>
                              </div>
                              <div className="text-sm text-gray-500 mr-auto">{offer.date}</div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                              <div className="space-y-2">
                                <div className="text-sm text-gray-600">ملاحظات العرض:</div>
                                <p className="text-gray-700">{offer.notes}</p>
                              </div>
                              
                              <div className="md:text-right">
                                <div className="text-sm text-gray-600">السعر:</div>
                                <div className="text-xl font-bold text-medical-primary">
                                  {offer.price.toLocaleString()} د.ع
                                </div>
                              </div>
                            </div>
                            
                            <Button className="w-full mt-3">
                              التواصل مع الطبيب
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                        لم يتم تقديم عروض أسعار بعد
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="request" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>طلب تسعير جديد</CardTitle>
                <CardDescription>
                  قم بملء النموذج التالي للحصول على عروض أسعار من الأطباء المختصين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input 
                      id="fullName" 
                      placeholder="أدخل اسمك الكامل" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialty">التخصص المطلوب</Label>
                    <Select value={specialty} onValueChange={setSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التخصص الطبي" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                    <Input 
                      id="phoneNumber" 
                      placeholder="أدخل رقم هاتفك" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription">وصف الخدمة المطلوبة</Label>
                    <Textarea 
                      id="serviceDescription" 
                      placeholder="اذكر تفاصيل الخدمة المطلوبة بدقة للحصول على تسعير دقيق..." 
                      rows={5}
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    إرسال طلب التسعير
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ServicePricing;
