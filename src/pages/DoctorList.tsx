import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, X, Star, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors, specialties, iraqiCities } from "@/data/mockData";

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialties, selectedCities, priceRange, minRating]);

  const filterDoctors = () => {
    let filtered = [...doctors];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(term) ||
          doctor.nameAr.includes(term) ||
          doctor.specialty.toLowerCase().includes(term) ||
          doctor.specialtyAr.includes(term) ||
          doctor.city.toLowerCase().includes(term) ||
          doctor.cityAr.includes(term)
      );
    }

    // Filter by specialties
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        selectedSpecialties.includes(doctor.specialty)
      );
    }

    // Filter by cities
    if (selectedCities.length > 0) {
      filtered = filtered.filter((doctor) => 
        selectedCities.includes(doctor.city)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (doctor) => doctor.price >= priceRange[0] && doctor.price <= priceRange[1]
    );

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter((doctor) => doctor.rating >= minRating);
    }

    setFilteredDoctors(filtered);
  };

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialties([]);
    setSelectedCities([]);
    setPriceRange([0, 100000]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* New Hero Section with Search */}
      <div className="bg-medical-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">الأطباء في العراق</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">ابحث عن أفضل الأطباء المتخصصين وقم بحجز موعد بسهولة وسرعة</p>
          </div>
          
          {/* Prominent Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث عن طبيب أو تخصص أو مدينة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-4 pl-12 py-6 text-lg border-2 shadow-md rounded-full"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Added Location Search Button */}
            <div className="mt-4 text-center">
              <Link to="/location-search">
                <Button variant="outline" className="bg-white gap-2">
                  <Compass className="h-4 w-4" />
                  البحث عن أطباء حسب موقعك الحالي
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  المرشحات والفلاتر
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>تصفية النتائج</SheetTitle>
                  <SheetDescription>
                    استخدم الفلاتر لتضييق نطاق البحث
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* Mobile Filters Content */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">التخصص الطبي</h3>
                    <div className="space-y-2">
                      {specialties.map((specialty) => (
                        <div key={specialty.id} className="flex items-center">
                          <Checkbox
                            id={`specialty-mobile-${specialty.id}`}
                            checked={selectedSpecialties.includes(specialty.name)}
                            onCheckedChange={() => toggleSpecialty(specialty.name)}
                          />
                          <Label
                            htmlFor={`specialty-mobile-${specialty.id}`}
                            className="mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {specialty.nameAr} ({specialty.count})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">المدينة</h3>
                    <div className="space-y-2">
                      {iraqiCities.map((city) => (
                        <div key={city.id} className="flex items-center">
                          <Checkbox
                            id={`city-mobile-${city.id}`}
                            checked={selectedCities.includes(city.name)}
                            onCheckedChange={() => toggleCity(city.name)}
                          />
                          <Label
                            htmlFor={`city-mobile-${city.id}`}
                            className="mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {city.nameAr} ({city.count})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">السعر (د.ع)</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={100000}
                        step={5000}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2">
                        <span>{priceRange[0].toLocaleString()} د.ع</span>
                        <span>{priceRange[1].toLocaleString()} د.ع</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">التقييم</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox
                            id={`rating-mobile-${rating}`}
                            checked={minRating === rating}
                            onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                          />
                          <Label
                            htmlFor={`rating-mobile-${rating}`}
                            className="mr-2 flex items-center"
                          >
                            {Array(rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-amber-500 text-amber-500"
                                />
                              ))}
                            {Array(5 - rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-gray-300"
                                />
                              ))}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full"
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-full max-w-xs">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">المرشحات</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-medical-primary hover:text-medical-dark hover:bg-medical-light"
                  >
                    إعادة تعيين
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">التخصص الطبي</h3>
                    <div className="space-y-2">
                      {specialties.map((specialty) => (
                        <div key={specialty.id} className="flex items-center">
                          <Checkbox
                            id={`specialty-${specialty.id}`}
                            checked={selectedSpecialties.includes(specialty.name)}
                            onCheckedChange={() => toggleSpecialty(specialty.name)}
                          />
                          <Label
                            htmlFor={`specialty-${specialty.id}`}
                            className="mr-2 text-sm"
                          >
                            {specialty.nameAr} ({specialty.count})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">المدينة</h3>
                    <div className="space-y-2">
                      {iraqiCities.map((city) => (
                        <div key={city.id} className="flex items-center">
                          <Checkbox
                            id={`city-${city.id}`}
                            checked={selectedCities.includes(city.name)}
                            onCheckedChange={() => toggleCity(city.name)}
                          />
                          <Label
                            htmlFor={`city-${city.id}`}
                            className="mr-2 text-sm"
                          >
                            {city.nameAr} ({city.count})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">السعر (د.ع)</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={100000}
                        step={5000}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{priceRange[0].toLocaleString()} د.ع</span>
                        <span>{priceRange[1].toLocaleString()} د.ع</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">التقييم</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={minRating === rating}
                            onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                          />
                          <Label
                            htmlFor={`rating-${rating}`}
                            className="mr-2 flex items-center"
                          >
                            {Array(rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-amber-500 text-amber-500"
                                />
                              ))}
                            {Array(5 - rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-gray-300"
                                />
                              ))}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor List */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {filteredDoctors.length} طبيب متاح
                </h2>
              </div>

              {filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-full flex flex-col">
                        <img
                          src={`https://placehold.co/400x400/3b82f6/ffffff?text=${doctor.nameAr.charAt(0)}`}
                          alt={doctor.nameAr}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="flex-1 p-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                              {doctor.nameAr}
                            </h3>
                            <p className="text-medical-primary text-sm mb-2">{doctor.specialtyAr}</p>
                            
                            <div className="flex items-center text-amber-500 mb-2">
                              {'★'.repeat(Math.floor(doctor.rating))}
                              {'☆'.repeat(5 - Math.floor(doctor.rating))}
                              <span className="text-gray-600 text-xs mr-1">({doctor.reviewCount})</span>
                            </div>
                            
                            <div className="flex items-center mb-3 text-gray-600 text-xs">
                              <MapPin className="h-3 w-3 ml-1 flex-shrink-0" />
                              <span className="truncate">{doctor.hospitalAr}، {doctor.cityAr}</span>
                            </div>
                            
                            <div className="mt-auto">
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-900 font-bold">
                                  {doctor.price.toLocaleString()} د.ع
                                </span>
                                <span className="text-xs text-gray-500">لكل كشف</span>
                              </div>
                              
                              <Link to={`/doctors/${doctor.id}`} className="block">
                                <Button className="w-full bg-medical-primary hover:bg-medical-dark text-white text-sm py-1">
                                  عرض الملف وحجز موعد
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">😔</div>
                  <h3 className="text-xl font-bold mb-2">لم يتم العثور على أطباء</h3>
                  <p className="text-gray-600 mb-6">
                    لا توجد نتائج تطابق معايير البحث الخاصة بك. يرجى تعديل المرشحات وحاول مرة أخرى.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    إعادة تعيين الفلاتر
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorList;
