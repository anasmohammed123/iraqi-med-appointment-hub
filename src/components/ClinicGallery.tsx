
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LazyImage } from "@/components/ui/lazy-image";
import { Gallery, Image, ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    { value: "all", label: "الكل", icon: Gallery },
    { value: "clinic", label: "العيادة", icon: ImageIcon },
    { value: "equipment", label: "المعدات", icon: ImageIcon },
    { value: "team", label: "الفريق الطبي", icon: ImageIcon },
    { value: "other", label: "أخرى", icon: ImageIcon },
  ];

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <div className="my-6">
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.value} value={category.value} className="flex items-center">
                <Icon className="h-4 w-4 ml-1.5" />
                {category.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.value} value={category.value}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images
                .filter(img => category.value === "all" || img.category === category.value)
                .map(image => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <AspectRatio ratio={4/3}>
                            <LazyImage 
                              src={image.src} 
                              alt={image.alt} 
                              className="object-cover transition-all hover:scale-105" 
                              onClick={() => setSelectedImage(image.src)}
                            />
                          </AspectRatio>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="p-0 max-w-3xl">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-auto object-contain max-h-[80vh]" 
                      />
                    </DialogContent>
                  </Dialog>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ClinicGallery;
