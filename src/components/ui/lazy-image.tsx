
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc = "/placeholder.svg",
  ...props 
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(fallbackSrc);
  
  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setImgSrc(fallbackSrc);
      setIsLoading(false);
    };
  }, [src, fallbackSrc]);

  return (
    <>
      {isLoading && <Skeleton className={className} />}
      <img 
        src={imgSrc} 
        alt={alt} 
        className={className} 
        style={{ display: isLoading ? 'none' : 'block' }}
        loading="lazy"
        {...props} 
      />
    </>
  );
};
