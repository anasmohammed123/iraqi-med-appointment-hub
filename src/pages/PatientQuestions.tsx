
import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHomePageData } from "@/hooks/useHomePageData";
import { PageLoader } from "@/components/ui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, MessageCircle, PlusCircle, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Question {
  id: number;
  fullName: string;
  specialty: string;
  title: string;
  question: string;
  date: string;
  images: string[];
  answers: Array<{
    id: number;
    doctorName: string;
    doctorSpecialty: string;
    doctorImage: string;
    answer: string;
    date: string;
  }>;
}

const specialties = [
  "الطب العام",
  "طب القلب",
  "طب الأطفال",
  "الأمراض الجلدية",
  "الجراحة العامة",
  "طب العيون",
  "طب الأسنان",
  "طب النساء والتوليد",
  "الطب النفسي"
];

const PatientQuestions = () => {
  const { isLoading, simulateLoading } = useHomePageData();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      fullName: "أحمد علي",
      specialty: "طب القلب",
      title: "ألم في الصدر مع خفقان",
      question: "أعاني من ألم في منطقة الصدر مع خفقان في القلب منذ أسبوع، هل هذه أعراض تستدعي زيارة الطبيب؟",
      date: "2025-05-10",
      images: [],
      answers: [
        {
          id: 1,
          doctorName: "د. محمد الحسيني",
          doctorSpecialty: "طب القلب",
          doctorImage: "https://randomuser.me/api/portraits/men/32.jpg",
          answer: "نعم، هذه الأعراض تستدعي زيارة الطبيب في أقرب وقت ممكن، لأنها قد تكون مؤشراً على مشكلة في القلب تحتاج للتقييم. أنصحك بعمل تخطيط للقلب وفحص مستويات الضغط.",
          date: "2025-05-11"
        }
      ]
    },
    {
      id: 2,
      fullName: "سارة محمد",
      specialty: "طب الأطفال",
      title: "ارتفاع درجة حرارة الطفل",
      question: "طفلي عمره سنتين، درجة حرارته مرتفعة منذ يومين (39 درجة)، أعطيته خافض للحرارة لكنها ترتفع مجدداً. هل يجب أن أقلق؟",
      date: "2025-05-12",
      images: ["https://placehold.co/400x300/e2e8f0/475569?text=صورة+توضيحية"],
      answers: [
        {
          id: 2,
          doctorName: "د. ليلى الصالح",
          doctorSpecialty: "طب الأطفال",
          doctorImage: "https://randomuser.me/api/portraits/women/56.jpg",
          answer: "ارتفاع الحرارة لمدة تزيد عن يومين عند الأطفال يستدعي زيارة الطبيب، خاصة إذا كانت لا تستجيب للخوافض. قد تكون علامة على التهاب فيروسي أو بكتيري يحتاج للتقييم والعلاج المناسب.",
          date: "2025-05-12"
        }
      ]
    }
  ]);
  
  // Form state
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [activeTab, setActiveTab] = useState("browse");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !question || !specialty || !fullName) {
      toast({
        title: "خطأ في النموذج",
        description: "الرجاء تعبئة جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    // Convert selected files to image URLs (in a real app, you'd upload these)
    const imageUrls: string[] = [];
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        // In a real app, upload the file and get back a URL
        // For demo, we'll just use a placeholder
        imageUrls.push(`https://placehold.co/400x300/e2e8f0/475569?text=صورة+${i+1}`);
      }
    }
    
    simulateLoading(() => {
      const newQuestion: Question = {
        id: questions.length + 1,
        fullName,
        specialty,
        title,
        question,
        date: new Date().toISOString().split('T')[0],
        images: imageUrls,
        answers: []
      };
      
      setQuestions([newQuestion, ...questions]);
      
      // Reset form
      setTitle("");
      setQuestion("");
      setSpecialty("");
      setFullName("");
      setSelectedImages(null);
      
      // Show success message
      toast({
        title: "تم إرسال سؤالك بنجاح",
        description: "سيقوم الأطباء المختصين بالرد على سؤالك قريباً",
      });
      
      // Switch to browse tab
      setActiveTab("browse");
    });
  };

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">أسئلة المرضى والإجابات الطبية</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اطرح أسئلتك الطبية واحصل على إجابات من أطباء مختصين. يمكنك أيضاً تصفح الأسئلة السابقة والاستفادة من الإجابات المقدمة.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">تصفح الأسئلة</TabsTrigger>
            <TabsTrigger value="ask">طرح سؤال جديد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="mt-6">
            <div className="space-y-8">
              {questions.map((q) => (
                <Card key={q.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{q.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{q.fullName}</span>
                          <span>•</span>
                          <span>{q.specialty}</span>
                          <span>•</span>
                          <span>{q.date}</span>
                        </CardDescription>
                      </div>
                      <div className="bg-medical-light text-medical-primary px-2 py-1 rounded-full text-sm">
                        {q.answers.length > 0 ? `${q.answers.length} إجابة` : "بانتظار الإجابة"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{q.question}</p>
                    
                    {q.images.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {q.images.map((img, idx) => (
                          <div key={idx} className="relative w-24 h-24 rounded-md overflow-hidden border">
                            <img src={img} alt="صورة مرفقة" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {q.answers.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          <MessageCircle className="h-5 w-5" />
                          الإجابات الطبية
                        </h4>
                        
                        {q.answers.map((answer) => (
                          <div key={answer.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar>
                                <AvatarImage src={answer.doctorImage} />
                                <AvatarFallback>{answer.doctorName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">{answer.doctorName}</div>
                                <div className="text-sm text-medical-primary">{answer.doctorSpecialty}</div>
                              </div>
                              <div className="text-sm text-gray-500 mr-auto">{answer.date}</div>
                            </div>
                            <p className="text-gray-700">{answer.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ask" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>طرح سؤال جديد</CardTitle>
                <CardDescription>
                  سيتم الرد على سؤالك من قبل أطباء مختصين في أقرب وقت ممكن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input 
                      id="fullName" 
                      placeholder="أدخل اسمك الكامل" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialty">التخصص المطلوب</Label>
                    <Select value={specialty} onValueChange={setSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التخصص الطبي" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان السؤال</Label>
                    <Input 
                      id="title" 
                      placeholder="اكتب عنواناً مختصراً لسؤالك" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="question">نص السؤال</Label>
                    <Textarea 
                      id="question" 
                      placeholder="اكتب سؤالك بالتفصيل هنا..." 
                      rows={5}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="images" className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      إرفاق صور (اختياري)
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input 
                        id="images" 
                        type="file" 
                        multiple 
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setSelectedImages(e.target.files)}
                      />
                      <Label htmlFor="images" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">اضغط هنا لإرفاق صور متعلقة بحالتك</p>
                        <p className="text-xs text-gray-400 mt-1">يمكنك اختيار أكثر من صورة</p>
                      </Label>
                      {selectedImages && selectedImages.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-medical-primary">
                            تم اختيار {selectedImages.length} {selectedImages.length === 1 ? 'صورة' : 'صور'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    إرسال السؤال
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default PatientQuestions;
