
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  Award, 
  Star, 
  Globe, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors } from "@/data/mockData";

type AppointmentTime = {
  id: string;
  time: string;
  available: boolean;
};

// Mock appointment times
const appointmentTimes: Record<string, AppointmentTime[]> = {
  "2025-05-15": [
    { id: "1", time: "09:00 AM", available: true },
    { id: "2", time: "10:00 AM", available: true },
    { id: "3", time: "11:00 AM", available: false },
    { id: "4", time: "12:00 PM", available: true },
    { id: "5", time: "02:00 PM", available: true },
    { id: "6", time: "03:00 PM", available: false },
    { id: "7", time: "04:00 PM", available: true },
  ],
  "2025-05-16": [
    { id: "8", time: "09:00 AM", available: true },
    { id: "9", time: "10:00 AM", available: false },
    { id: "10", time: "11:00 AM", available: true },
    { id: "11", time: "12:00 PM", available: false },
    { id: "12", time: "02:00 PM", available: true },
    { id: "13", time: "03:00 PM", available: true },
    { id: "14", time: "04:00 PM", available: true },
  ],
  "2025-05-17": [
    { id: "15", time: "09:00 AM", available: false },
    { id: "16", time: "10:00 AM", available: true },
    { id: "17", time: "11:00 AM", available: true },
    { id: "18", time: "12:00 PM", available: true },
    { id: "19", time: "02:00 PM", available: false },
    { id: "20", time: "03:00 PM", available: true },
    { id: "21", time: "04:00 PM", available: false },
  ],
};

// Mock reviews
const reviews = [
  {
    id: "1",
    name: "محمد العلي",
    rating: 5,
    date: "قبل أسبوع",
    comment: "دكتور ممتاز، جدا متفهم وشرح حالتي بالتفصيل. العيادة نظيفة ومنظمة والانتظار كان قليل.",
  },
  {
    id: "2",
    name: "فاطمة حسين",
    rating: 4,
    date: "قبل شهر",
    comment: "تجربة جيدة بشكل عام. الدكتور متمكن وودود. الحجز والدفع كان سهل عبر المنصة.",
  },
  {
    id: "3",
    name: "أحمد الربيعي",
    rating: 5,
    date: "قبل شهرين",
    comment: "من أفضل الأطباء الذين زرتهم. التشخيص كان دقيق والعلاج فعال. أنصح بالتعامل معه.",
  },
];

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const doctor = doctors.find((doc) => doc.id === id);
  
  const [selectedDate, setSelectedDate] = useState("2025-05-15");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState("كشف");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Return to previous page if doctor not found
  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="medical-container py-16 text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold mb-4">لم يتم العثور على الطبيب</h1>
          <p className="text-gray-600 mb-8">
            عذراً، لا يمكن العثور على الطبيب الذي تبحث عنه.
          </p>
          <Link to="/doctors">
            <Button className="bg-medical-primary hover:bg-medical-dark text-white">
              العودة إلى قائمة الأطباء
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleBooking = () => {
    if (!selectedTime) {
      toast({
        title: "اختر وقت للموعد",
        description: "يرجى اختيار وقت متاح للموعد من الجدول",
        variant: "destructive",
      });
      return;
    }

    if (!patientName || !patientPhone) {
      toast({
        title: "بيانات مفقودة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API request to book the appointment
    setBookingComplete(true);
    toast({
      title: "تم حجز الموعد بنجاح!",
      description: `تم تأكيد موعدك مع ${doctor.nameAr} في ${selectedDate} الساعة ${selectedTime}`,
    });
  };

  // Next 7 days for appointment booking
  const nextDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    nextDays.push({
      dateStr: `2025-05-${15 + i}`, // Mock date for demo purposes
      dayName: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][date.getDay()],
      dayNum: date.getDate(),
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Doctor Header */}
      <div className="bg-medical-light py-6 px-4">
        <div className="medical-container">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img
              src={doctor.image}
              alt={doctor.nameAr}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{doctor.nameAr}</h1>
              <p className="text-medical-primary text-lg mb-2">{doctor.specialtyAr}</p>
              
              <div className="flex items-center text-amber-500 mb-3">
                {'★'.repeat(Math.floor(doctor.rating))}
                {'☆'.repeat(5 - Math.floor(doctor.rating))}
                <span className="text-gray-600 mr-2">({doctor.reviewCount} تقييم)</span>
                <span className="text-gray-600">• {doctor.experience} سنة خبرة</span>
              </div>
              
              <div className="flex items-center mb-2 text-gray-600">
                <MapPin className="h-4 w-4 ml-1 flex-shrink-0" />
                <span>{doctor.hospitalAr}، {doctor.cityAr}</span>
              </div>
            </div>
            
            <div className="md:text-center">
              <p className="font-bold text-2xl text-gray-900 mb-1">
                {doctor.price.toLocaleString()} <span className="text-sm font-normal">د.ع</span>
              </p>
              <p className="text-gray-500 text-sm mb-3">لكل كشف</p>
              
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                    حجز موعد
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                  {!bookingComplete ? (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold mb-2">
                          حجز موعد مع {doctor.nameAr}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="mt-4 space-y-6">
                        {/* Appointment Type */}
                        <div>
                          <h3 className="font-semibold mb-3">نوع الحجز</h3>
                          <RadioGroup
                            value={appointmentType}
                            onValueChange={setAppointmentType}
                            className="flex space-x-4 rtl:space-x-reverse"
                          >
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <RadioGroupItem value="كشف" id="appointment" />
                              <Label htmlFor="appointment">كشف</Label>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <RadioGroupItem value="استشارة" id="consultation" />
                              <Label htmlFor="consultation">استشارة</Label>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <RadioGroupItem value="متابعة" id="followup" />
                              <Label htmlFor="followup">متابعة</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {/* Date Selection */}
                        <div>
                          <h3 className="font-semibold mb-3">اختر التاريخ</h3>
                          <div className="grid grid-cols-7 gap-2">
                            {nextDays.map((day) => (
                              <button
                                key={day.dateStr}
                                onClick={() => handleDateChange(day.dateStr)}
                                className={`p-2 rounded-md text-center transition-colors ${
                                  selectedDate === day.dateStr
                                    ? "bg-medical-primary text-white"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                }`}
                              >
                                <div className="text-xs">{day.dayName}</div>
                                <div className="font-bold">{day.dayNum}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Time Selection */}
                        <div>
                          <h3 className="font-semibold mb-3">اختر الوقت</h3>
                          <div className="grid grid-cols-3 gap-2">
                            {appointmentTimes[selectedDate]?.map((slot) => (
                              <button
                                key={slot.id}
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                                disabled={!slot.available}
                                className={`p-2 rounded-md text-center transition-colors ${
                                  selectedTime === slot.time
                                    ? "bg-medical-primary text-white"
                                    : slot.available
                                    ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Patient Information */}
                        <div className="space-y-4">
                          <h3 className="font-semibold">معلومات المريض</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="patientName">الاسم الكامل *</Label>
                              <Input
                                id="patientName"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                placeholder="أدخل اسمك الكامل"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="patientPhone">رقم الهاتف *</Label>
                              <Input
                                id="patientPhone"
                                value={patientPhone}
                                onChange={(e) => setPatientPhone(e.target.value)}
                                placeholder="أدخل رقم هاتفك"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="patientEmail">البريد الإلكتروني</Label>
                            <Input
                              id="patientEmail"
                              type="email"
                              value={patientEmail}
                              onChange={(e) => setPatientEmail(e.target.value)}
                              placeholder="أدخل بريدك الإلكتروني"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="patientNotes">ملاحظات (اختياري)</Label>
                            <Textarea
                              id="patientNotes"
                              value={patientNotes}
                              onChange={(e) => setPatientNotes(e.target.value)}
                              placeholder="أضف أي ملاحظات متعلقة بحالتك الصحية أو سبب الزيارة"
                              rows={3}
                            />
                          </div>
                        </div>
                        
                        {/* Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">ملخص الحجز</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">الطبيب:</span>
                              <span className="font-medium">{doctor.nameAr}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">نوع الحجز:</span>
                              <span className="font-medium">{appointmentType}</span>
                            </div>
                            {selectedDate && selectedTime && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">التاريخ:</span>
                                  <span className="font-medium">{selectedDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">الوقت:</span>
                                  <span className="font-medium">{selectedTime}</span>
                                </div>
                              </>
                            )}
                            <div className="flex justify-between pt-2 border-t">
                              <span className="text-gray-600">الرسوم:</span>
                              <span className="font-bold">{doctor.price.toLocaleString()} د.ع</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          onClick={handleBooking}
                          className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                        >
                          تأكيد الحجز
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                        <CheckCircle className="h-10 w-10" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">تم تأكيد الحجز!</h2>
                      <p className="text-gray-600 mb-6">
                        تم حجز موعدك بنجاح مع {doctor.nameAr} في {selectedDate} الساعة {selectedTime}
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-right">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">رقم الحجز:</span>
                            <span className="font-medium">APT-{Math.floor(Math.random() * 10000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">المريض:</span>
                            <span className="font-medium">{patientName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">الطبيب:</span>
                            <span className="font-medium">{doctor.nameAr}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">التاريخ والوقت:</span>
                            <span className="font-medium">{selectedDate} - {selectedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">العيادة:</span>
                            <span className="font-medium">{doctor.hospitalAr}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">العنوان:</span>
                            <span className="font-medium">{doctor.addressAr}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="text-gray-600">رسوم الكشف:</span>
                            <span className="font-bold">{doctor.price.toLocaleString()} د.ع</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-600 mb-6">
                        <div className="flex items-start mb-2">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">سيتم إرسال تفاصيل الحجز إلى هاتفك ورسالة تذكير قبل الموعد</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => setIsBookingOpen(false)}
                          className="flex-1 bg-medical-primary hover:bg-medical-dark text-white"
                        >
                          تم
                        </Button>
                        <Link to="/appointments" className="flex-1">
                          <Button
                            variant="outline"
                            className="border-medical-primary text-medical-primary hover:bg-medical-light w-full"
                          >
                            عرض مواعيدي
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="medical-container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="about">
              <TabsList className="w-full border-b">
                <TabsTrigger value="about" className="flex-1">نبذة عن الطبيب</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">التقييمات</TabsTrigger>
                <TabsTrigger value="location" className="flex-1">العنوان</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="pt-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-4">نبذة عن {doctor.nameAr}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{doctor.bioAr}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start">
                        <Award className="h-5 w-5 text-medical-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">الخبرة</h3>
                          <p className="text-gray-600">{doctor.experience} سنة</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Star className="h-5 w-5 text-medical-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">التقييم</h3>
                          <p className="text-gray-600">{doctor.rating} من 5 ({doctor.reviewCount} تقييم)</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-medical-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">أيام العمل</h3>
                          <p className="text-gray-600">
                            {doctor.availableDays.map(day => 
                              day === 'Sunday' ? 'الأحد' :
                              day === 'Monday' ? 'الإثنين' :
                              day === 'Tuesday' ? 'الثلاثاء' :
                              day === 'Wednesday' ? 'الأربعاء' :
                              day === 'Thursday' ? 'الخميس' :
                              day === 'Friday' ? 'الجمعة' :
                              'السبت'
                            ).join('، ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 text-medical-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">اللغات</h3>
                          <p className="text-gray-600">
                            {doctor.languages.map(lang => 
                              lang === 'Arabic' ? 'العربية' :
                              lang === 'English' ? 'الإنجليزية' :
                              'الكردية'
                            ).join('، ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-4">المؤهلات التعليمية</h2>
                    <div className="space-y-4">
                      {doctor.education.map((edu, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 w-5 h-5 rounded-full bg-medical-primary relative mt-1">
                            <div className="h-full w-0.5 bg-gray-200 absolute top-5 left-1/2 transform -translate-x-1/2"></div>
                          </div>
                          <div className={index === doctor.education.length - 1 ? "" : "pb-6"}>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-gray-500 text-sm">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">التقييمات والمراجعات</h2>
                    <Button variant="outline" className="border-medical-primary text-medical-primary">
                      إضافة تقييم
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 mb-2">{doctor.rating}</div>
                          <div className="flex justify-center text-amber-500 mb-1">
                            {'★'.repeat(Math.floor(doctor.rating))}
                            {'☆'.repeat(5 - Math.floor(doctor.rating))}
                          </div>
                          <p className="text-gray-500">{doctor.reviewCount} تقييم</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((num) => {
                            // Calculate percentage based on rating
                            const percentage = num === 5 ? 65 : 
                                             num === 4 ? 25 : 
                                             num === 3 ? 8 : 
                                             num === 2 ? 2 : 0;
                            
                            return (
                              <div key={num} className="flex items-center">
                                <div className="flex items-center w-16">
                                  <span className="text-sm mr-1">{num}</span>
                                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                </div>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                                  <div
                                    className="h-2 bg-amber-500 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="w-10 text-right text-sm text-gray-500">
                                  {percentage}%
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{review.name}</h3>
                            <div className="flex items-center">
                              <div className="flex text-amber-500 mr-2">
                                {'★'.repeat(review.rating)}
                                {'☆'.repeat(5 - review.rating)}
                              </div>
                              <span className="text-gray-500 text-sm">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                    
                    <div className="text-center">
                      <Button variant="outline">
                        عرض المزيد من التقييمات
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">عنوان العيادة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-start mb-4">
                          <MapPin className="h-5 w-5 text-medical-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold mb-1">{doctor.hospitalAr}</h3>
                            <p className="text-gray-600">{doctor.addressAr}، {doctor.cityAr}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start mb-4">
                          <Phone className="h-5 w-5 text-medical-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold mb-1">رقم الهاتف</h3>
                            <p className="text-gray-600">{doctor.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-medical-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                            <p className="text-gray-600">{doctor.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                        {/* Placeholder for map */}
                        <div className="text-center">
                          <MapPin className="h-10 w-10 text-medical-primary mx-auto mb-2" />
                          <p className="text-gray-600">خريطة العيادة</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">حجز موعد سريع</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">رسوم الكشف:</span>
                    <span className="font-bold text-gray-900">{doctor.price.toLocaleString()} د.ع</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">مدة الكشف:</span>
                    <span className="text-gray-900">30 دقيقة</span>
                  </div>
                  <div className="pt-4">
                    <Button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      حجز موعد
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">المجالات الطبية</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-50 text-medical-primary px-2 py-1 rounded-full">
                    جراحة القلب
                  </span>
                  <span className="text-xs bg-blue-50 text-medical-primary px-2 py-1 rounded-full">
                    قسطرة القلب
                  </span>
                  <span className="text-xs bg-blue-50 text-medical-primary px-2 py-1 rounded-full">
                    تصوير القلب
                  </span>
                  <span className="text-xs bg-blue-50 text-medical-primary px-2 py-1 rounded-full">
                    تشخيص أمراض القلب
                  </span>
                  <span className="text-xs bg-blue-50 text-medical-primary px-2 py-1 rounded-full">
                    علاج ارتفاع ضغط الدم
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">أطباء مشابهون</h3>
                <div className="space-y-4">
                  {doctors
                    .filter(d => d.specialty === doctor.specialty && d.id !== doctor.id)
                    .slice(0, 3)
                    .map(d => (
                      <Link key={d.id} to={`/doctors/${d.id}`}>
                        <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <img
                            src={d.image}
                            alt={d.nameAr}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{d.nameAr}</h4>
                            <p className="text-sm text-gray-600">{d.specialtyAr}</p>
                          </div>
                          <ChevronLeft className="h-5 w-5 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorDetails;
