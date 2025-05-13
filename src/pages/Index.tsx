
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, CheckSquare, BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors, specialties, iraqiCities } from "@/data/mockData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would perform a search with the selected filters
    console.log("Searching with:", { searchTerm, selectedSpecialty, selectedCity });
  };

  // Featured doctors (just show 3 for the homepage)
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-light to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="medical-container py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                احجز موعدًا مع أفضل الأطباء في العراق
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">
                منصة طبية متكاملة تربط المرضى بأفضل الأطباء في جميع محافظات العراق. حجز بسيط، رعاية استثنائية.
              </p>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">التخصص الطبي</option>
                      {specialties.map((specialty) => (
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">المدينة</option>
                      {iraqiCities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                    <Search className="h-5 w-5 mr-2" />
                    بحث
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img 
                src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg" 
                alt="Iraqi doctor with patient" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="medical-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">لماذا تختار منصة الطب العراقية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-medical-primary text-white mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">ابحث عن أفضل الأطباء</h3>
              <p className="text-gray-700 dark:text-gray-300">
                تصفح مئات الأطباء من مختلف التخصصات في جميع أنحاء العراق. اختر طبيبك بناءً على التقييمات والمراجعات.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-medical-primary text-white mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">حجز مواعيد سهل</h3>
              <p className="text-gray-700 dark:text-gray-300">
                احجز موعدك في أي وقت ومن أي مكان. اختر الوقت المناسب لك بضغطة زر واحصل على تأكيد فوري.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-medical-primary text-white mb-4">
                <CheckSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">رعاية طبية موثوقة</h3>
              <p className="text-gray-700 dark:text-gray-300">
                نتعاون فقط مع الأطباء المعتمدين ذوي الخبرة. جميع الأطباء على منصتنا مرخصون ومؤهلون لتقديم أفضل رعاية.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Specialties */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="medical-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">التخصصات الطبية</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <Link key={specialty.id} to={`/specialties/${specialty.id}`}>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl text-center hover:shadow-md transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-medical-light dark:bg-gray-600 text-medical-primary mb-4">
                    {/* This would use actual icons in a real implementation */}
                    <span className="text-2xl">{specialty.icon === 'heart' ? '❤️' : 
                                              specialty.icon === 'brain' ? '🧠' : 
                                              specialty.icon === 'bone' ? '🦴' : 
                                              specialty.icon === 'eye' ? '👁️' : 
                                              specialty.icon === 'tooth' ? '🦷' : 
                                              specialty.icon === 'baby' ? '👶' : 
                                              specialty.icon === 'female' ? '👩' : '⚕️'}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{specialty.nameAr}</h3>
                  <p className="text-gray-500 dark:text-gray-300">{specialty.count} طبيب</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/specialties">
              <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                عرض جميع التخصصات
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Doctors */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="medical-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">أطباء مميزون</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.nameAr} 
                    className="w-full h-60 object-cover object-center"
                  />
                  {doctor.rating >= 4.8 && (
                    <div className="absolute top-3 right-3 bg-medical-primary text-white px-3 py-1 rounded-full text-sm flex items-center">
                      <BadgeCheck className="h-4 w-4 mr-1" />
                      متميز
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {doctor.nameAr}
                  </h3>
                  <p className="text-medical-primary mb-2">{doctor.specialtyAr}</p>
                  
                  <div className="flex items-center text-amber-500 mb-3">
                    {'★'.repeat(Math.floor(doctor.rating))}
                    {'☆'.repeat(5 - Math.floor(doctor.rating))}
                    <span className="text-gray-600 dark:text-gray-400 ml-2">({doctor.reviewCount})</span>
                  </div>
                  
                  <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{doctor.hospitalAr}، {doctor.cityAr}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-900 dark:text-white font-bold text-lg">
                      {doctor.price.toLocaleString()} د.ع
                    </span>
                    <Link to={`/doctors/${doctor.id}`}>
                      <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                        حجز موعد
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/doctors">
              <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                عرض جميع الأطباء
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-medical-light dark:bg-gray-800">
        <div className="medical-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">كيف تعمل المنصة؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-700 text-medical-primary mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">ابحث عن طبيب</h3>
              <p className="text-gray-700 dark:text-gray-300">
                ابحث حسب التخصص، المدينة، أو اسم الطبيب للعثور على الطبيب المناسب.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-700 text-medical-primary mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">اختر موعدًا مناسبًا</h3>
              <p className="text-gray-700 dark:text-gray-300">
                تصفح الأوقات المتاحة واختر الموعد الذي يناسب جدولك.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-700 text-medical-primary mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">تأكيد الحجز</h3>
              <p className="text-gray-700 dark:text-gray-300">
                قم بملء بياناتك وتأكيد الحجز. ستتلقى تأكيدًا فوريًا وتذكيرًا قبل الموعد.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/doctors">
              <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                ابدأ البحث عن طبيب الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-primary to-medical-dark text-white">
        <div className="medical-container text-center">
          <h2 className="text-3xl font-bold mb-6">هل أنت طبيب؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            انضم إلى شبكة الأطباء الخاصة بنا، وقم بتوسيع نطاق ممارستك، وأدِر جدولك بكفاءة، واتصل بالمزيد من المرضى.
          </p>
          <Link to="/doctor-register">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-primary">
              انضم كطبيب
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
