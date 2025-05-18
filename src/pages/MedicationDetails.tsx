import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pill, AlarmClock, ShieldAlert, ListChecks } from "lucide-react";
import { medications, Medication } from "@/data/medicationsData";
import { toast } from "@/hooks/use-toast";

const MedicationDetails = () => {
  const { id } = useParams();
  const [medication, setMedication] = useState<Medication | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [prescriptionNote, setPrescriptionNote] = useState("");

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      if (id) {
        const foundMedication = medications.find(m => m.id === parseInt(id));
        setMedication(foundMedication || null);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    if (!medication) return;
    
    if (medication.requiresPrescription) {
      setPrescriptionDialogOpen(true);
    } else {
      toast({
        title: "تمت الإضافة إلى السلة",
        description: `تمت إضافة ${quantity} ${medication.nameAr} إلى سلة التسوق`,
      });
    }
  };

  const handlePrescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "تم إرسال الطلب",
      description: "سيتم التحقق من الوصفة الطبية وسنتواصل معك قريبًا",
    });
    
    setPrescriptionDialogOpen(false);
    setPrescriptionFile(null);
    setPrescriptionNote("");
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!medication) {
    return (
      <PageLayout>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">الدواء غير موجود</h1>
          <p className="mb-6">عذراً، لم يتم العثور على الدواء المطلوب</p>
          <Link to="/pharmacy">
            <Button>العودة إلى الصيدلية</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-8">
        <div className="mb-4">
          <nav className="flex text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-medical-primary">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/pharmacy" className="hover:text-medical-primary">الصيدلية</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{medication.nameAr}</span>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img
                src={medication.imageUrl}
                alt={medication.nameAr}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{medication.nameAr}</h1>
                <p className="text-gray-600 mb-2">{medication.name}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-gray-100">
                    {medication.category}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    {medication.dosage}
                  </Badge>
                  <Badge variant={medication.availability ? "default" : "destructive"}>
                    {medication.availability ? "متوفر" : "غير متوفر"}
                  </Badge>
                  {medication.requiresPrescription && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      <Pill size={14} className="mr-1" />
                      يتطلب وصفة طبية
                    </Badge>
                  )}
                </div>
                
                <p className="text-2xl font-bold text-medical-primary mb-4">
                  {medication.price} $
                </p>
                
                <p className="text-gray-700 mb-6">
                  {medication.descriptionAr}
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-24">
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  
                  <Button
                    className="flex-1 bg-medical-primary hover:bg-medical-dark"
                    disabled={!medication.availability}
                    onClick={handleAddToCart}
                  >
                    {medication.requiresPrescription ? "طلب مع وصفة طبية" : "إضافة إلى السلة"}
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <AlarmClock size={18} className="text-gray-600" />
                    <span>توصيل سريع خلال 24 ساعة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={18} className="text-gray-600" />
                    <span>منتجات أصلية 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ListChecks size={18} className="text-gray-600" />
                    <span>تحت إشراف صيادلة مرخصين</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">معلومات الدواء</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">الاستخدامات</h3>
                  <p className="text-gray-600">
                    {medication.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">الجرعة الموصى بها</h3>
                  <p className="text-gray-600">
                    {medication.dosage} حسب توجيهات الطبيب
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {medication.requiresPrescription && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <Pill size={24} className="text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">تنبيه: هذا الدواء يتطلب وصفة طبية</h3>
                  <p className="text-gray-600">
                    وفقًا للوائح الصحية، يتطلب هذا الدواء وصفة طبية من طبيب مرخص. يرجى تحميل صورة من الوصفة الطبية عند الطلب.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prescription Upload Dialog */}
      <Dialog open={prescriptionDialogOpen} onOpenChange={setPrescriptionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تحميل الوصفة الطبية</DialogTitle>
            <DialogDescription>
              يرجى تحميل صورة واضحة من الوصفة الطبية للموافقة على طلبك
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePrescriptionSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="prescription" className="text-sm font-medium">
                  صورة الوصفة الطبية
                </label>
                <Input
                  id="prescription"
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-gray-500">
                  يجب أن تكون الصورة واضحة وتحتوي على جميع التفاصيل المطلوبة
                </p>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="note" className="text-sm font-medium">
                  ملاحظات إضافية (اختياري)
                </label>
                <Textarea
                  id="note"
                  placeholder="أي معلومات إضافية تريد إخبارنا بها"
                  value={prescriptionNote}
                  onChange={(e) => setPrescriptionNote(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" className="bg-medical-primary hover:bg-medical-dark">
                إرسال الطلب
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default MedicationDetails;
