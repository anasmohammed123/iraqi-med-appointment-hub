
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  BadgePercent,
  Clock,
  Phone,
  Building,
  Share2,
  ArrowLeft,
  Check,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for promos
const promos = [
  {
    id: "1",
    title: "خصم 30٪ على الفحص الأولي",
    titleEn: "30% Off Initial Check-up",
    description: "عرض خاص للمرضى الجدد. يشمل الفحص الطبي الكامل والتحاليل الأساسية",
    hospital: "مستشفى ابن سينا",
    hospitalEn: "Ibn Sina Hospital",
    validUntil: "2025-06-30",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    discount: 30,
    city: "بغداد",
    cityEn: "Baghdad",
    originalPrice: 75000,
    discountedPrice: 52500,
    category: "فحص عام",
    categoryEn: "General Check-up",
    terms: [
      "العرض ساري للمرضى الجدد فقط",
      "يجب حجز موعد مسبقاً",
      "العرض غير قابل للتحويل أو الاسترداد",
      "لا يمكن الجمع بين هذا العرض وأي عروض أخرى",
      "العرض صالح حتى 30 يونيو 2025"
    ],
    fullDescription: `هذا العرض مخصص للمرضى الجدد الذين يزورون مستشفى ابن سينا للمرة الأولى. يهدف العرض إلى تشجيع الأفراد على إجراء الفحوصات الطبية الدورية للاطمئنان على صحتهم.

يشمل الفحص الأولي:
- مقابلة شاملة مع طبيب عام
- فحص للعلامات الحيوية (ضغط الدم، النبض، درجة الحرارة، معدل التنفس)
- تحليل دم أساسي (صورة دم كاملة، وظائف الكبد والكلى، نسبة السكر في الدم)
- فحص البول الروتيني
- تخطيط كهربائية القلب (ECG)

بعد إجراء الفحوصات، سيقوم الطبيب بمراجعة النتائج معك وتقديم توصيات للحفاظ على صحتك، وإذا لزم الأمر، إحالتك إلى أخصائيين للمتابعة.

السعر الأصلي للفحص الأولي هو 75,000 دينار عراقي، ومع الخصم البالغ 30%، سيكون السعر 52,500 دينار عراقي فقط.`,
    hospitalAddress: "شارع السعدون، بغداد",
    hospitalPhone: "+964 771 123 4567",
    hospitalWorkingHours: "8:00 صباحاً - 8:00 مساءً",
    availableSlots: [
      { date: "2023-05-20", slots: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"] },
      { date: "2023-05-21", slots: ["10:00 AM", "1:00 PM", "3:30 PM"] },
      { date: "2023-05-22", slots: ["9:00 AM", "12:00 PM", "2:30 PM", "5:00 PM"] }
    ],
    includes: [
      "فحص طبي شامل",
      "تحاليل الدم الأساسية",
      "فحص البول",
      "تخطيط القلب",
      "استشارة طبية"
    ],
    excludes: [
      "الفحوصات المتخصصة الإضافية",
      "الأشعة السينية أو المقطعية",
      "العلاجات والأدوية",
      "المتابعات اللاحقة مع متخصصين"
    ]
  },
  {
    id: "2",
    title: "فحص الأسنان المجاني",
    titleEn: "Free Dental Checkup",
    description: "احصل على فحص أسنان مجاني مع تنظيف الأسنان بنصف السعر",
    hospital: "مركز بغداد لطب الأسنان",
    hospitalEn: "Baghdad Dental Center",
    validUntil: "2025-07-15",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    discount: 100,
    city: "بغداد",
    cityEn: "Baghdad",
    originalPrice: 35000,
    discountedPrice: 0,
    category: "طب الأسنان",
    categoryEn: "Dentistry",
    terms: [
      "يشمل العرض فحص الأسنان المجاني فقط",
      "تنظيف الأسنان بخصم 50%",
      "يستثنى من العرض أي علاجات أخرى",
      "يجب حجز موعد مسبقاً",
      "العرض صالح حتى 15 يوليو 2025"
    ],
    fullDescription: `يقدم مركز بغداد لطب الأسنان فحصاً مجانياً للأسنان لجميع المرضى الجدد والحاليين. هذا الفحص يساعد على الكشف المبكر عن مشاكل الأسنان والوقاية من تفاقمها.

يشمل الفحص المجاني:
- فحص شامل للأسنان واللثة
- صور شعاعية أساسية (إذا لزم الأمر)
- تقييم لصحة الفم
- خطة علاجية مقترحة

بالإضافة إلى ذلك، يمكنك الحصول على خدمة تنظيف الأسنان الاحترافي بخصم 50% عند طلبها مع الفحص المجاني. التنظيف المنتظم للأسنان ضروري لإزالة البلاك والجير ومنع تسوس الأسنان وأمراض اللثة.

لا تفوت هذه الفرصة للاطمئنان على صحة أسنانك!`,
    hospitalAddress: "شارع السعدون، بغداد",
    hospitalPhone: "+964 771 234 5678",
    hospitalWorkingHours: "9:00 صباحاً - 7:00 مساءً",
    availableSlots: [
      { date: "2023-05-20", slots: ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"] },
      { date: "2023-05-21", slots: ["9:30 AM", "1:30 PM", "4:00 PM"] },
      { date: "2023-05-22", slots: ["11:00 AM", "2:00 PM", "4:00 PM"] }
    ],
    includes: [
      "فحص شامل للأسنان",
      "صور شعاعية أساسية (عند الحاجة)",
      "تقييم صحة الفم",
      "خطة علاجية"
    ],
    excludes: [
      "تنظيف الأسنان (متاح بخصم 50%)",
      "علاجات تجميل الأسنان",
      "حشوات الأسنان",
      "خلع الأسنان",
      "علاج قنوات الجذور"
    ]
  }
];

// Format date to Arabic format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const PromoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the promo based on ID parameter
  const promo = promos.find(promo => promo.id === id);
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Share promo
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط العرض إلى الحافظة.",
        });
      })
      .catch(() => {
        toast({
          title: "فشل النسخ",
          description: "حدث خطأ أثناء نسخ الرابط.",
          variant: "destructive",
        });
      });
  };

  // Book appointment
  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم حجز موعدك بنجاح",
      description: `تم حجز موعدك في ${selectedDate} الساعة ${selectedTime}. سنتواصل معك قريباً لتأكيد الحجز.`,
    });
  };

  // If promo not found, show error
  if (!promo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">العرض غير موجود</h1>
            <p className="mb-6">عذراً، لم يتم العثور على العرض المطلوب.</p>
            <Link to="/promos">
              <Button>العودة إلى العروض</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Promo Hero Section */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link to="/promos" className="flex items-center text-gray-600 hover:text-medical-primary">
              <ArrowLeft className="h-4 w-4 ml-1" />
              العودة للعروض
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover rounded-lg"
                style={{ maxHeight: '400px' }}
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-medical-primary text-white text-lg py-1.5">
                  خصم {promo.discount}%
                </Badge>
              </div>
            </div>
            
            <div>
              <Badge variant="outline" className="mb-3">
                {promo.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{promo.title}</h1>
              
              <div className="text-gray-600 mb-6">
                {promo.description}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <div className="text-gray-500 line-through text-lg">
                    {promo.originalPrice.toLocaleString()} د.ع
                  </div>
                  <div className="text-2xl font-bold text-medical-primary">
                    {promo.discountedPrice.toLocaleString()} د.ع
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                        <CalendarDays className="h-4 w-4 ml-2" />
                        حجز موعد الآن
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>حجز موعد - {promo.title}</DialogTitle>
                        <DialogDescription>
                          يرجى ملء النموذج التالي لحجز موعد للاستفادة من هذا العرض
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleBookAppointment} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              الاسم الكامل
                            </label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">
                              رقم الهاتف
                            </label>
                            <Input
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              البريد الإلكتروني
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium">
                              اختر التاريخ
                            </label>
                            <select
                              id="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              required
                            >
                              <option value="">-- اختر التاريخ --</option>
                              {promo.availableSlots?.map((slot) => (
                                <option key={slot.date} value={slot.date}>
                                  {new Date(slot.date).toLocaleDateString('ar-IQ')}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {selectedDate && (
                            <div className="space-y-2">
                              <label htmlFor="time" className="text-sm font-medium">
                                اختر الوقت
                              </label>
                              <select
                                id="time"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                              >
                                <option value="">-- اختر الوقت --</option>
                                {promo.availableSlots
                                  ?.find((slot) => slot.date === selectedDate)
                                  ?.slots.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          )}
                        </div>
                        
                        <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                          تأكيد الحجز
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" className="mr-2" onClick={handleShare}>
                    <Share2 className="h-4 w-4 ml-2" />
                    مشاركة
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 ml-2" />
                  <span>{promo.hospital}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 ml-2" />
                  <span>{promo.hospitalAddress}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 ml-2" />
                  <span>{promo.hospitalPhone}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{promo.hospitalWorkingHours}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>ساري حتى: {formatDate(promo.validUntil)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Promo Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">تفاصيل العرض</h2>
                  <div className="prose max-w-none">
                    {promo.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">يشمل العرض</h3>
                    <ul className="space-y-2">
                      {promo.includes?.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-medical-primary mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">لا يشمل العرض</h3>
                    <ul className="space-y-2">
                      {promo.excludes?.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">شروط وأحكام العرض</h2>
                <ul className="space-y-3">
                  {promo.terms.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-medical-primary font-bold ml-2 mt-0.5">{index + 1}.</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">ملخص العرض</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">السعر الأصلي</span>
                    <span className="line-through">{promo.originalPrice.toLocaleString()} د.ع</span>
                  </div>
                  
                  <div className="flex justify-between text-medical-primary font-semibold">
                    <span>الخصم</span>
                    <span>{promo.discount}%</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>السعر النهائي</span>
                    <span>{promo.discountedPrice.toLocaleString()} د.ع</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-gray-600">
                    <span>تاريخ الانتهاء</span>
                    <span>{formatDate(promo.validUntil)}</span>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-medical-primary hover:bg-medical-dark text-white">
                      حجز موعد الآن
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>حجز موعد - {promo.title}</DialogTitle>
                      <DialogDescription>
                        يرجى ملء النموذج التالي لحجز موعد للاستفادة من هذا العرض
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleBookAppointment} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name-sidebar" className="text-sm font-medium">
                            الاسم الكامل
                          </label>
                          <Input
                            id="name-sidebar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="phone-sidebar" className="text-sm font-medium">
                            رقم الهاتف
                          </label>
                          <Input
                            id="phone-sidebar"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email-sidebar" className="text-sm font-medium">
                            البريد الإلكتروني
                          </label>
                          <Input
                            id="email-sidebar"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="date-sidebar" className="text-sm font-medium">
                            اختر التاريخ
                          </label>
                          <select
                            id="date-sidebar"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="">-- اختر التاريخ --</option>
                            {promo.availableSlots?.map((slot) => (
                              <option key={slot.date} value={slot.date}>
                                {new Date(slot.date).toLocaleDateString('ar-IQ')}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {selectedDate && (
                          <div className="space-y-2">
                            <label htmlFor="time-sidebar" className="text-sm font-medium">
                              اختر الوقت
                            </label>
                            <select
                              id="time-sidebar"
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              required
                            >
                              <option value="">-- اختر الوقت --</option>
                              {promo.availableSlots
                                ?.find((slot) => slot.date === selectedDate)
                                ?.slots.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                            </select>
                          </div>
                        )}
                      </div>
                      
                      <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                        تأكيد الحجز
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">معلومات المستشفى</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 ml-2 text-medical-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">المستشفى</h4>
                      <p className="text-gray-600">{promo.hospital}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 ml-2 text-medical-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">العنوان</h4>
                      <p className="text-gray-600">{promo.hospitalAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 ml-2 text-medical-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">رقم الهاتف</h4>
                      <p className="text-gray-600">{promo.hospitalPhone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 ml-2 text-medical-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">ساعات العمل</h4>
                      <p className="text-gray-600">{promo.hospitalWorkingHours}</p>
                    </div>
                  </div>
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

export default PromoDetails;
