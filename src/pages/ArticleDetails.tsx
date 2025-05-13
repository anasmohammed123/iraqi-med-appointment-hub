
import { useParams, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

// Mock articles data
const articles = [
  {
    id: "1",
    title: "كيفية الوقاية من أمراض القلب",
    titleEn: "Heart Disease Prevention",
    summary: "نصائح عملية وإرشادات غذائية للحفاظ على صحة القلب والوقاية من أمراضه الشائعة",
    content: `تعتبر أمراض القلب من أكثر الأسباب المؤدية للوفاة حول العالم، لكن العديد من عوامل الخطر يمكن تعديلها من خلال نمط حياة صحي.

في هذا المقال، نستعرض النصائح العملية للحفاظ على صحة القلب والشرايين:

### التغذية السليمة
- تقليل استهلاك الدهون المشبعة والمتحولة
- زيادة تناول الخضروات والفواكه الطازجة
- تفضيل الحبوب الكاملة على المكررة
- الحد من استهلاك السكريات المضافة
- التقليل من تناول الملح

### النشاط البدني المنتظم
- ممارسة التمارين الرياضية متوسطة الشدة لمدة 150 دقيقة أسبوعياً على الأقل
- المشي السريع لمدة 30 دقيقة يومياً
- تجنب الجلوس لفترات طويلة

### الإقلاع عن التدخين
التدخين يزيد بشكل كبير من خطر الإصابة بأمراض القلب والشرايين، والإقلاع عنه يقلل هذه المخاطر بشكل ملحوظ.

### السيطرة على الأمراض المزمنة
- مراقبة ضغط الدم بانتظام
- السيطرة على مستويات السكر في الدم
- الحفاظ على مستوى الكوليسترول ضمن المعدلات الطبيعية

### إدارة التوتر والضغط النفسي
- ممارسة تقنيات الاسترخاء مثل التأمل واليوغا
- الاهتمام بالنوم الجيد
- تخصيص وقت للأنشطة المحببة والهوايات

إن اتباع هذه النصائح لا يساعد في الوقاية من أمراض القلب فحسب، بل يحسن الصحة العامة ونوعية الحياة أيضاً.`,
    author: "د. علي الحسيني",
    authorSpecialty: "طب القلب",
    date: "2025-05-10",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    readTime: 5,
    category: "القلب والأوعية الدموية",
    tags: ["قلب", "وقاية", "تغذية", "رياضة"]
  },
  {
    id: "2",
    title: "أعراض السكري المبكرة",
    titleEn: "Early Diabetes Symptoms",
    summary: "تعرف على العلامات المبكرة لمرض السكري وكيفية التعامل معها للوقاية من المضاعفات",
    content: `يعد مرض السكري من الأمراض المزمنة الشائعة، ويمكن أن تظهر أعراضه بشكل تدريجي. التشخيص المبكر يساعد في منع المضاعفات الخطيرة.

### الأعراض المبكرة لمرض السكري:

#### العطش الشديد والتبول المتكرر
زيادة نسبة السكر في الدم تؤدي إلى سحب السوائل من أنسجة الجسم، مما يسبب الشعور بالعطش. ونتيجة لذلك، يزداد التبول بشكل ملحوظ.

#### التعب والإرهاق المستمر
عدم قدرة الخلايا على استخدام السكر للحصول على الطاقة يؤدي إلى الشعور بالتعب المستمر.

#### الجوع المفرط
رغم تناول الطعام، قد تشعر بالجوع المستمر لأن خلايا الجسم لا تحصل على الطاقة الكافية.

#### فقدان الوزن غير المبرر
عندما لا يستطيع الجسم استخدام الجلوكوز للطاقة، فإنه يبدأ في حرق الدهون والعضلات، مما يؤدي إلى فقدان الوزن.

#### بطء التئام الجروح
ارتفاع نسبة السكر في الدم يمكن أن يؤثر على الدورة الدموية والجهاز المناعي، مما يبطئ عملية التئام الجروح.

#### اضطرابات الرؤية
ارتفاع مستويات السكر يمكن أن يسبب تورماً في عدسة العين، مما يؤثر على الرؤية الواضحة.

#### تنميل أو وخز في اليدين أو القدمين
ارتفاع السكر المزمن يمكن أن يضر الأعصاب، مسبباً الشعور بالتنميل أو الوخز.

### متى يجب استشارة الطبيب؟
إذا لاحظت أياً من هذه الأعراض، خاصة إذا كنت من الفئات الأكثر عرضة للإصابة بالسكري، مثل:

- وجود تاريخ عائلي للمرض
- زيادة الوزن أو السمنة
- قلة النشاط البدني
- التقدم في العمر (فوق 45 عاماً)

فمن المهم استشارة الطبيب لإجراء الفحوصات اللازمة.

### الوقاية والسيطرة
- الحفاظ على وزن صحي
- ممارسة النشاط البدني بانتظام
- اتباع نظام غذائي متوازن
- الفحص الدوري إذا كنت من الفئات المعرضة للخطر

التشخيص المبكر والعلاج المناسب يساعدان بشكل كبير في السيطرة على المرض وتجنب المضاعفات الخطيرة مثل أمراض القلب، اعتلال الكلى، واعتلال الشبكية.`,
    author: "د. سارة العبيدي",
    authorSpecialty: "طب الغدد والسكري",
    date: "2025-05-08",
    image: "https://images.unsplash.com/photo-1560306843-33986aebaf12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    readTime: 4,
    category: "السكري والغدد",
    tags: ["سكري", "صحة", "أعراض", "وقاية"]
  }
];

// Get related articles by tags intersection
const getRelatedArticles = (currentArticle: any) => {
  return articles
    .filter(article => article.id !== currentArticle.id)
    .filter(article => article.tags.some(tag => currentArticle.tags.includes(tag)))
    .slice(0, 3);
};

// Format date to Arabic format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the article based on ID parameter
  const article = articles.find(article => article.id === id);
  
  // If article not found, show error
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">المقال غير موجود</h1>
            <p className="mb-6">عذراً، لم يتم العثور على المقال المطلوب.</p>
            <Link to="/articles">
              <Button>العودة إلى قائمة المقالات</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related articles
  const relatedArticles = getRelatedArticles(article);

  // Share article
  const handleShare = (platform: 'copy' | 'facebook' | 'twitter') => {
    const url = window.location.href;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
        .then(() => {
          toast({
            title: "تم نسخ الرابط",
            description: "تم نسخ رابط المقال إلى الحافظة.",
          });
        })
        .catch(() => {
          toast({
            title: "فشل النسخ",
            description: "حدث خطأ أثناء نسخ الرابط.",
            variant: "destructive",
          });
        });
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${article.title}`, '_blank');
    }
  };

  // Save article
  const handleSave = () => {
    toast({
      title: "تم حفظ المقال",
      description: "تم إضافة المقال إلى المقالات المحفوظة.",
    });
  };

  // Create HTML from markdown content
  const createMarkup = () => {
    // Convert markdown-like content to HTML (very simple conversion)
    let html = article.content
      .replace(/### (.*)/g, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
      .replace(/#### (.*)/g, '<h4 class="text-lg font-bold mt-5 mb-2">$1</h4>')
      .replace(/- (.*)/g, '<li class="mb-1">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">');
    
    // Wrap lists in ul tags
    const listRegex = /<li>(.*?)<\/li>/g;
    const matches = html.match(listRegex);
    
    if (matches) {
      matches.forEach((match, i) => {
        if (i === 0 || !matches[i-1]) {
          html = html.replace(match, `<ul class="list-disc mr-6 my-3">${match}`);
        } else if (i === matches.length - 1 || !matches[i+1]) {
          html = html.replace(match, `${match}</ul>`);
        }
      });
    }
    
    return { __html: `<p class="mb-4">${html}</p>` };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Article Hero Section */}
      <div className="relative">
        <div className="h-72 md:h-96 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-32 md:-mt-40 z-10 px-4 md:px-0">
            <Badge className="mb-4 bg-medical-primary text-white">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 ml-1" />
                {formatDate(article.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 ml-1" />
                {article.readTime} دقائق قراءة
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 ml-1" />
                {article.author}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Article Actions */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b">
            <Link to="/articles" className="flex items-center text-gray-600 hover:text-medical-primary">
              <ArrowLeft className="h-4 w-4 ml-1" />
              العودة للمقالات
            </Link>
            
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => handleShare('copy')}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>نسخ الرابط</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => handleShare('facebook')}>
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>مشاركة على فيسبوك</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => handleShare('twitter')}>
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>مشاركة على تويتر</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleSave}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>حفظ المقال</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Article Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <p className="font-semibold text-lg">{article.summary}</p>
          </div>
          
          {/* Article Body */}
          <div className="prose prose-lg max-w-none dark:prose-invert leading-relaxed" dir="rtl">
            <div dangerouslySetInnerHTML={createMarkup()} />
          </div>
          
          {/* Article Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {article.tags.map((tag, index) => (
              <Link to={`/articles?tag=${tag}`} key={index}>
                <Badge variant="outline" className="cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          
          {/* Author Info */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-medical-light text-medical-primary flex items-center justify-center text-xl font-bold ml-4">
                  {article.author.substr(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{article.author}</h3>
                  <p className="text-gray-600">{article.authorSpecialty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">مقالات ذات صلة</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map((relatedArticle) => (
                  <Link to={`/articles/${relatedArticle.id}`} key={relatedArticle.id}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2">{relatedArticle.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-3 w-3 ml-1" />
                          {formatDate(relatedArticle.date)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ArticleDetails;
