import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState([
    { id: 1, name: "د. أحمد", specialty: "قلب", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "د. فاطمة", specialty: "عيون", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "د. علي", specialty: "أطفال", imageUrl: "https://via.placeholder.com/150" },
    { id: 4, name: "د. سارة", specialty: "جلدية", imageUrl: "https://via.placeholder.com/150" },
  ]);

  const [hospitals, setHospitals] = useState([
    { id: 1, name: "مستشفى الأمل", imageUrl: "https://via.placeholder.com/300x200" },
    { id: 2, name: "مستشفى الشفاء", imageUrl: "https://via.placeholder.com/300x200" },
    { id: 3, name: "مستشفى النور", imageUrl: "https://via.placeholder.com/300x200" },
  ]);

  const [promos, setPromos] = useState([
    { id: 1, title: "عرض الصيف", description: "خصم 20% على جميع الفحوصات", imageUrl: "https://via.placeholder.com/300x100" },
    { id: 2, title: "عرض الشتاء", description: "فحص مجاني للسكري", imageUrl: "https://via.placeholder.com/300x100" },
  ]);

  const [articles, setArticles] = useState([
    { id: 1, title: "أهمية الفحص الدوري", imageUrl: "https://via.placeholder.com/200x150" },
    { id: 2, title: "نصائح للحفاظ على صحة القلب", imageUrl: "https://via.placeholder.com/200x150" },
  ]);

  const [topSpecialties, setTopSpecialties] = useState([
    { id: 1, name: "القلب", count: 120 },
    { id: 2, name: "العيون", count: 90 },
    { id: 3, name: "الأطفال", count: 80 },
    { id: 4, name: "الجلدية", count: 70 },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                ابحث عن أفضل الأطباء واحجز موعدك بكل سهولة
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                منصة الطب العراقية تساعدك في العثور على الأطباء المناسبين وحجز المواعيد بكل يسر وسهولة.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link to="/doctors">
                  <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                    ابحث عن طبيب
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Doctors"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <i className="fas fa-search text-4xl text-medical-primary mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ابحث بسهولة
              </h3>
              <p className="text-gray-600">
                ابحث عن الأطباء حسب التخصص والمنطقة والمزيد.
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-calendar-alt text-4xl text-medical-primary mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                احجز موعدك
              </h3>
              <p className="text-gray-600">
                احجز موعدك مع الطبيب المناسب بكل سهولة ويسر.
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-heart text-4xl text-medical-primary mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                اعتني بصحتك
              </h3>
              <p className="text-gray-600">
                نحن هنا لمساعدتك في الحفاظ على صحتك وعافيتك.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Doctors - Horizontal Scroll */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            أطباء متميزون
          </h2>
          <ScrollArea className="snap-x snap-mandatory touch-pan-x overflow-x-scroll">
            <div className="flex space-x-4 py-4">
              {featuredDoctors.map((doctor) => (
                <Card key={doctor.id} className="w-64 snap-start">
                  <Link to={`/doctors/${doctor.id}`}>
                    <CardContent className="p-4">
                      <AspectRatio ratio={1 / 1} className="mb-4">
                        <img
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          className="rounded-md object-cover"
                        />
                      </AspectRatio>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>
      
      {/* Hospitals Section - New */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">المستشفيات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <div key={hospital.id} className="rounded-lg shadow-md overflow-hidden">
                <Link to={`/hospitals/${hospital.id}`}>
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={hospital.imageUrl}
                      alt={hospital.name}
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{hospital.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promos Section - New */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">العروض</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promos.map((promo) => (
              <div key={promo.id} className="rounded-lg shadow-md overflow-hidden">
                <Link to={`/promos/${promo.id}`}>
                  <AspectRatio ratio={3 / 1}>
                    <img
                      src={promo.imageUrl}
                      alt={promo.title}
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{promo.title}</h3>
                    <p className="text-gray-600">{promo.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Articles Section - New */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">المقالات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="rounded-lg shadow-md overflow-hidden">
                <Link to={`/articles/${article.id}`}>
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Specialties */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            أكثر التخصصات طلباً
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSpecialties.map((specialty) => (
              <div key={specialty.id} className="text-center">
                <Badge className="bg-medical-primary text-white rounded-full px-3 py-1">
                  {specialty.name}
                </Badge>
                <p className="text-gray-600 mt-2">
                  {specialty.count} طبيب
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
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
