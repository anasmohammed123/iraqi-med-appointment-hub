
import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { useHomePageData } from "@/hooks/useHomePageData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DollarSign, BadgeCheck, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const servicePricingSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم يجب أن يكون أكثر من 3 أحرف" }),
  phoneNumber: z.string().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  specialty: z.string({ required_error: "يرجى اختيار التخصص" }),
  serviceDescription: z.string().min(20, { message: "يرجى وصف الخدمة بشكل أكثر تفصيلاً (20 حرف على الأقل)" }),
});

type ServicePricingFormValues = z.infer<typeof servicePricingSchema>;

// Schema for doctor offers
const doctorOfferSchema = z.object({
  price: z.string().min(1, { message: "يرجى إدخال سعر الخدمة" }),
  notes: z.string().min(10, { message: "يرجى إضافة ملاحظات توضيحية (10 أحرف على الأقل)" }),
});

type DoctorOfferFormValues = z.infer<typeof doctorOfferSchema>;

interface ServiceRequest {
  id: number;
  fullName: string;
  phoneNumber: string;
  specialty: string;
  serviceDescription: string;
  status: "pending" | "priced";
  date: string;
  offers: Array<{
    doctorName: string;
    doctorId: number;
    price: number;
    notes: string;
    id: number;
  }>;
}

const ServicePricing = () => {
  const { isLoading, simulateLoading } = useHomePageData();
  const [activeTab, setActiveTab] = useState<"new" | "my-requests">("new");
  
  // Sample data for service requests
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: 1,
      fullName: "محمد الأحمد",
      phoneNumber: "07712345678",
      specialty: "dentistry",
      serviceDescription: "أحتاج إلى تركيب تقويم أسنان، وأود معرفة التكلفة التقريبية والفترة الزمنية المطلوبة للعلاج.",
      status: "priced",
      date: "2025-05-12",
      offers: [
        {
          doctorName: "د. أحمد السامرائي",
          doctorId: 3,
          price: 350,
          notes: "السعر يشمل التقويم الشفاف مع المتابعة لمدة سنة كاملة",
          id: 1
        },
        {
          doctorName: "د. سارة العلي",
          doctorId: 4,
          price: 400,
          notes: "السعر يشمل التقويم المعدني أو الشفاف مع المتابعة لمدة سنة ونصف",
          id: 2
        }
      ]
    },
    {
      id: 2,
      fullName: "فاطمة محمود",
      phoneNumber: "07801234567",
      specialty: "dermatology",
      serviceDescription: "أبحث عن علاج لحب الشباب المزمن، وأود معرفة تكلفة الجلسات وعددها.",
      status: "pending",
      date: "2025-05-15",
      offers: []
    }
  ]);

  // Form for adding new service price request
  const form = useForm<ServicePricingFormValues>({
    resolver: zodResolver(servicePricingSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      specialty: "",
      serviceDescription: "",
    },
  });

  // Form for doctors to add offers
  const offerForm = useForm<DoctorOfferFormValues>({
    resolver: zodResolver(doctorOfferSchema),
    defaultValues: {
      price: "",
      notes: "",
    },
  });

  // Available specialties
  const specialties = [
    { value: "cardiology", label: "أمراض القلب" },
    { value: "dermatology", label: "الأمراض الجلدية" },
    { value: "neurology", label: "أمراض الأعصاب" },
    { value: "orthopedics", label: "جراحة العظام" },
    { value: "pediatrics", label: "طب الأطفال" },
    { value: "ophthalmology", label: "طب العيون" },
    { value: "dentistry", label: "طب الأسنان" },
    { value: "plastic_surgery", label: "الجراحة التجميلية" },
  ];

  // Submit new service price request
  function onSubmit(values: ServicePricingFormValues) {
    simulateLoading(() => {
      const newRequest: ServiceRequest = {
        id: serviceRequests.length + 1,
        ...values,
        status: "pending",
        date: new Date().toISOString().split('T')[0],
        offers: []
      };
      
      setServiceRequests([...serviceRequests, newRequest]);
      
      toast({
        title: "تم إرسال طلب التسعير بنجاح",
        description: "سيتم عرض عروض الأطباء قريباً",
      });
      
      form.reset();
    });
  }

  // Submit doctor offer for service
  function onSubmitOffer(requestId: number) {
    simulateLoading(() => {
      const values = offerForm.getValues();
      
      setServiceRequests(prev => 
        prev.map(request => {
          if (request.id === requestId) {
            const newOffer = {
              doctorName: "د. محمد علي", // In a real app, would be the logged-in doctor
              doctorId: 5,
              price: parseFloat(values.price),
              notes: values.notes,
              id: request.offers.length + 1
            };
            
            return {
              ...request,
              offers: [...request.offers, newOffer],
              status: "priced" 
            };
          }
          return request;
        })
      );
      
      toast({
        title: "تم إضافة عرض السعر بنجاح",
        description: "سيتمكن المريض من رؤية العرض المقدم منك",
      });
      
      offerForm.reset();
    });
  }

  // Get specialty label from value
  const getSpecialtyLabel = (value: string) => {
    return specialties.find(s => s.value === value)?.label || value;
  };

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">تسعير الخدمات الطبية</h1>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "new" | "my-requests")} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">طلب تسعير جديد</TabsTrigger>
            <TabsTrigger value="my-requests">طلباتي السابقة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>طلب تسعير جديد</CardTitle>
                    <CardDescription>
                      قم بملء النموذج للحصول على عروض أسعار من الأطباء المختصين
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الاسم الكامل</FormLabel>
                                <FormControl>
                                  <Input placeholder="أدخل اسمك الكامل" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>رقم الهاتف</FormLabel>
                                <FormControl>
                                  <Input placeholder="أدخل رقم هاتفك" type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="specialty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>التخصص</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر التخصص المطلوب" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {specialties.map((specialty) => (
                                    <SelectItem key={specialty.value} value={specialty.value}>
                                      {specialty.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="serviceDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>وصف الخدمة المطلوبة</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="يرجى وصف الخدمة الطبية التي ترغب في معرفة سعرها بالتفصيل"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                كلما كان الوصف دقيقاً، كلما كانت عروض الأسعار أكثر دقة
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          إرسال طلب التسعير
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>كيف تعمل خدمة التسعير؟</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-medical-primary/10 p-2 rounded-full h-fit">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-medical-primary text-white text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">أرسل طلباً للتسعير</h4>
                        <p className="text-gray-600 text-sm">قم بوصف الخدمة الطبية التي تحتاجها بالتفصيل</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-medical-primary/10 p-2 rounded-full h-fit">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-medical-primary text-white text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">استلم عروض الأسعار</h4>
                        <p className="text-gray-600 text-sm">يقوم الأطباء المختصون بتقديم عروض أسعار مناسبة</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-medical-primary/10 p-2 rounded-full h-fit">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-medical-primary text-white text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">اختر العرض المناسب</h4>
                        <p className="text-gray-600 text-sm">قارن بين العروض واختر ما يناسبك من حيث السعر والخدمات</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">ما المزايا التي تقدمها خدمة التسعير؟</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={18} className="text-medical-primary" />
                      <span className="text-sm">عروض متعددة من أطباء معتمدين</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={18} className="text-medical-primary" />
                      <span className="text-sm">شفافية في الأسعار والخدمات المقدمة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={18} className="text-medical-primary" />
                      <span className="text-sm">توفير وقت البحث عن الخدمات والأسعار</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={18} className="text-medical-primary" />
                      <span className="text-sm">إمكانية التواصل المباشر مع الطبيب</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="my-requests">
            <div className="space-y-6">
              {serviceRequests.length > 0 ? (
                serviceRequests.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <div>
                          <CardTitle>{getSpecialtyLabel(request.specialty)}</CardTitle>
                          <CardDescription className="mt-1">
                            <span className="flex items-center gap-1">
                              <Clock size={14} /> {request.date}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === "pending" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-green-100 text-green-800"
                          }`}>
                            {request.status === "pending" ? "في انتظار العروض" : "تم استلام عروض"}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="mb-4 pb-4 border-b">
                        <h3 className="font-medium mb-2">التفاصيل</h3>
                        <p className="text-gray-700">{request.serviceDescription}</p>
                      </div>
                      
                      {/* Doctor offers section */}
                      <div>
                        <h3 className="font-medium mb-3">عروض الأطباء ({request.offers.length})</h3>
                        
                        {request.offers.length > 0 ? (
                          <div className="space-y-4">
                            {request.offers.map((offer) => (
                              <Card key={offer.id} className="border border-gray-200">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">{offer.doctorName}</h3>
                                    <div className="flex items-center text-medical-primary font-bold">
                                      <DollarSign size={16} className="ml-1" />
                                      <span>{offer.price} د.ع</span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600">{offer.notes}</p>
                                  <Button variant="outline" className="w-full mt-3 text-xs">
                                    التواصل مع الطبيب
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">لم يتم تقديم عروض أسعار بعد</p>
                          </div>
                        )}
                        
                        {/* Doctor offer form - In a real app, this would only show to doctors */}
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="text-sm font-medium mb-3">إضافة عرض سعر (للأطباء فقط)</h4>
                          <Form {...offerForm}>
                            <form className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={offerForm.control}
                                  name="price"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>السعر (د.ع)</FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={offerForm.control}
                                name="notes"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>تفاصيل العرض والملاحظات</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="اشرح تفاصيل العرض والخدمات المشمولة..."
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <Button 
                                type="button" 
                                onClick={() => onSubmitOffer(request.id)} 
                                className="w-full"
                              >
                                إرسال عرض السعر
                              </Button>
                            </form>
                          </Form>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">لا توجد طلبات تسعير</h3>
                  <p className="text-gray-600 mb-6">لم تقم بإرسال أي طلب تسعير بعد</p>
                  <Button onClick={() => setActiveTab("new")}>إنشاء طلب تسعير جديد</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ServicePricing;
