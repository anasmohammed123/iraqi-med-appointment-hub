
import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { ThumbsUp, MessageSquare, Image, X } from "lucide-react";

const questionSchema = z.object({
  fullName: z.string().min(2, {
    message: "الإسم يجب أن يكون أكثر من حرفين",
  }),
  specialty: z.string({
    required_error: "يرجى اختيار التخصص",
  }),
  title: z.string().min(5, {
    message: "عنوان السؤال يجب أن يكون أكثر من 5 أحرف",
  }),
  question: z.string().min(20, {
    message: "السؤال يجب أن يكون أكثر من 20 حرف",
  }),
});

type QuestionValues = z.infer<typeof questionSchema>;

interface Answer {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  content: string;
  date: string;
  likes: number;
}

interface Question {
  id: number;
  fullName: string;
  specialty: string;
  title: string;
  question: string;
  date: string;
  answers: Answer[];
  images?: string[];
}

const PatientQuestions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedImagePreviews, setUploadedImagePreviews] = useState<string[]>([]);
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      fullName: "محمد الأحمد",
      specialty: "cardiology",
      title: "هل ارتفاع ضغط الدم خطير؟",
      question: "أعاني من ارتفاع في ضغط الدم بشكل متكرر، وأتناول دواء خافض للضغط. هل هذه الحالة خطيرة وما هي النصائح للتعامل معها؟",
      date: "2025-05-10",
      answers: [
        {
          id: 1,
          doctorName: "د. سمير الحسن",
          doctorSpecialty: "أمراض القلب",
          doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80",
          content: "ارتفاع ضغط الدم يمكن أن يكون حالة خطيرة إذا لم يتم السيطرة عليها. من المهم الانتظام في تناول الأدوية، وتقليل استهلاك الملح، وممارسة الرياضة بانتظام، والامتناع عن التدخين. راقب ضغط الدم بشكل منتظم واستشر طبيبك إذا كانت القراءات أعلى من 140/90.",
          date: "2025-05-11",
          likes: 15
        },
        {
          id: 2,
          doctorName: "د. ليلى محمود",
          doctorSpecialty: "طب الأسرة",
          doctorImage: "https://randomuser.me/api/portraits/women/45.jpg",
          content: "أضيف إلى ما ذكره الزميل د. سمير أن من المهم أيضاً متابعة الوزن والحفاظ على وزن صحي، وتجنب الإجهاد قدر الإمكان، وتناول نظام غذائي متوازن غني بالخضروات والفواكه. هناك أيضاً تمارين استرخاء مثل التأمل واليوغا يمكن أن تساعد في تقليل الضغط.",
          date: "2025-05-12",
          likes: 8
        }
      ]
    },
    {
      id: 2,
      fullName: "فاطمة العلي",
      specialty: "dermatology",
      title: "علاج حب الشباب المزمن",
      question: "أعاني من حب الشباب المزمن منذ سنوات وقد جربت العديد من العلاجات دون نتيجة فعالة. هل هناك علاج نهائي لهذه المشكلة؟",
      date: "2025-05-12",
      answers: [
        {
          id: 3,
          doctorName: "د. خالد الراشد",
          doctorSpecialty: "الأمراض الجلدية",
          doctorImage: "https://randomuser.me/api/portraits/men/32.jpg",
          content: "حب الشباب المزمن قد يحتاج إلى علاج متخصص. يمكن أن يكون الريتينويدات الفموية مثل الأيزوتريتينوين فعالة في الحالات المستعصية. كما أن هناك علاجات جديدة مثل جلسات الليزر وضوء LED والعلاج الهرموني. أنصح بزيارة طبيب جلدية متخصص لتقييم حالتك ووضع خطة علاجية مناسبة.",
          date: "2025-05-13",
          likes: 21
        }
      ],
      images: [
        "https://images.unsplash.com/photo-1505521216430-8b73b2067df0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80"
      ]
    }
  ]);

  const specialties = [
    { value: "cardiology", label: "أمراض القلب" },
    { value: "dermatology", label: "الأمراض الجلدية" },
    { value: "neurology", label: "أمراض الأعصاب" },
    { value: "orthopedics", label: "جراحة العظام" },
    { value: "pediatrics", label: "طب الأطفال" },
    { value: "ophthalmology", label: "طب العيون" },
    { value: "dentistry", label: "طب الأسنان" },
    { value: "gynecology", label: "النساء والتوليد" },
    { value: "psychiatry", label: "الطب النفسي" },
    { value: "generalMedicine", label: "الطب العام" },
  ];

  const form = useForm<QuestionValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      fullName: "",
      specialty: "",
      title: "",
      question: "",
    },
  });

  function onSubmit(values: QuestionValues) {
    setIsLoading(true);

    // Process images if any
    const imagePreviews = [...uploadedImagePreviews];
    
    setTimeout(() => {
      const newQuestion: Question = {
        id: questions.length + 1,
        ...values,
        date: new Date().toISOString().split('T')[0],
        answers: [],
        images: imagePreviews.length > 0 ? imagePreviews : undefined
      };
      
      setQuestions([newQuestion, ...questions]);
      
      setIsLoading(false);
      setUploadedFiles([]);
      setUploadedImagePreviews([]);
      
      form.reset();
      
      toast({
        title: "تم نشر السؤال بنجاح",
        description: "سيقوم الأطباء المختصون بالرد على سؤالك قريباً"
      });
    }, 1500);
  }

  const getSpecialtyLabel = (value: string) => {
    return specialties.find(specialty => specialty.value === value)?.label || value;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to max 3 files
      const newFiles = [...uploadedFiles, ...filesArray].slice(0, 3);
      setUploadedFiles(newFiles);
      
      // Create preview URLs
      const newImagePreviews = newFiles.map(file => URL.createObjectURL(file));
      setUploadedImagePreviews(newImagePreviews);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...uploadedFiles];
    const newPreviews = [...uploadedImagePreviews];
    
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(uploadedImagePreviews[index]);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setUploadedFiles(newFiles);
    setUploadedImagePreviews(newPreviews);
  };

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">أسئلة المرضى</h1>
        <p className="text-gray-600 mb-10 text-center">اطرح سؤالك الطبي واحصل على إجابات من أطباء متخصصين</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>اطرح سؤالك</CardTitle>
                  <CardDescription>
                    سيقوم الأطباء المختصون بالإجابة على سؤالك في أقرب وقت ممكن
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الاسم الكامل</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل اسمك الكامل" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>التخصص</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر التخصص المناسب لسؤالك" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {specialties.map((specialty) => (
                                  <SelectItem key={specialty.value} value={specialty.value}>
                                    {specialty.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>عنوان السؤال</FormLabel>
                            <FormControl>
                              <Input placeholder="اكتب عنواناً مختصراً لسؤالك" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>السؤال</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="اكتب سؤالك بالتفصيل..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              كلما كان سؤالك أكثر تفصيلاً، كانت الإجابات أكثر دقة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <Label htmlFor="images">إرفاق صور (اختياري)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Label 
                            htmlFor="image-upload" 
                            className="cursor-pointer flex items-center gap-2 bg-gray-100 px-3 py-2 rounded border hover:bg-gray-200 transition-colors"
                          >
                            <Image size={18} />
                            <span>إضافة صورة</span>
                          </Label>
                          <Input 
                            id="image-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileChange} 
                            multiple 
                            disabled={uploadedFiles.length >= 3}
                          />
                          <p className="text-xs text-gray-500 mt-0">
                            (الحد الأقصى: 3 صور)
                          </p>
                        </div>
                        
                        {uploadedImagePreviews.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {uploadedImagePreviews.map((src, index) => (
                              <div key={index} className="relative">
                                <img 
                                  src={src} 
                                  alt={`Uploaded ${index + 1}`} 
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <button 
                                  type="button"
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
                                  onClick={() => removeImage(index)}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-500">
                          يمكنك إرفاق صور ذات صلة بسؤالك لمساعدة الأطباء على فهم حالتك بشكل أفضل
                        </p>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        نشر السؤال
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6">الأسئلة والإجابات</h2>
            
            {questions.length > 0 ? (
              <div className="space-y-8">
                {questions.map((q) => (
                  <Card key={q.id} className="overflow-visible">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{q.title}</CardTitle>
                          <CardDescription>
                            <span className="block">{q.fullName} · {q.date}</span>
                            <span className="text-medical-primary">{getSpecialtyLabel(q.specialty)}</span>
                          </CardDescription>
                        </div>
                        <div className="px-3 py-1 bg-medical-primary/10 text-medical-primary rounded-full text-xs">
                          {q.answers.length} {q.answers.length === 1 ? 'إجابة' : 'إجابات'}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{q.question}</p>
                      
                      {/* Display attached images if any */}
                      {q.images && q.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 my-3">
                          {q.images.map((src, index) => (
                            <img 
                              key={index} 
                              src={src} 
                              alt={`صورة مرفقة ${index + 1}`} 
                              className="w-24 h-24 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                      
                      {q.answers.length > 0 && (
                        <div className="space-y-4 mt-6 pt-6 border-t">
                          <h3 className="font-semibold">الإجابات ({q.answers.length})</h3>
                          
                          {q.answers.map((answer) => (
                            <div key={answer.id} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center mb-3">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={answer.doctorImage} alt={answer.doctorName} />
                                  <AvatarFallback>{answer.doctorName.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{answer.doctorName}</h4>
                                  <p className="text-sm text-gray-500">{answer.doctorSpecialty} · {answer.date}</p>
                                </div>
                              </div>
                              <p className="text-gray-800">{answer.content}</p>
                              <div className="flex items-center mt-4 text-gray-500">
                                <button className="flex items-center gap-1 text-sm">
                                  <ThumbsUp size={16} />
                                  <span>{answer.likes}</span>
                                </button>
                                <span className="mx-2">·</span>
                                <button className="flex items-center gap-1 text-sm">
                                  <MessageSquare size={16} />
                                  <span>رد</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">لا توجد أسئلة حالياً</h3>
                <p className="text-gray-600">كن أول من يطرح سؤالاً على أطبائنا المختصين</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientQuestions;
