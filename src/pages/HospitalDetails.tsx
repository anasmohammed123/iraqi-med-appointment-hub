
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Clock, Star, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HospitalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock hospital data fetch
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would be replaced with an actual API call
      const mockHospital = {
        id: parseInt(id || "1"),
        name: "مستشفى بغداد التعليمي",
        location: "شارع الرشيد، بغداد، العراق",
        phone: "+964 771 123 4567",
        email: "info@baghdad-hospital.iq",
        website: "www.baghdad-hospital.iq",
        hours: "8:00 صباحاً - 8:00 مساءً",
        imageUrl: "https://via.placeholder.com/800x400",
        rating: 4.5,
        reviews: 120,
        description: "مستشفى بغداد التعليمي هو مركز طبي متكامل يقدم خدمات صحية متميزة للمرضى. يضم المستشفى أحدث الأجهزة الطبية والكوادر المتخصصة في مختلف المجالات.",
        departments: [
          { name: "طب القلب", doctors: 12 },
          { name: "الجراحة العامة", doctors: 8 },
          { name: "طب الأطفال", doctors: 10 },
          { name: "النساء والتوليد", doctors: 6 },
          { name: "العظام", doctors: 5 },
          { name: "الأنف والأذن والحنجرة", doctors: 4 },
        ],
        doctors: [
          { id: 1, name: "د. أحمد محمد", specialty: "قلب", imageUrl: "https://via.placeholder.com/100", rating: 4.8 },
          { id: 2, name: "د. سارة علي", specialty: "أطفال", imageUrl: "https://via.placeholder.com/100", rating: 4.6 },
          { id: 3, name: "د. علي حسين", specialty: "جراحة عامة", imageUrl: "https://via.placeholder.com/100", rating: 4.7 },
        ],
        facilities: [
          "غرف عمليات متطورة",
          "وحدة العناية المركزة",
          "مختبرات حديثة",
          "قسم الأشعة",
          "صيدلية",
          "مواقف سيارات",
        ],
        gallery: [
          "https://via.placeholder.com/300x200",
          "https://via.placeholder.com/300x200",
          "https://via.placeholder.com/300x200",
          "https://via.placeholder.com/300x200",
        ]
      };
      
      setHospital(mockHospital);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-medical-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hospital Hero */}
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <AspectRatio ratio={1}>
                  <img
                    src={hospital.imageUrl}
                    alt={hospital.name}
                    className="rounded-lg object-cover h-full w-full"
                  />
                </AspectRatio>
              </div>
              
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
                
                <div className="flex items-center mb-4">
                  <Star className="fill-yellow-400 stroke-yellow-400" size={18} />
                  <span className="ml-1 font-medium">{hospital.rating}</span>
                  <span className="ml-2 text-gray-500">({hospital.reviews} تقييم)</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <MapPin className="text-gray-600 mt-1 flex-shrink-0" size={18} />
                    <span>{hospital.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="text-gray-600 flex-shrink-0" size={18} />
                    <span>{hospital.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-600 flex-shrink-0" size={18} />
                    <span>{hospital.hours}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {hospital.description}
                </p>
                
                <Link 
                  to="/appointments" 
                  className="inline-flex items-center gap-2 bg-medical-primary text-white px-4 py-2 rounded-lg hover:bg-medical-dark transition-colors"
                >
                  <Calendar size={18} />
                  حجز موعد
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="departments">
            <TabsList className="mb-6">
              <TabsTrigger value="departments">الأقسام</TabsTrigger>
              <TabsTrigger value="doctors">الأطباء</TabsTrigger>
              <TabsTrigger value="facilities">المرافق</TabsTrigger>
              <TabsTrigger value="gallery">معرض الصور</TabsTrigger>
            </TabsList>
            
            <TabsContent value="departments">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {hospital.departments.map((dept: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
                      <p className="text-gray-600">عدد الأطباء: {dept.doctors}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="doctors">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {hospital.doctors.map((doctor: any) => (
                  <Card key={doctor.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <Link to={`/doctors/${doctor.id}`} className="font-semibold hover:text-medical-primary">
                            {doctor.name}
                          </Link>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
                        <span className="ml-1 text-sm">{doctor.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="facilities">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {hospital.facilities.map((facility: string, index: number) => (
                  <Badge key={index} className="py-2 px-3 text-sm font-normal">
                    {facility}
                  </Badge>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="gallery">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {hospital.gallery.map((image: string, index: number) => (
                  <AspectRatio key={index} ratio={3/2}>
                    <img
                      src={image}
                      alt={`Hospital gallery ${index + 1}`}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </AspectRatio>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HospitalDetails;
