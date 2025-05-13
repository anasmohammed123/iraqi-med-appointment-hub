
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, BadgePercent, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    ]
  },
  {
    id: "3",
    title: "حزمة صحة القلب",
    titleEn: "Heart Health Package",
    description: "فحص شامل للقلب يشمل تخطيط القلب، فحص الدهون، وإستشارة متخصص",
    hospital: "مستشفى البصرة العام",
    hospitalEn: "Basra General Hospital",
    validUntil: "2025-08-20",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    discount: 25,
    city: "البصرة",
    cityEn: "Basra",
    originalPrice: 120000,
    discountedPrice: 90000,
    category: "القلب",
    categoryEn: "Cardiology",
    terms: [
      "يشمل العرض تخطيط القلب، فحص الدهون، واستشارة طبيب قلب",
      "يجب حجز موعد مسبقاً",
      "العرض ساري لمدة زيارة واحدة فقط",
      "مدة صلاحية العرض حتى 20 أغسطس 2025"
    ]
  },
  {
    id: "4",
    title: "عروض الولادة الآمنة",
    titleEn: "Safe Delivery Offers",
    description: "رعاية متكاملة لفترة ما قبل الولادة، الولادة، وما بعدها بأسعار مخفضة",
    hospital: "مستشفى أربيل التخصصي",
    hospitalEn: "Erbil Specialist Hospital",
    validUntil: "2025-09-10",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    discount: 20,
    city: "أربيل",
    cityEn: "Erbil",
    originalPrice: 1500000,
    discountedPrice: 1200000,
    category: "نساء وتوليد",
    categoryEn: "Obstetrics",
    terms: [
      "يشمل العرض 5 زيارات متابعة قبل الولادة",
      "الولادة الطبيعية (لا يشمل العرض العمليات القيصرية)",
      "زيارتان للمتابعة بعد الولادة",
      "يجب التسجيل قبل الشهر السابع من الحمل",
      "العرض ساري حتى 10 سبتمبر 2025"
    ]
  },
  {
    id: "5",
    title: "باقة الفحص السنوي",
    titleEn: "Annual Checkup Package",
    description: "فحص طبي شامل يتضمن التحاليل والأشعة الضرورية بسعر موحد",
    hospital: "مركز الموصل الطبي",
    hospitalEn: "Mosul Medical Center",
    validUntil: "2025-07-30",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    discount: 15,
    city: "الموصل",
    cityEn: "Mosul",
    originalPrice: 85000,
    discountedPrice: 72250,
    category: "فحص عام",
    categoryEn: "General Check-up",
    terms: [
      "يشمل العرض فحص طبي شامل مع تحاليل الدم الأساسية",
      "صورة أشعة على الصدر",
      "تخطيط قلب أساسي",
      "فحص السكر والكوليسترول",
      "استشارة طبية لتقييم النتائج",
      "العرض ساري حتى 30 يوليو 2025"
    ]
  },
  {
    id: "6",
    title: "عرض العلاج الطبيعي",
    titleEn: "Physiotherapy Offer",
    description: "احصل على 5 جلسات علاج طبيعي بسعر 3 جلسات فقط",
    hospital: "مركز النجف للعلاج الطبيعي",
    hospitalEn: "Najaf Physiotherapy Center",
    validUntil: "2025-06-15",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    discount: 40,
    city: "النجف",
    cityEn: "Najaf",
    originalPrice: 200000,
    discountedPrice: 120000,
    category: "علاج طبيعي",
    categoryEn: "Physiotherapy",
    terms: [
      "العرض يشمل 5 جلسات علاج طبيعي",
      "يجب أن تكتمل الجلسات خلال شهرين من تاريخ الجلسة الأولى",
      "يلزم تقييم أولي قبل بدء العلاج",
      "العرض غير قابل للتحويل لشخص آخر",
      "العرض ساري حتى 15 يونيو 2025"
    ]
  }
];

// Extract cities for filtering
const cities = Array.from(new Set(promos.map(promo => promo.cityEn)));

// Extract categories for filtering
const categories = Array.from(new Set(promos.map(promo => promo.categoryEn)));

// Format date to Arabic format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Promos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPromos, setFilteredPromos] = useState(promos);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState(0);

  // Filter promos based on search term, cities, categories, and min discount
  const filterPromos = () => {
    let filtered = [...promos];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (promo) =>
          promo.title.toLowerCase().includes(term) ||
          promo.titleEn.toLowerCase().includes(term) ||
          promo.description.toLowerCase().includes(term) ||
          promo.hospital.toLowerCase().includes(term) ||
          promo.hospitalEn.toLowerCase().includes(term) ||
          promo.city.toLowerCase().includes(term) ||
          promo.cityEn.toLowerCase().includes(term) ||
          promo.category.toLowerCase().includes(term) ||
          promo.categoryEn.toLowerCase().includes(term)
      );
    }

    // Filter by cities
    if (selectedCities.length > 0) {
      filtered = filtered.filter((promo) => selectedCities.includes(promo.cityEn));
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((promo) => selectedCategories.includes(promo.categoryEn));
    }

    // Filter by minimum discount
    if (minDiscount > 0) {
      filtered = filtered.filter((promo) => promo.discount >= minDiscount);
    }

    setFilteredPromos(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterPromos();
  };

  // Toggle city selection
  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
    filterPromos();
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    filterPromos();
  };

  // Set minimum discount
  const setDiscountFilter = (value: number) => {
    setMinDiscount(value);
    filterPromos();
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCities([]);
    setSelectedCategories([]);
    setMinDiscount(0);
    setFilteredPromos(promos);
  };

  // Update filtered promos when search term, cities, categories, or min discount changes
  useState(() => {
    filterPromos();
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-medical-light py-6 px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">العروض والخصومات</h1>
          <p className="text-gray-600">أحدث العروض والخصومات من المستشفيات والمراكز الطبية في العراق</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="w-full mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن العروض..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pr-3 pl-10 py-6 border-gray-300 dark:border-gray-600 rounded-md w-full"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchTerm("");
                  filterPromos();
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">تصفية العروض</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">المدينة</h4>
                      <div className="space-y-2">
                        {cities.map((city) => (
                          <div key={city} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`city-${city}`}
                              checked={selectedCities.includes(city)}
                              onChange={() => toggleCity(city)}
                              className="ml-2"
                            />
                            <label htmlFor={`city-${city}`} className="text-sm">
                              {promos.find(promo => promo.cityEn === city)?.city}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">التخصص</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="ml-2"
                            />
                            <label htmlFor={`category-${category}`} className="text-sm">
                              {promos.find(promo => promo.categoryEn === category)?.category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">نسبة الخصم</h4>
                      <div className="space-y-2">
                        {[0, 10, 20, 30, 50].map((discount) => (
                          <div key={discount} className="flex items-center">
                            <input
                              type="radio"
                              id={`discount-${discount}`}
                              name="discount"
                              checked={minDiscount === discount}
                              onChange={() => setDiscountFilter(discount)}
                              className="ml-2"
                            />
                            <label htmlFor={`discount-${discount}`} className="text-sm">
                              {discount > 0 ? `${discount}% أو أكثر` : 'الكل'}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full mt-6"
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Promos Grid */}
          <div className="md:col-span-3">
            {/* Active Filters */}
            {(selectedCities.length > 0 || selectedCategories.length > 0 || minDiscount > 0) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCities.map(city => (
                  <Badge key={city} className="pl-2 flex items-center gap-1">
                    {promos.find(promo => promo.cityEn === city)?.city}
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent ml-1" 
                      onClick={() => {
                        toggleCity(city);
                      }}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {selectedCategories.map(category => (
                  <Badge key={category} className="pl-2 flex items-center gap-1">
                    {promos.find(promo => promo.categoryEn === category)?.category}
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent ml-1" 
                      onClick={() => {
                        toggleCategory(category);
                      }}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {minDiscount > 0 && (
                  <Badge className="pl-2 flex items-center gap-1">
                    خصم {minDiscount}% أو أكثر
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent ml-1" 
                      onClick={() => {
                        setDiscountFilter(0);
                      }}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            )}

            {filteredPromos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromos.map((promo) => (
                  <Link to={`/promos/${promo.id}`} key={promo.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                      <div className="relative">
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-3 right-3 bg-medical-primary text-white">
                          خصم {promo.discount}%
                        </Badge>
                        {promo.discount >= 30 && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-500 text-white">
                              عرض مميز
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{promo.title}</h3>
                        
                        <div className="mb-3">
                          <Badge variant="outline" className="text-xs">
                            {promo.category}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {promo.description}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 ml-1 flex-shrink-0" />
                          <span className="truncate">{promo.hospital}، {promo.city}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 ml-1 flex-shrink-0" />
                          <span>ساري حتى: {formatDate(promo.validUntil)}</span>
                        </div>
                        
                        <div className="flex items-end justify-between mt-3">
                          <div>
                            <div className="text-gray-500 line-through text-sm">
                              {promo.originalPrice.toLocaleString()} د.ع
                            </div>
                            <div className="text-lg font-bold text-medical-primary">
                              {promo.discountedPrice.toLocaleString()} د.ع
                            </div>
                          </div>
                          
                          <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                            التفاصيل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">😔</div>
                <h3 className="text-xl font-bold mb-2">لم يتم العثور على عروض</h3>
                <p className="text-gray-600 mb-6">
                  لا توجد نتائج تطابق معايير البحث الخاصة بك. يرجى تعديل الفلاتر وحاول مرة أخرى.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Promos;
