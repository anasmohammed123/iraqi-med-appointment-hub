
import { useState } from 'react';
import { topSpecialties, doctors, hospitals, promos, faqs, medicalCenters, cardiacDoctors } from '@/data/homePageData';
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
    onlineDoctors, // From the separate onlineDoctorsData.ts file
    isLoading,
    simulateLoading
  };
};
