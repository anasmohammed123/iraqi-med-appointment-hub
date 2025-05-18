
import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LazyImage } from "@/components/ui/lazy-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHomePageData } from "@/hooks/useHomePageData";
import { useNavigate } from "react-router-dom";

// Home services types
interface HomeService {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  image: string;
  price: number;
  category: string;
  categoryAr: string;
}

// Mock data for home services
const homeServices: HomeService[] = [
  {
    id: "1",
    title: "Nursing Care",
    titleAr: "رعاية تمريضية",
    description: "Professional nursing care at home for patients with various needs",
    descriptionAr: "رعاية تمريضية احترافية في المنزل للمرضى ذوي الاحتياجات المختلفة",
    icon: "nurse",
    image: "/placeholder.svg",
    price: 25000,
    category: "Nursing",
    categoryAr: "تمريض"
  },
  {
    id: "2",
    title: "Physiotherapy",
    titleAr: "علاج طبيعي",
    description: "Rehabilitation services with certified physiotherapists at your home",
    descriptionAr: "خدمات إعادة التأهيل مع معالجين طبيعيين معتمدين في منزلك",
    icon: "activity",
    image: "/placeholder.svg",
    price: 35000,
    category: "Therapy",
    categoryAr: "علاج"
  },
  {
    id: "3",
    title: "Medical Tests",
    titleAr: "فحوصات طبية",
    description: "Laboratory tests and medical diagnostics performed at your home",
    descriptionAr: "الفحوصات المخبرية والتشخيصات الطبية التي تتم في منزلك",
    icon: "test-tube",
    image: "/placeholder.svg",
    price: 15000,
    category: "Diagnostics",
    categoryAr: "تشخيص"
  },
  {
    id: "4",
    title: "Elderly Care",
    titleAr: "رعاية المسنين",
    description: "Specialized care services for elderly patients",
    descriptionAr: "خدمات رعاية متخصصة للمرضى المسنين",
    icon: "user",
    image: "/placeholder.svg",
    price: 30000,
    category: "Nursing",
    categoryAr: "تمريض"
  },
  {
    id: "5",
    title: "Wound Care",
    titleAr: "رعاية الجروح",
    description: "Professional wound dressing and care at home",
    descriptionAr: "تضميد الجروح والعناية بها احترافيًا في المنزل",
    icon: "bandage",
    image: "/placeholder.svg",
    price: 18000,
    category: "Nursing",
    categoryAr: "تمريض"
  },
  {
    id: "6",
    title: "IV Therapy",
    titleAr: "العلاج الوريدي",
    description: "Intravenous medication administration by professional nurses",
    descriptionAr: "إعطاء الأدوية عن طريق الوريد من قبل ممرضين محترفين",
    icon: "droplet",
    image: "/placeholder.svg",
    price: 22000,
    category: "Therapy",
    categoryAr: "علاج"
  },
  {
    id: "7",
    title: "Medical Equipment Rental",
    titleAr: "تأجير المعدات الطبية",
    description: "Rent medical equipment for home care needs",
    descriptionAr: "استئجار المعدات الطبية لاحتياجات الرعاية المنزلية",
    icon: "medical-equipment",
    image: "/placeholder.svg",
    price: 40000,
    category: "Equipment",
    categoryAr: "معدات"
  },
  {
    id: "8",
    title: "Doctor Home Visit",
    titleAr: "زيارة الطبيب المنزلية",
    description: "Get examined by a doctor in the comfort of your home",
    descriptionAr: "احصل على فحص من قبل طبيب في راحة منزلك",
    icon: "stethoscope",
    image: "/placeholder.svg",
    price: 50000,
    category: "Consultation",
    categoryAr: "استشارة"
  }
];

// Get unique categories
const categories = Array.from(new Set(homeServices.map(service => service.categoryAr)));

const HomeServices = () => {
  const { isLoading } = useHomePageData();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const navigate = useNavigate();

  // Filter services based on selected category
  const filteredServices = activeCategory === "all" 
    ? homeServices 
    : homeServices.filter(service => service.categoryAr === activeCategory);

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      
      <div className="bg-gradient-to-b from-medical-light to-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">الخدمات الطبية المنزلية</h1>
            <p className="text-xl text-gray-600 mb-6">
              نوفر لك الرعاية الصحية في راحة منزلك مع فريق طبي متخصص
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                جميع الخدمات
              </TabsTrigger>
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="h-full hover:shadow-lg transition-all overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <LazyImage
                      src={service.image}
                      alt={service.titleAr}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{service.titleAr}</CardTitle>
                    <CardDescription className="text-sm">
                      {service.categoryAr}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {service.descriptionAr}
                    </p>
                    <div className="mt-3 text-medical-primary font-bold">
                      {service.price.toLocaleString()} د.ع
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => navigate(`/home-services/${service.id}`)}
                    >
                      عرض التفاصيل
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-medical-light p-6 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">كيفية طلب الخدمة المنزلية</h2>
            <p className="text-gray-600">خطوات بسيطة للحصول على الرعاية الطبية في منزلك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-medical-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">اختر الخدمة</h3>
              <p className="text-sm text-gray-600">حدد الخدمة المنزلية التي تحتاجها من قائمة الخدمات المتوفرة</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-medical-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">حدد الموعد</h3>
              <p className="text-sm text-gray-600">اختر التاريخ والوقت المناسب لك لتلقي الخدمة في منزلك</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-medical-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">استقبل الفريق الطبي</h3>
              <p className="text-sm text-gray-600">سيصل الفريق الطبي المؤهل إلى منزلك في الموعد المحدد لتقديم الخدمة</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomeServices;
