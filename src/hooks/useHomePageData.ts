
import { useState } from 'react';
import { 
  topSpecialtiesData as topSpecialties, 
  featuredDoctorsData as doctors, 
  hospitalsData as hospitals, 
  promosData as promos, 
  faqsData as faqs, 
  medicalCentersData as medicalCenters, 
  cardiacDoctorsData as cardiacDoctors,
  cosmeticCentersData as cosmeticCenters 
} from '@/data/homePageData';
import { onlineDoctors, OnlineDoctor } from '@/data/onlineDoctorsData';

export const useHomePageData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = (callback: () => void, duration: number = 1500) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, duration);
  };

  return {
    topSpecialties,
    featuredDoctors: doctors,
    hospitals,
    promos,
    faqs,
    medicalCenters,
    cardiacDoctors,
    onlineDoctors,
    cosmeticCenters,
    isLoading,
    simulateLoading
  };
};
