import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { DollarSign } from "lucide-react";

const servicePricingSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم يجب أن يكون أكثر من 3 أحرف" }),
  phoneNumber: z.string().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  specialty: z.string({ required_error: "يرجى اختيار التخصص" }),
  serviceDescription: z.string().min(20, { message: "يرجى وصف الخدمة بشكل أكثر تفصيلاً (20 حرف على الأقل)" }),
});

type ServicePricingFormValues = z.infer<typeof servicePricingSchema>;

const ServicePricing = () => {
  const navigate = useNavigate();
  const { isLoading, simulateLoading } = useHomePageData();
  const [submittedRequests, setSubmittedRequests] = useState<ServicePricingFormValues[]>([]);
  const [doctorOffers, setDoctorOffers] = useState<Array<{
    doctorName: string;
    price: number;
    notes: string;
    id: number;
  }>>([
    {
      doctorName: "د. محمد علي",
      price: 150,
      notes: "السعر يشمل الفحص الأولي والمتابعة لمدة أسبوع",
      id: 1,
    },
    {
      doctorName: "د. فاطمة الزهراء",
      price: 200,
      notes: "السعر يشمل الفحص والأدوية اللازمة للعلاج",
      id: 2,
    },
    {
      doctorName: "د. أحمد السامرائي",
      price: 180,
      notes: "متاح للاستشارة عبر الفيديو بسعر مخفض",
      id: 3,
    }
  ]);

  const form = useForm<ServicePricingFormValues>({
    resolver: zodResolver(servicePricingSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      specialty: "",
      serviceDescription: "",
    },
  });

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

  function onSubmit(values: ServicePricingFormValues) {
    simulateLoading(() => {
      setSubmittedRequests([...submittedRequests, values]);
      
      toast({
        title: "تم إرسال طلب التسعير بنجاح",
        description: "سيتم عرض عروض الأطباء قريباً",
      });
      
      form.reset();
    });
  }

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">طلب تسعير خدمة طبية</h1>

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
                <CardTitle>عروض الأسعار المقدمة</CardTitle>
                <CardDescription>
                  عروض من الأطباء المختصين لطلبات التسعير السابقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {doctorOffers.length > 0 ? (
                  <div className="space-y-4">
                    {doctorOffers.map((offer) => (
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
                  <div className="text-center py-8 text-gray-500">
                    <p>لا توجد عروض أسعار حتى الآن</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-xs text-gray-500">
                  يتم تحديث العروض تلقائياً عند استلامها من الأطباء
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicePricing;
