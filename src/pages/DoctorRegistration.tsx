import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { useToast } from "@/components/ui/use-toast";
import { specialties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Upload, File, FileText, Languages } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DoctorRegistrationSchema = z.object({
  // Arabic details
  nameAr: z.string().min(2, "الاسم الكامل مطلوب"),
  specialtyAr: z.string().min(1, "التخصص مطلوب"),
  bioAr: z.string().min(10, "نبذة عن الطبيب مطلوبة"),
  hospitalAr: z.string().min(2, "اسم المستشفى أو العيادة مطلوب"),
  addressAr: z.string().min(5, "العنوان مطلوب"),
  
  // English details
  nameEn: z.string().min(2, "Full name is required"),
  specialtyEn: z.string().min(1, "Specialty is required"),
  bioEn: z.string().min(10, "Bio is required"),
  hospitalEn: z.string().min(2, "Hospital/clinic name is required"),
  addressEn: z.string().min(5, "Address is required"),
  
  // Kurdish details
  nameKu: z.string().min(2, "ناوی تەواو پێویستە"),
  specialtyKu: z.string().min(1, "پسپۆڕی پێویستە"),
  bioKu: z.string().min(10, "کورتەیەک دەربارەی پزیشک پێویستە"),
  hospitalKu: z.string().min(2, "ناوی نەخۆشخانە یان کلینیک پێویستە"),
  addressKu: z.string().min(5, "ناونیشان پێویستە"),
  
  // Common details
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  phone: z.string().min(10, "رقم الهاتف مطلوب"),
  specialtyId: z.string().min(1, "يرجى اختيار التخصص"),
  experience: z.string().min(1, "سنوات الخبرة مطلوبة"),
  languages: z.string().min(1, "اللغات المتحدث بها مطلوبة"),
  price: z.string().min(1, "سعر الكشفية مطلوب"),
});

const DoctorRegistration = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [cv, setCV] = useState<File | null>(null);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  
  const form = useForm<z.infer<typeof DoctorRegistrationSchema>>({
    resolver: zodResolver(DoctorRegistrationSchema),
    defaultValues: {
      nameAr: "",
      specialtyAr: "",
      bioAr: "",
      hospitalAr: "",
      addressAr: "",
      nameEn: "",
      specialtyEn: "",
      bioEn: "",
      hospitalEn: "",
      addressEn: "",
      nameKu: "",
      specialtyKu: "",
      bioKu: "",
      hospitalKu: "",
      addressKu: "",
      email: "",
      phone: "",
      specialtyId: "",
      experience: "",
      languages: "",
      price: "",
    },
  });
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };
  
  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setCertificates([...certificates, ...filesArray]);
    }
  };
  
  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCV(e.target.files[0]);
    }
  };
  
  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };
  
  const onSubmit = (data: z.infer<typeof DoctorRegistrationSchema>) => {
    if (!profileImage) {
      toast({
        title: "الصورة الشخصية مطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    if (!cv) {
      toast({
        title: "السيرة الذاتية مطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    if (certificates.length === 0) {
      toast({
        title: "يرجى رفع شهادة واحدة على الأقل",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send all data to the backend
    setRegistrationLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRegistrationLoading(false);
      toast({
        title: "تم تقديم طلب التسجيل بنجاح",
        description: "سيتم مراجعة بياناتك والتواصل معك قريبًا",
      });
      
      // In a real app, you would redirect to a success page or dashboard
    }, 2000);
    
    console.log({
      formData: data,
      profileImage,
      certificates,
      cv,
    });
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">تسجيل طبيب جديد</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            انضم إلى شبكة الأطباء في المنصة الطبية العراقية وابدأ باستقبال مرضاك
          </p>
        </div>
        
        <Card className="border-2 border-medical-light">
          <CardHeader>
            <CardTitle>معلومات الطبيب</CardTitle>
            <CardDescription>
              يرجى تعبئة جميع المعلومات المطلوبة باللغات الثلاث ليتمكن المرضى من العثور عليك
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {/* Profile Image Upload */}
                <div className="mb-6">
                  <Label className="block mb-2">الصورة الشخصية <span className="text-red-500">*</span></Label>
                  <div className="flex items-center">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden relative">
                      {profileImage ? (
                        <img 
                          src={URL.createObjectURL(profileImage)} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="h-10 w-10 text-gray-400" />
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={handleProfileImageChange}
                      />
                    </div>
                    <div className="ml-4 rtl:mr-4 rtl:ml-0">
                      <p className="text-sm font-medium">اختر صورة شخصية</p>
                      <p className="text-xs text-gray-500">الحد الأقصى: 2 ميجابايت، يفضل بأبعاد 400×400</p>
                    </div>
                  </div>
                </div>
                
                {/* Multilingual Information */}
                <Tabs defaultValue="arabic" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-3">
                    <TabsTrigger value="arabic" className="flex items-center gap-1">
                      <Language className="h-4 w-4" />
                      <span>العربية</span>
                    </TabsTrigger>
                    <TabsTrigger value="english" className="flex items-center gap-1">
                      <Language className="h-4 w-4" />
                      <span>English</span>
                    </TabsTrigger>
                    <TabsTrigger value="kurdish" className="flex items-center gap-1">
                      <Language className="h-4 w-4" />
                      <span>کوردی</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Arabic Form */}
                  <TabsContent value="arabic" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nameAr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="د. أحمد محمد علي" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialtyAr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>التخصص الدقيق <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="اختصاصي أمراض القلب والشرايين" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bioAr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نبذة عن الطبيب <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="اكتب نبذة مختصرة عن خبرتك ومؤهلاتك" 
                              rows={5} 
                              dir="rtl" 
                            />
                          </FormControl>
                          <FormDescription>
                            يظهر هذا النص في صفحة الملف الشخصي للأطباء الناطقين بالعربية
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hospitalAr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المستشفى / العيادة <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="مستشفى بغداد التعليمي" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="addressAr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العنوان التفصيلي <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="بغداد، المنصور، شارع 14 رمضان" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  {/* English Form */}
                  <TabsContent value="english" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nameEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Dr. Ahmed Mohammed Ali" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialtyEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialty <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Cardiologist" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bioEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biography <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Write a brief summary of your experience and qualifications" 
                              rows={5} 
                            />
                          </FormControl>
                          <FormDescription>
                            This text appears on your profile page for English-speaking patients
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hospitalEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hospital / Clinic <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Baghdad Teaching Hospital" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="addressEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Baghdad, Mansour, 14 Ramadan Street" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  {/* Kurdish Form */}
                  <TabsContent value="kurdish" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nameKu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ناوی تەواو <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="د. ئەحمەد محەمەد عەلی" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialtyKu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>پسپۆڕی <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="پسپۆڕی نەخۆشییەکانی دڵ" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bioKu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>کورتەیەک دەربارەی پزیشک <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="کورتەیەک لەسەر شارەزایی و بڕوانامەکانت بنووسە" 
                              rows={5} 
                              dir="rtl" 
                            />
                          </FormControl>
                          <FormDescription>
                            ئەم دەقە لە پەڕەی پرۆفایلی نەخۆشە کوردییەکان دەردەکەوێت
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hospitalKu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نەخۆشخانە / کلینیک <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="نەخۆشخانەی فێرکاری بەغدا" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="addressKu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ناونیشان <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="بەغدا، مەنسور، شەقامی ١٤ی ڕەمەزان" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
                
                <Separator />
                
                {/* Common Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="doctor@example.com" dir="ltr" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+964 7701234567" dir="ltr" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="specialtyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>التخصص العام <span className="text-red-500">*</span></FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر التخصص" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty.id} value={specialty.id}>
                                {specialty.nameAr}
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
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سنوات الخبرة <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="10" min="1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اللغات <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="العربية، الإنجليزية، الكردية" />
                        </FormControl>
                        <FormDescription>
                          افصل بين اللغات بفواصل
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر الكشفية (دينار) <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="25000" min="1000" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                {/* Document Uploads */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">المستندات المطلوبة</h3>
                  
                  {/* Certificates Upload */}
                  <div className="space-y-2">
                    <Label>الشهادات الطبية <span className="text-red-500">*</span></Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="flex flex-col items-center">
                        <FileText className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium mb-1">اسحب وأفلت الملفات هنا أو</p>
                        <label className="text-sm text-medical-primary hover:underline cursor-pointer">
                          تصفح من جهازك
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            className="hidden"
                            onChange={handleCertificatesChange}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          صيغ PDF، JPG، PNG (الحد الأقصى: 5 ميجابايت لكل ملف)
                        </p>
                      </div>
                    </div>
                    
                    {certificates.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium">الشهادات المرفقة:</p>
                        {certificates.map((cert, index) => (
                          <div key={`${cert.name}-${index}`} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                            <div className="flex items-center">
                              <File className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm truncate max-w-xs">{cert.name}</span>
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeCertificate(index)}
                            >
                              إزالة
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* CV Upload */}
                  <div className="space-y-2">
                    <Label>السيرة الذاتية <span className="text-red-500">*</span></Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="flex flex-col items-center">
                        <FileText className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium mb-1">اسحب وأفلت السيرة الذاتية هنا أو</p>
                        <label className="text-sm text-medical-primary hover:underline cursor-pointer">
                          تصفح من جهازك
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleCVChange}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          صيغ PDF، DOC، DOCX (الحد الأقصى: 10 ميجابايت)
                        </p>
                      </div>
                    </div>
                    
                    {cv && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                          <div className="flex items-center">
                            <File className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm truncate max-w-xs">{cv.name}</span>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setCV(null)}
                          >
                            إزالة
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <Button type="button" variant="outline">
                  إلغاء
                </Button>
                <Button 
                  type="submit" 
                  className="bg-medical-primary hover:bg-medical-dark"
                  disabled={registrationLoading}
                >
                  {registrationLoading ? "جاري التسجيل..." : "إرسال طلب التسجيل"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DoctorRegistration;
