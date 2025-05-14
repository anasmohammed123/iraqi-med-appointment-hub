
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Select } from "@/components/ui/select";
import { SearchHeroForm } from "@/components/SearchHeroForm";
import { SpecialtiesSection } from "@/components/SpecialtiesSection";
import { HospitalsCarousel } from "@/components/HospitalsCarousel";
import { FeaturedDoctors } from "@/components/FeaturedDoctors";
import { OffersSection } from "@/components/OffersSection";
import { AppPromoSection } from "@/components/AppPromoSection";
import { FAQSection } from "@/components/FAQSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Star, MapPin, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Define the data required for the page
  const [topSpecialties, setTopSpecialties] = useState([
    { id: 1, name: "القلب", count: 120, icon: "❤️" },
    { id: 2, name: "العيون", count: 90, icon: "👁️" },
    { id: 3, name: "الأطفال", count: 80, icon: "👶" },
    { id: 4, name: "الجلدية", count: 70, icon: "🧬" },
    { id: 5, name: "العظام", count: 65, icon: "🦴" },
    { id: 6, name: "النسائية", count: 60, icon: "👩" },
    { id: 7, name: "الأسنان", count: 55, icon: "🦷" },
    { id: 8, name: "الأذن والأنف والحنجرة", count: 50, icon: "👂" },
  ]);

  const [featuredDoctors, setFeaturedDoctors] = useState([
    { id: 1, name: "د. أحمد", specialty: "قلب", rating: 4.9, reviews: 120, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+أحمد" },
    { id: 2, name: "د. فاطمة", specialty: "عيون", rating: 4.8, reviews: 98, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+فاطمة" },
    { id: 3, name: "د. علي", specialty: "أطفال", rating: 4.7, reviews: 87, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+علي" },
    { id: 4, name: "د. سارة", specialty: "جلدية", rating: 4.9, reviews: 110, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+سارة" },
    { id: 5, name: "د. محمد", specialty: "عظام", rating: 4.6, reviews: 79, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+محمد" },
    { id: 6, name: "د. زينب", specialty: "نسائية", rating: 4.8, reviews: 95, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+زينب" },
    { id: 7, name: "د. حسن", specialty: "أسنان", rating: 4.7, reviews: 82, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+حسن" },
    { id: 8, name: "د. ليلى", specialty: "جلدية", rating: 4.8, reviews: 90, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+ليلى" },
    { id: 9, name: "د. خالد", specialty: "قلب", rating: 4.9, reviews: 115, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+خالد" },
    { id: 10, name: "د. نور", specialty: "عيون", rating: 4.7, reviews: 85, imageUrl: "https://placehold.co/150x150/8B5CF6/FFFFFF?text=د.+نور" },
  ]);

  const [hospitals, setHospitals] = useState([
    { 
      id: 1, 
      name: "مستشفى الأمل", 
      doctors: 45, 
      address: "شارع الرشيد، بغداد", 
      hours: "24 ساعة", 
      imageUrl: "https://placehold.co/300x200/1E88E5/FFFFFF?text=مستشفى+الأمل" 
    },
    { 
      id: 2, 
      name: "مستشفى الشفاء", 
      doctors: 38, 
      address: "شارع فلسطين، بغداد", 
      hours: "8 صباحًا - 10 مساءً", 
      imageUrl: "https://placehold.co/300x200/1E88E5/FFFFFF?text=مستشفى+الشفاء" 
    },
    { 
      id: 3, 
      name: "مستشفى النور", 
      doctors: 42, 
      address: "المنصور، بغداد", 
      hours: "24 ساعة", 
      imageUrl: "https://placehold.co/300x200/1E88E5/FFFFFF?text=مستشفى+النور" 
    },
    { 
      id: 4, 
      name: "مستشفى الرحمة", 
      doctors: 30, 
      address: "الكرادة، بغداد", 
      hours: "8 صباحًا - 8 مساءً", 
      imageUrl: "https://placehold.co/300x200/1E88E5/FFFFFF?text=مستشفى+الرحمة" 
    },
    { 
      id: 5, 
      name: "مستشفى الحياة", 
      doctors: 52, 
      address: "الأعظمية، بغداد", 
      hours: "24 ساعة", 
      imageUrl: "https://placehold.co/300x200/1E88E5/FFFFFF?text=مستشفى+الحياة" 
    },
    { 
      id: 6, 
      name: "مستشفى السلام", 
      doctors: 35, 
      address: "الكاظمية، بغداد", 
      hours: "7 صباحًا - 11 مساءً", 
      imageUrl: "https://placehold.co/300x200/1E88E5/FFFFFF?text=مستشفى+السلام" 
    },
    { 
      id: 7, 
      name: "مستشفى الياسمين", 
      doctors: 28, 
      address: "زيونة، بغداد", 
      hours: "8 صباحًا - 9 مساءً", 
      imageUrl: "https://placehold.co/300x200/1E88E5/FFFFFF?text=مستشفى+الياسمين" 
    },
  ]);

  const [promos, setPromos] = useState([
    { 
      id: 1, 
      title: "عرض الصيف", 
      description: "خصم 20% على جميع الفحوصات", 
      endDate: "31/08/2025", 
      images: [
        "https://placehold.co/300x200/4CAF50/FFFFFF?text=عرض+الصيف+1",
        "https://placehold.co/300x200/4CAF50/FFFFFF?text=عرض+الصيف+2",
        "https://placehold.co/300x200/4CAF50/FFFFFF?text=عرض+الصيف+3"
      ]
    },
    { 
      id: 2, 
      title: "عرض الشتاء", 
      description: "فحص مجاني للسكري", 
      endDate: "15/12/2025", 
      images: [
        "https://placehold.co/300x200/F97316/FFFFFF?text=عرض+الشتاء+1",
        "https://placehold.co/300x200/F97316/FFFFFF?text=عرض+الشتاء+2"
      ]
    },
    { 
      id: 3, 
      title: "عرض رمضان", 
      description: "استشارات مجانية طوال الشهر", 
      endDate: "01/04/2026", 
      images: [
        "https://placehold.co/300x200/D946EF/FFFFFF?text=عرض+رمضان+1",
        "https://placehold.co/300x200/D946EF/FFFFFF?text=عرض+رمضان+2",
        "https://placehold.co/300x200/D946EF/FFFFFF?text=عرض+رمضان+3"
      ]
    },
    { 
      id: 4, 
      title: "عرض العيد", 
      description: "خصومات حتى 30% على خدمات الأسنان", 
      endDate: "10/05/2026", 
      images: [
        "https://placehold.co/300x200/0EA5E9/FFFFFF?text=عرض+العيد+1",
        "https://placehold.co/300x200/0EA5E9/FFFFFF?text=عرض+العيد+2"
      ]
    },
  ]);

  const [faqs, setFaqs] = useState([
    {
      question: "كيف يمكنني حجز موعد مع طبيب؟",
      answer: "يمكنك حجز موعد مع طبيب عن طريق البحث عن الطبيب المناسب، ثم اختيار التاريخ والوقت المناسبين، وتأكيد الحجز بعد إدخال بياناتك الشخصية."
    },
    {
      question: "هل يمكنني إلغاء الموعد؟",
      answer: "نعم، يمكنك إلغاء الموعد قبل 24 ساعة على الأقل من الموعد المحدد دون أي رسوم إضافية."
    },
    {
      question: "كيف يمكنني الدفع مقابل الاستشارة؟",
      answer: "يمكنك الدفع باستخدام بطاقة الائتمان، أو الدفع النقدي عند الوصول، أو استخدام تطبيق الهاتف المحمول للدفع."
    },
    {
      question: "هل يمكنني تقييم الطبيب بعد الزيارة؟",
      answer: "نعم، يمكنك تقييم الطبيب وترك تعليقك بعد الزيارة من خلال حسابك على المنصة."
    },
    {
      question: "كيف أحصل على الدعم الفني؟",
      answer: "يمكنك الحصول على الدعم الفني عن طريق الاتصال بنا على الرقم المجاني، أو إرسال رسالة عبر نموذج الاتصال في الموقع."
    },
    {
      question: "ماذا لو تأخر الطبيب؟",
      answer: "إذا تأخر الطبيب لأكثر من 15 دقيقة، سيتم إعلامك عبر رسالة نصية، ويمكنك اختيار الانتظار أو إعادة جدولة الموعد مجاناً."
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col dir-rtl">
      <Navbar />
      
      {/* Hero Section with Search Form */}
      <section className="bg-gradient-to-r from-medical-primary to-medical-dark text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              ابحث عن أفضل الأطباء واحجز موعدك بكل سهولة
            </h1>
            <p className="text-lg mb-8 text-white/90">
              منصة الطب العراقية تساعدك في العثور على الأطباء المناسبين وحجز المواعيد بكل يسر وسهولة.
            </p>
            
            <SearchHeroForm />
          </div>
        </div>
      </section>
      
      {/* Specialties Section */}
      <SpecialtiesSection specialties={topSpecialties} />
      
      {/* Hospitals Section */}
      <HospitalsCarousel hospitals={hospitals} />
      
      {/* Featured Doctors Section */}
      <FeaturedDoctors doctors={featuredDoctors} />
      
      {/* Promos Section */}
      <OffersSection offers={promos} />
      
      {/* App Promo Section */}
      <AppPromoSection />
      
      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-primary to-medical-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">هل أنت طبيب؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            انضم إلى شبكة الأطباء الخاصة بنا، وقم بتوسيع نطاق ممارستك، وأدِر جدولك بكفاءة، واتصل بالمزيد من المرضى.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/doctor-register">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-primary">
                انضم كطبيب
              </Button>
            </Link>
            <Link to="/doctor-login">
              <Button className="bg-white text-medical-primary hover:bg-gray-100">
                تسجيل دخول الأطباء
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
