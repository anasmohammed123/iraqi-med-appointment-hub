
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LazyImage } from "@/components/ui/lazy-image";

interface ClinicGalleryProps {
  images: {
    id: number;
    src: string;
    alt: string;
    category: "clinic" | "equipment" | "team" | "other";
  }[];
}

export const ClinicGallery = ({ images }: ClinicGalleryProps) => {
  const categories = [
    { value: "all", label: "الكل" },
    { value: "clinic", label: "العيادة" },
    { value: "equipment", label: "المعدات" },
    { value: "team", label: "الفريق الطبي" },
    { value: "other", label: "أخرى" },
  ];

  return (
    <div className="my-6">
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          {categories.map(category => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.value} value={category.value}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images
                .filter(img => category.value === "all" || img.category === category.value)
                .map(image => (
                  <Card key={image.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <AspectRatio ratio={4/3}>
                        <LazyImage 
                          src={image.src} 
                          alt={image.alt} 
                          className="object-cover transition-all hover:scale-105 cursor-pointer" 
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ClinicGallery;
