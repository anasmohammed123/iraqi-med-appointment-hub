
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, X, Star } from "lucide-react";
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
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-medical-light py-6 px-4">
        <div className="medical-container">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الأطباء في العراق</h1>
          <p className="text-gray-600">ابحث عن أفضل الأطباء وقم بحجز موعد بسهولة</p>
        </div>
      </div>

      <div className="medical-container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile */}
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
                  {/* Mobile Filters Content - Same as desktop but with different styling */}
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

          {/* Search Bar */}
          <div className="w-full mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="ابحث عن طبيب أو تخصص أو مدينة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-3 pl-10 py-6 border-gray-300 dark:border-gray-600 rounded-md w-full"
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
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
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
                {/* Sort options would go here in a real app */}
              </div>

              <div className="space-y-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img
                            src={doctor.image}
                            alt={doctor.nameAr}
                            className="w-full h-full object-cover object-center md:h-64"
                          />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                                {doctor.nameAr}
                              </h3>
                              <p className="text-medical-primary mb-2">{doctor.specialtyAr}</p>
                              
                              <div className="flex items-center text-amber-500 mb-3">
                                {'★'.repeat(Math.floor(doctor.rating))}
                                {'☆'.repeat(5 - Math.floor(doctor.rating))}
                                <span className="text-gray-600 dark:text-gray-400 mr-2">({doctor.reviewCount})</span>
                                <span className="text-gray-600 dark:text-gray-400">• {doctor.experience} سنة خبرة</span>
                              </div>
                              
                              <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300">
                                <MapPin className="h-4 w-4 ml-1 flex-shrink-0" />
                                <span>{doctor.hospitalAr}، {doctor.cityAr}</span>
                              </div>
                              
                              <div className="mb-4">
                                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                                  {doctor.bioAr}
                                </p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {doctor.availableDays.map((day) => (
                                  <span key={day} className="text-xs bg-medical-light text-medical-primary px-2 py-1 rounded-full">
                                    {day === 'Sunday' ? 'الأحد' :
                                     day === 'Monday' ? 'الإثنين' :
                                     day === 'Tuesday' ? 'الثلاثاء' :
                                     day === 'Wednesday' ? 'الأربعاء' :
                                     day === 'Thursday' ? 'الخميس' :
                                     day === 'Friday' ? 'الجمعة' :
                                     'السبت'}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 md:text-right">
                              <div className="mb-4">
                                <span className="text-gray-900 dark:text-white font-bold text-lg block">
                                  {doctor.price.toLocaleString()} د.ع
                                </span>
                                <span className="text-gray-500 text-sm">لكل كشف</span>
                              </div>
                              
                              <Link to={`/doctors/${doctor.id}`}>
                                <Button className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                                  عرض الملف وحجز موعد
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
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
      </div>

      <Footer />
    </div>
  );
};

export default DoctorList;
