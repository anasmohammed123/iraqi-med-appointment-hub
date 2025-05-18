
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pill, PlusCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const PharmacyRequestSection = () => {
  const [open, setOpen] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicineName || !address) {
      toast({
        title: "يرجى ملء الحقول المطلوبة",
        description: "اسم الدواء والعنوان مطلوبان.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if user is authenticated
      if (!user) {
        toast({
          title: "يرجى تسجيل الدخول",
          description: "يجب عليك تسجيل الدخول لإرسال طلب.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Insert pharmacy request into Supabase
      const { error } = await supabase
        .from('pharmacy_requests')
        .insert([
          {
            medicine_name: medicineName,
            address: address,
            notes: notes,
            user_id: user.id,
            status: 'pending'
          }
        ]);
        
      if (error) {
        console.error("Error submitting pharmacy request:", error);
        toast({
          title: "حدث خطأ",
          description: "لم نتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم إرسال الطلب",
          description: "سيتم التواصل معك قريباً من أقرب صيدلية.",
        });
        setOpen(false);
        // Reset form
        setMedicineName('');
        setAddress('');
        setNotes('');
      }
    } catch (error) {
      console.error("Exception:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">صيدليتنا الإلكترونية</h2>
          <p className="text-gray-600">احصل على أدويتك من أقرب صيدلية أو اطلب توصيلها لمنزلك</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-6">
                <Pill size={48} className="text-medical-primary" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">طلب الأدوية من أقرب صيدلية</h3>
              <p className="text-gray-600 text-center mb-6">
                أرسل طلبك وسنقوم بتوصيل الأدوية من أقرب صيدلية إلى عنوانك
              </p>
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                    أرسل الطلب
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>طلب أدوية من الصيدلية</DialogTitle>
                    <DialogDescription>
                      أدخل بيانات الطلب وسيتم التواصل معك في أقرب وقت
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="medicine-name">اسم الدواء</Label>
                        <Input
                          id="medicine-name"
                          value={medicineName}
                          onChange={(e) => setMedicineName(e.target.value)}
                          placeholder="أدخل اسم الدواء أو الوصفة الطبية"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">العنوان</Label>
                        <Input
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="أدخل العنوان للتوصيل"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">ملاحظات إضافية</Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="أي تفاصيل إضافية حول طلبك..."
                          rows={3}
                        />
                      </div>
                      {!user && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
                          يجب عليك <Link to="/login" className="font-bold underline">تسجيل الدخول</Link> لإرسال طلب
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        className="bg-medical-primary hover:bg-medical-dark"
                        disabled={isSubmitting || !user}
                      >
                        {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-6">
                <PlusCircle size={48} className="text-medical-primary" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">تصفح الصيدلية الإلكترونية</h3>
              <p className="text-gray-600 text-center mb-6">
                تصفح قائمة الأدوية المتوفرة وقم بالطلب مباشرة من خلال موقعنا
              </p>
              
              <Link to="/pharmacy">
                <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                  تصفح الصيدلية
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
