
import { useState } from 'react';
import { 
  topSpecialtiesData,
  featuredDoctorsData,
  hospitalsData,
  promosData,
  faqsData,
  medicalCentersData,
  cardiacDoctorsData
} from '@/data/homePageData';
import { onlineDoctorsData } from '@/data/onlineDoctorsData';

// Define types for our data
export interface Specialty {
  id: number;
  name: string;
  count: number;
  icon: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export interface Hospital {
  id: number;
  name: string;
  doctors: number;
  address: string;
  hours: string;
  imageUrl: string;
}

export interface Promo {
  id: number;
  title: string;
  description: string;
  endDate: string;
  images: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MedicalCenter {
  id: number;
  name: string;
  visits: number;
  rating: number;
  services: string[];
  imageUrl: string;
}

export interface OnlineDoctor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  availableFor: Array<"video" | "phone">;
  rating: number;
  price: number;
}

export const useHomePageData = () => {
  // Initialize all state variables with the data
  const [topSpecialties, setTopSpecialties] = useState<Specialty[]>(topSpecialtiesData);
  const [featuredDoctors, setFeaturedDoctors] = useState<Doctor[]>(featuredDoctorsData);
  const [hospitals, setHospitals] = useState<Hospital[]>(hospitalsData);
  const [promos, setPromos] = useState<Promo[]>(promosData);
  const [faqs, setFaqs] = useState<FAQ[]>(faqsData);
  const [medicalCenters, setMedicalCenters] = useState<MedicalCenter[]>(medicalCentersData);
  const [cardiacDoctors, setCardiacDoctors] = useState<Doctor[]>(cardiacDoctorsData);
  const [onlineDoctors, setOnlineDoctors] = useState<OnlineDoctor[]>(onlineDoctorsData);
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to simulate page loading
  const simulateLoading = (callback: () => void, delay = 500) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, delay);
  };
  
  return {
    topSpecialties,
    featuredDoctors,
    hospitals,
    promos,
    faqs,
    medicalCenters,
    cardiacDoctors,
    onlineDoctors,
    isLoading,
    simulateLoading,
    
    // Add setters in case we need to update any of these values
    setTopSpecialties,
    setFeaturedDoctors,
    setHospitals,
    setPromos,
    setFaqs,
    setMedicalCenters,
    setCardiacDoctors,
    setOnlineDoctors
  };
};
