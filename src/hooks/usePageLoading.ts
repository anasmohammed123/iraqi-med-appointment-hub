
import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  initialLoading?: boolean;
  duration?: number;
}

export const usePageLoading = (options: UsePageLoadingOptions = {}) => {
  const { initialLoading = true, duration = 1000 } = options;
  const [isLoading, setIsLoading] = useState(initialLoading);
  
  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [initialLoading, duration]);
  
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  
  const simulateLoading = (callback?: () => void, loadingTime = 1000) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (callback) callback();
    }, loadingTime);
  };
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    simulateLoading
  };
};
