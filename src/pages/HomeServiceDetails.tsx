
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LazyImage } from "@/components/ui/lazy-image";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Home, Clock, Phone, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Home service interface
interface HomeService {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  longDescription?: string;
  longDescriptionAr?: string;
  icon: string;
  image: string;
  price: number;
  category: string;
  categoryAr: string;
  benefits?: string[];
  benefitsAr?: string[];
  faqs?: { question: string; questionAr: string; answer: string; answerAr: string }[];
}

// Mock data for a single home service
const mockHomeServices: HomeService[] = [
  {
    id: "1",
    title: "Nursing Care",
    titleAr: "رعاية تمريضية",
    description: "Professional nursing care at home for patients with various needs",
    descriptionAr: "رعاية تمريضية احترافية في المنزل للمرضى ذوي الاحتياجات المختلفة",
    longDescriptionAr: "تقدم خدمة الرعاية التمريضية المنزلية فريقًا من الممرضين المؤهلين والمرخصين لتقديم رعاية عالية الجودة للمرضى في راحة منازلهم. يتم تخصيص الخدمات حسب احتياجات كل مريض، بدءًا من المساعدة في الأنشطة اليومية وحتى الإجراءات التمريضية المعقدة. يعمل فريقنا تحت إشراف طبي كامل لضمان تقديم أفضل مستويات الرعاية.",
    icon: "nurse",
    image: "/placeholder.svg",
    price: 25000,
    category: "Nursing",
    categoryAr: "تمريض",
    benefitsAr: [
      "رعاية شخصية مخصصة",
      "طاقم تمريضي مؤهل ومرخص",
      "إشراف طبي مستمر",
      "متابعة الحالة وتقديم تقارير دورية",
      "خدمة متاحة على مدار 24 ساعة"
    ],
    faqs: [
      {
        question: "How long can the nurse stay at my home?",
        questionAr: "كم من الوقت يمكن للممرض البقاء في منزلي؟",
        answer: "We offer flexible durations from hourly care to 24/7 care based on your needs.",
        answerAr: "نقدم مدد زمنية مرنة من رعاية بالساعة إلى رعاية على مدار 24 ساعة بناءً على احتياجاتك."
      },
      {
        question: "What qualifications do your nurses have?",
        questionAr: "ما هي مؤهلات الممرضين لديكم؟",
        answer: "All our nurses are licensed professionals with at least 3 years of experience.",
        answerAr: "جميع ممرضينا هم مهنيون مرخصون ولديهم خبرة لا تقل عن 3 سنوات."
      },
      {
        question: "Is there a minimum service duration?",
        questionAr: "هل هناك حد أدنى لمدة الخدمة؟",
        answer: "The minimum service duration is 2 hours per visit.",
        answerAr: "الحد الأدنى لمدة الخدمة هو ساعتان لكل زيارة."
      }
    ]
  },
  {
    id: "2",
    title: "Physiotherapy",
    titleAr: "علاج طبيعي",
    description: "Rehabilitation services with certified physiotherapists at your home",
    descriptionAr: "خدمات إعادة التأهيل مع معالجين طبيعيين معتمدين في منزلك",
    longDescriptionAr: "خدمة العلاج الطبيعي المنزلية توفر جلسات إعادة تأهيل متخصصة يقدمها معالجون طبيعيون ذوو خبرة عالية. تهدف الخدمة إلى مساعدة المرضى على استعادة قدراتهم الحركية وتخفيف الألم وتحسين نوعية الحياة. يتم تصميم برنامج علاجي فردي لكل مريض بناءً على حالته واحتياجاته الخاصة.",
    icon: "activity",
    image: "/placeholder.svg",
    price: 35000,
    category: "Therapy",
    categoryAr: "علاج",
    benefitsAr: [
      "جلسات علاج مخصصة حسب الحالة",
      "معالجون طبيعيون معتمدون",
      "متابعة التقدم بشكل منتظم",
      "توفير تمارين منزلية للمتابعة",
      "تقارير طبية دورية"
    ],
    faqs: [
      {
        question: "How many sessions will I need?",
        questionAr: "كم عدد الجلسات التي سأحتاجها؟",
        answer: "The number of sessions depends on your condition and will be determined after the initial assessment.",
        answerAr: "يعتمد عدد الجلسات على حالتك وسيتم تحديده بعد التقييم الأولي."
      },
      {
        question: "Do I need a doctor's referral?",
        questionAr: "هل أحتاج إلى إحالة من الطبيب؟",
        answer: "While recommended, it's not always necessary. Our physiotherapist can assess your condition directly.",
        answerAr: "على الرغم من أنها مستحسنة، إلا أنها ليست ضرورية دائمًا. يمكن لأخصائي العلاج الطبيعي لدينا تقييم حالتك مباشرة."
      }
    ]
  }
];

const HomeServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<HomeService | null>(null);
  
  // Form state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Available times for selection
  const availableTimes = ["9:00 ص", "10:00 ص", "11:00 ص", "12:00 م", "1:00 م", "2:00 م", "3:00 م", "4:00 م", "5:00 م", "6:00 م"];

  useEffect(() => {
    // Simulate loading service details
    const loadServiceDetails = () => {
      setIsLoading(true);
      setTimeout(() => {
        const found = mockHomeServices.find(s => s.id === id);
        if (found) {
          setService(found);
        } else {
          navigate("/home-services", { replace: true });
        }
        setIsLoading(false);
      }, 1000);
    };

    loadServiceDetails();
  }, [id, navigate]);

  const handleBookService = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!date || !time || !address || !phone) {
      toast({
        title: "يرجى إكمال جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form (in a real app, this would be an API call)
    toast({
      title: "تم حجز الخدمة بنجاح",
      description: `سيقوم فريقنا بالتواصل معك قريبًا لتأكيد الحجز ليوم ${date} الساعة ${time}`,
    });
    
    // Reset form
    setDate("");
    setTime("");
    setAddress("");
    setPhone("");
    setNotes("");
  };

  if (isLoading) {
    return (
      <PageLayout>
        <PageLoader />
      </PageLayout>
    );
  }

  if (!service) {
    return (
      <PageLayout>
        <div className="container mx-auto py-12 px-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">الخدمة غير موجودة</h1>
          <p className="mb-6">لم يتم العثور على الخدمة المطلوبة</p>
          <Button onClick={() => navigate("/home-services")}>العودة إلى صفحة الخدمات</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content - 2/3 width */}
          <div className="md:col-span-2">
            <AspectRatio ratio={16 / 9} className="mb-6">
              <LazyImage
                src={service.image}
                alt={service.titleAr}
                className="rounded-lg w-full h-full object-cover"
              />
            </AspectRatio>
            
            <h1 className="text-3xl font-bold mb-2">{service.titleAr}</h1>
            
            <div className="flex gap-2 mb-6">
              <Badge className="bg-medical-primary">{service.categoryAr}</Badge>
              <Badge variant="outline">{service.price.toLocaleString()} د.ع</Badge>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p className="text-lg">{service.descriptionAr}</p>
              {service.longDescriptionAr && <p>{service.longDescriptionAr}</p>}
            </div>
            
            {service.benefitsAr && service.benefitsAr.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">مميزات الخدمة</h2>
                <ul className="space-y-2">
                  {service.benefitsAr.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-medical-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {service.faqs && service.faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">أسئلة شائعة</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <h3 className="font-bold text-lg mb-2">{faq.questionAr}</h3>
                        <p className="text-gray-600">{faq.answerAr}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Booking form - 1/3 width */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6 text-center">حجز الخدمة</h2>
                
                <form onSubmit={handleBookService} className="space-y-4">
                  <div>
                    <Label htmlFor="date">التاريخ</Label>
                    <div className="flex items-center mt-1.5">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="time">الوقت</Label>
                    <div className="flex items-center mt-1.5">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <Select value={time} onValueChange={setTime} required>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">العنوان</Label>
                    <div className="flex items-center mt-1.5">
                      <Home className="h-4 w-4 mr-2 text-gray-500" />
                      <Textarea
                        id="address"
                        placeholder="أدخل العنوان بالتفصيل"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="flex items-center mt-1.5">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="رقم الهاتف للتواصل"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                    <Textarea
                      id="notes"
                      placeholder="أي تفاصيل إضافية تود إخبارنا بها"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full">
                      تأكيد الحجز
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    سعر الخدمة: <span className="font-bold">{service.price.toLocaleString()} د.ع</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    * قد تختلف الأسعار بناءً على المدة والخدمات الإضافية
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomeServiceDetails;
