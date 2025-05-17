
import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  subject: z.string().min(5, { message: "يرجى إدخال موضوع رسالتك (5 أحرف على الأقل)" }),
  message: z.string().min(20, { message: "يرجى كتابة رسالتك بشكل أكثر تفصيلاً (20 حرف على الأقل)" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      });
      
      form.reset();
    }, 1500);
  }

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      <div className="container mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">اتصل بنا</h1>
          <p className="text-gray-600">نحن هنا للإجابة على جميع استفساراتك ومساعدتك في الحصول على الرعاية الصحية المناسبة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>أرسل لنا رسالة</CardTitle>
                <CardDescription>يسعدنا تلقي رسائلكم واستفساراتكم وسنقوم بالرد عليها في أقرب وقت ممكن</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل بريدك الإلكتروني" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
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
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الموضوع</FormLabel>
                            <FormControl>
                              <Input placeholder="موضوع الرسالة" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الرسالة</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="اكتب رسالتك هنا..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">
                      إرسال الرسالة
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>معلومات الاتصال</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-medical-primary bg-opacity-10 p-3 rounded-lg">
                    <Phone className="text-medical-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">رقم الهاتف</h3>
                    <p className="text-gray-600">+964 7712 345678</p>
                    <p className="text-gray-600">+964 7801 234567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-medical-primary bg-opacity-10 p-3 rounded-lg">
                    <Mail className="text-medical-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@iraqimedhub.iq</p>
                    <p className="text-gray-600">support@iraqimedhub.iq</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-medical-primary bg-opacity-10 p-3 rounded-lg">
                    <MapPin className="text-medical-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">العنوان</h3>
                    <p className="text-gray-600">شارع الرشيد، بغداد، العراق</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.6559304245934!2d44.38330287537445!3d33.310679156213164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1559d645ba9fe8e7%3A0x7e4869daa289fbff!2sAl%20Rashid%20Street%2C%20Baghdad%2C%20Iraq!5e0!3m2!1sen!2sus!4v1682695184220!5m2!1sen!2sus" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="خريطة الموقع"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
