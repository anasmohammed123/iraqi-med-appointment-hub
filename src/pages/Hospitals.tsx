
import { useState } from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock hospital data
  const [hospitals] = useState([
    {
      id: 1,
      name: "مستشفى بغداد التعليمي",
      location: "بغداد",
      specialties: ["قلب", "جراحة عامة", "أطفال"],
      imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=مستشفى+بغداد",
      rating: 4.5,
    },
    {
      id: 2,
      name: "مستشفى ابن سينا",
      location: "بغداد",
      specialties: ["عظام", "أعصاب", "عيون"],
      imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=مستشفى+ابن+سينا",
      rating: 4.2,
    },
    {
      id: 3,
      name: "مستشفى البصرة العام",
      location: "البصرة",
      specialties: ["نساء وتوليد", "أطفال", "باطنية"],
      imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=مستشفى+البصرة",
      rating: 4.0,
    },
    {
      id: 4,
      name: "مستشفى الموصل التخصصي",
      location: "الموصل",
      specialties: ["قلب", "كلى", "سرطان"],
      imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=مستشفى+الموصل",
      rating: 4.3,
    },
  ]);

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">المستشفيات</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-md mb-8">
            <Input
              type="text"
              placeholder="ابحث عن مستشفى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
          
          {/* Hospital Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <Link key={hospital.id} to={`/hospitals/${hospital.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <AspectRatio ratio={3/2}>
                      <img
                        src={hospital.imageUrl}
                        alt={hospital.name}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{hospital.name}</h3>
                      <p className="text-gray-600 mb-2">{hospital.location}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {hospital.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{hospital.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hospitals;
