import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Upload, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const PrescriptionUpload = () => {
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم التواصل معك قريبًا لتأكيد الطلب",
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <PageLayout>
        <div className="py-12 max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="text-green-600 h-16 w-16" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">تم إرسال طلبك بنجاح</h1>
          <p className="text-gray-600 mb-8">
            شكرًا لك! لقد استلمنا طلب الوصفة الطبية الخاصة بك. سيقوم فريقنا بمراجعتها والتواصل معك في أقرب وقت ممكن.
          </p>
          <div className="space-y-4">
            <Link to="/pharmacy">
              <Button className="w-full">العودة إلى الصيدلية</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">العودة إلى الرئيسية</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إرسال وصفة طبية</h1>
          <p className="text-gray-600">
            أرسل صورة من الوصفة الطبية وسنقوم بتجهيز الأدوية وتوصيلها لك
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    {prescriptionFile ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                        <p className="font-medium mb-1">تم تحميل الملف</p>
                        <p className="text-sm text-gray-500 mb-3">{prescriptionFile.name}</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="font-medium mb-1">اضغط هنا لتحميل صورة الوصفة الطبية</p>
                        <p className="text-sm text-gray-500 mb-3">أو اسحب وأفلت الملف هنا</p>
                      </>
                    )}
                    
                    <Input
                      type="file"
                      accept="image/*"
                      id="prescription-upload"
                      className={prescriptionFile ? "hidden" : "opacity-0 absolute inset-0 w-full h-full cursor-pointer"}
                      onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
                      required
                    />
                    
                    {prescriptionFile && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPrescriptionFile(null)}
                      >
                        تغيير الملف
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">الاسم الكامل</label>
                    <Input
                      id="name"
                      placeholder="أدخل اسمك الكامل"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">رقم الهاتف</label>
                    <Input
                      id="phone"
                      placeholder="أدخل رقم هاتفك"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">عنوان التوصيل</label>
                  <Input
                    id="address"
                    placeholder="أدخل عنوان التوصيل الكامل"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="note" className="text-sm font-medium">ملاحظات إضافية (اختياري)</label>
                  <Textarea
                    id="note"
                    placeholder="أي تعليمات أو معلومات إضافية تريد إخبارنا بها"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                  <Pill className="text-blue-600 h-5 w-5 mt-1 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    سيقوم فريقنا بمراجعة الوصفة الطبية والتواصل معك لتأكيد الطلب والسعر قبل التوصيل. نلتزم بالخصوصية التامة لمعلوماتك الطبية.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-medical-primary hover:bg-medical-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PrescriptionUpload;
