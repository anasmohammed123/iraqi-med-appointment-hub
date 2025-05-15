
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageLoader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, ThumbsUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  question: string;
  category: string;
  askedBy: string;
  date: string;
  status: "answered" | "pending";
  answers: Answer[];
}

interface Answer {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  content: string;
  date: string;
  likes: number;
}

const PatientQuestions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");

  // Mock data for questions and answers
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "ما هي أفضل طريقة للتعامل مع آلام الظهر المزمنة دون استخدام المسكنات؟",
      category: "عظام",
      askedBy: "أحمد",
      date: "منذ 3 أيام",
      status: "answered",
      answers: [
        {
          id: 101,
          doctorName: "د. محمد الحسن",
          doctorSpecialty: "جراحة العظام",
          doctorImage: "/placeholder.svg",
          content: "أنصحك بممارسة تمارين تقوية عضلات الظهر والبطن بشكل منتظم، مع الحرص على الجلوس بطريقة صحيحة واستخدام كرسي مريح يدعم منحنيات العمود الفقري. العلاج الطبيعي يمكن أن يكون مفيداً جداً في هذه الحالات، خاصة مع اتباع برنامج مخصص لحالتك.",
          date: "منذ يومين",
          likes: 15
        },
        {
          id: 102,
          doctorName: "د. سارة العلي",
          doctorSpecialty: "طب طبيعي وتأهيل",
          doctorImage: "/placeholder.svg",
          content: "بالإضافة لما ذكره د. محمد، أنصح بتطبيق الكمادات الدافئة على منطقة الألم لمدة 15-20 دقيقة عدة مرات يومياً. تقنيات الاسترخاء مثل اليوغا والتأمل قد تساعد في تخفيف التوتر العضلي المصاحب لآلام الظهر المزمنة.",
          date: "بالأمس",
          likes: 8
        }
      ]
    },
    {
      id: 2,
      question: "هل تناول المكملات الغذائية مثل فيتامين د وأوميغا 3 مفيد لصحة القلب؟",
      category: "قلب",
      askedBy: "فاطمة",
      date: "منذ أسبوع",
      status: "answered",
      answers: [
        {
          id: 201,
          doctorName: "د. خالد العزاوي",
          doctorSpecialty: "أمراض القلب",
          doctorImage: "/placeholder.svg",
          content: "هناك دراسات تشير إلى أن أوميغا 3 قد يكون لها تأثير إيجابي على صحة القلب من خلال خفض مستويات الدهون الثلاثية وتقليل الالتهاب. أما بالنسبة لفيتامين د، فهناك ارتباط بين نقصه وزيادة خطر الإصابة بأمراض القلب، لكن الأدلة على أن تناوله كمكمل يحسن صحة القلب لا تزال غير حاسمة. الأفضل استشارة طبيبك لتقييم حالتك الخاصة.",
          date: "منذ 5 أيام",
          likes: 23
        }
      ]
    },
    {
      id: 3,
      question: "كيف يمكنني التعامل مع الحساسية الموسمية بشكل فعال؟",
      category: "أنف وأذن وحنجرة",
      askedBy: "نور",
      date: "منذ 10 أيام",
      status: "answered",
      answers: [
        {
          id: 301,
          doctorName: "د. أحمد الخطيب",
          doctorSpecialty: "أنف وأذن وحنجرة",
          doctorImage: "/placeholder.svg",
          content: "للتعامل مع الحساسية الموسمية، أنصح بالابتعاد عن مسببات الحساسية قدر الإمكان، وإغلاق النوافذ خلال مواسم تطاير حبوب اللقاح، واستخدام جهاز تنقية الهواء في المنزل. مضادات الهيستامين غير المُسببة للنعاس يمكن أن تكون فعالة في تخفيف الأعراض مثل العطس وسيلان الأنف. استشر طبيبك إذا كانت الأعراض شديدة أو مستمرة.",
          date: "منذ 9 أيام",
          likes: 17
        }
      ]
    },
    {
      id: 4,
      question: "هل يمكن أن يسبب نقص النوم مشاكل صحية طويلة المدى؟",
      category: "عام",
      askedBy: "عمر",
      date: "منذ 5 أيام",
      status: "pending",
      answers: []
    }
  ]);

  // Categories for filtering
  const categories = [
    { name: "all", label: "الكل" },
    { name: "عظام", label: "عظام" },
    { name: "قلب", label: "قلب" },
    { name: "جلدية", label: "جلدية" },
    { name: "نفسية", label: "نفسية" },
    { name: "أنف وأذن وحنجرة", label: "أنف وأذن وحنجرة" },
    { name: "عام", label: "عام" }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filtered questions based on search and category
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          question.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || question.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة سؤالك قبل الإرسال",
        variant: "destructive"
      });
      return;
    }

    // Add new question to state
    const newQuestionObj: Question = {
      id: questions.length + 1,
      question: newQuestion,
      category: "عام", // Default category
      askedBy: user?.name || "مستخدم",
      date: "الآن",
      status: "pending",
      answers: []
    };

    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion("");
    
    toast({
      title: "تم إرسال السؤال بنجاح",
      description: "سيقوم أحد أطبائنا بالرد على سؤالك قريباً"
    });
  };

  const handleLikeAnswer = (questionId: number, answerId: number) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          answers: question.answers.map(answer => {
            if (answer.id === answerId) {
              return {
                ...answer,
                likes: answer.likes + 1
              };
            }
            return answer;
          })
        };
      }
      return question;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col dir-rtl">
      {isLoading && <PageLoader />}
      
      <Navbar />
      
      <div className="bg-gradient-to-b from-medical-light to-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">اسأل طبيباً واحصل على إجابة موثوقة</h1>
            <p className="text-xl text-gray-600 mb-8">
              اطرح أسئلتك الطبية واحصل على إجابات من أطباء معتمدين في مختلف التخصصات
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <MessageSquare size={18} />
                    اطرح سؤالاً جديداً
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>سؤال جديد</DialogTitle>
                    <DialogDescription>
                      اكتب سؤالك بوضوح للحصول على إجابة دقيقة من أطبائنا
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Textarea
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="ما هو سؤالك الطبي؟"
                      className="h-32"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitQuestion}>إرسال السؤال</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="ابحث في الأسئلة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-3 pr-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={activeCategory === category.name ? "default" : "outline"}
                onClick={() => setActiveCategory(category.name)}
                className="whitespace-nowrap"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2">{question.category}</Badge>
                      <CardTitle className="text-xl">{question.question}</CardTitle>
                      <CardDescription>
                        سأل {question.askedBy} • {question.date}
                      </CardDescription>
                    </div>
                    <Badge variant={question.status === "answered" ? "default" : "outline"}>
                      {question.status === "answered" ? "تمت الإجابة" : "بانتظار الإجابة"}
                    </Badge>
                  </div>
                </CardHeader>
                
                {question.answers.length > 0 && (
                  <CardContent>
                    <h3 className="font-semibold mb-4">
                      {question.answers.length} {question.answers.length === 1 ? "إجابة" : "إجابات"}
                    </h3>
                    
                    <div className="space-y-6">
                      {question.answers.map((answer) => (
                        <div key={answer.id} className="border rounded-lg p-4">
                          <div className="flex gap-3 mb-3">
                            <img 
                              src={answer.doctorImage} 
                              alt={answer.doctorName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold">{answer.doctorName}</p>
                              <p className="text-sm text-gray-600">{answer.doctorSpecialty}</p>
                            </div>
                          </div>
                          
                          <p className="mb-4">{answer.content}</p>
                          
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{answer.date}</span>
                            <button 
                              className="flex items-center gap-1 hover:text-medical-primary"
                              onClick={() => handleLikeAnswer(question.id, answer.id)}
                            >
                              <ThumbsUp size={16} />
                              <span>{answer.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
                
                <CardFooter>
                  {user ? (
                    <div className="w-full">
                      {question.status === "pending" && (
                        <p className="text-sm text-gray-500">
                          سيتم الرد على هذا السؤال قريباً من قبل أطبائنا المتخصصين.
                        </p>
                      )}
                      {question.status === "answered" && (
                        <p className="text-sm text-gray-500">
                          هل لديك سؤال مشابه؟{" "}
                          <Button variant="link" className="p-0 h-auto">
                            اطرح سؤالاً جديداً
                          </Button>
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      لطرح سؤال جديد أو الإعجاب بالإجابات،{" "}
                      <Button variant="link" className="p-0 h-auto">
                        قم بتسجيل الدخول
                      </Button>
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">لا توجد أسئلة مطابقة لبحثك</p>
              <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                إعادة تعيين البحث
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PatientQuestions;
