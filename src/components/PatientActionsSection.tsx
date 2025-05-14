
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Video, Home, CalendarClock, MapPin, Phone } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export const PatientActionsSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [homeVisitOpen, setHomeVisitOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال الطلب",
      description: "سيتم التواصل معك قريباً لتأكيد موعد المكالمة.",
    });
    setVideoOpen(false);
    resetForm();
  };

  const handleHomeVisitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال الطلب",
      description: "سيتم التواصل معك قريباً لتأكيد الزيارة المنزلية.",
    });
    setHomeVisitOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خدمات المرضى</h2>
          <p className="text-gray-600">خدمات مخصصة لراحتك</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Video Call Card */}
          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg hover:border-medical-primary transition-all text-center">
                <CardContent className="p-8">
                  <div className="mx-auto w-16 h-16 rounded-full bg-medical-light text-medical-primary flex items-center justify-center mb-4">
                    <Video size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">اطلب مكالمة فيديو</h3>
                  <p className="text-gray-600 mb-4">
                    تحدث مع طبيبك عبر مكالمة فيديو دون الحاجة للخروج من المنزل
                  </p>
                  <Button className="bg-medical-primary hover:bg-medical-dark">
                    طلب مكالمة
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>طلب مكالمة فيديو مع طبيب</DialogTitle>
                <DialogDescription>
                  أدخل بياناتك وسيتم التواصل معك لتحديد موعد المكالمة
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleVideoRequest}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="أدخل رقم هاتفك"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">التاريخ المفضل</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">الوقت المفضل</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">ملاحظات إضافية</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="أخبرنا عن حالتك باختصار..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-medical-primary hover:bg-medical-dark">
                    تأكيد الطلب
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          {/* Home Visit Card */}
          <Dialog open={homeVisitOpen} onOpenChange={setHomeVisitOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg hover:border-medical-primary transition-all text-center">
                <CardContent className="p-8">
                  <div className="mx-auto w-16 h-16 rounded-full bg-medical-light text-medical-primary flex items-center justify-center mb-4">
                    <Home size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">اطلب زيارة منزلية</h3>
                  <p className="text-gray-600 mb-4">
                    طبيب يزورك في المنزل لتوفير الرعاية الطبية الضرورية
                  </p>
                  <Button className="bg-medical-primary hover:bg-medical-dark">
                    طلب زيارة
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>طلب زيارة منزلية</DialogTitle>
                <DialogDescription>
                  أدخل بياناتك وعنوانك وسيتم التواصل معك لتحديد موعد الزيارة
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleHomeVisitRequest}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-home">الاسم</Label>
                    <Input
                      id="name-home"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-home">رقم الهاتف</Label>
                    <Input
                      id="phone-home"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="أدخل رقم هاتفك"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-home">العنوان</Label>
                    <Input
                      id="address-home"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="أدخل عنوانك بالتفصيل"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-home">التاريخ المفضل</Label>
                      <Input
                        id="date-home"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time-home">الوقت المفضل</Label>
                      <Input
                        id="time-home"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes-home">ملاحظات إضافية</Label>
                    <Textarea
                      id="notes-home"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="أخبرنا عن حالتك باختصار..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-medical-primary hover:bg-medical-dark">
                    تأكيد الطلب
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
