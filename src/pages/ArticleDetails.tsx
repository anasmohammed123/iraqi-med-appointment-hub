
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock article data fetch
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would be replaced with an actual API call
      const mockArticle = {
        id: parseInt(id || "1"),
        title: "فوائد ممارسة الرياضة بانتظام",
        summary: "تعرف على التأثيرات الإيجابية للرياضة على الصحة الجسدية والنفسية",
        category: "الرياضة",
        imageUrl: "https://via.placeholder.com/1200x600",
        date: "10 مايو 2025",
        author: "د. محمد أحمد",
        authorImage: "https://via.placeholder.com/100",
        authorTitle: "أخصائي الطب الرياضي",
        readTime: "5 دقائق",
        content: `
          <p>تعتبر ممارسة الرياضة بانتظام من أهم العادات الصحية التي يمكن للإنسان أن يتبناها للحفاظ على صحته الجسدية والنفسية. فالنشاط البدني المنتظم يعزز صحة القلب والأوعية الدموية، ويساعد في الحفاظ على وزن صحي، ويقلل من خطر الإصابة بالأمراض المزمنة مثل السكري وارتفاع ضغط الدم.</p>
          
          <h2>فوائد الرياضة للصحة الجسدية</h2>
          
          <p>تمد ممارسة الرياضة بانتظام الجسم بالعديد من الفوائد الصحية، منها:</p>
          
          <ul>
            <li>تقوية عضلة القلب وتحسين كفاءة الدورة الدموية</li>
            <li>زيادة مستويات الطاقة وتحسين القدرة على التحمل</li>
            <li>تقوية العضلات والعظام وتحسين المرونة</li>
            <li>تعزيز جهاز المناعة ومقاومة الأمراض</li>
            <li>تحسين جودة النوم</li>
            <li>المساعدة في الحفاظ على وزن صحي</li>
          </ul>
          
          <h2>فوائد الرياضة للصحة النفسية</h2>
          
          <p>لا تقتصر فوائد ممارسة الرياضة على الصحة الجسدية فقط، بل تمتد لتشمل الصحة النفسية أيضاً. فقد أثبتت الدراسات العلمية أن ممارسة الرياضة بانتظام تساهم في:</p>
          
          <ul>
            <li>تخفيف التوتر والقلق</li>
            <li>تحسين المزاج وزيادة الشعور بالسعادة</li>
            <li>تعزيز الثقة بالنفس وتحسين صورة الذات</li>
            <li>زيادة القدرة على التركيز</li>
            <li>تقليل خطر الإصابة بالاكتئاب</li>
          </ul>
          
          <h2>كيف تبدأ روتيناً رياضياً منتظماً؟</h2>
          
          <p>إليك بعض النصائح التي تساعدك على البدء في ممارسة الرياضة بانتظام:</p>
          
          <ol>
            <li>اختر نشاطاً رياضياً تستمتع به، سواء كان المشي أو الجري أو السباحة أو ركوب الدراجة أو غيرها</li>
            <li>ابدأ ببطء وتدرج في زيادة شدة ومدة التمارين</li>
            <li>حدد أهدافاً واقعية وقابلة للتحقيق</li>
            <li>جدول وقتاً ثابتاً للرياضة في يومك</li>
            <li>مارس الرياضة مع صديق أو ضمن مجموعة لزيادة الحافز والالتزام</li>
          </ol>
          
          <p>ختاماً، تذكر أن الالتزام بممارسة الرياضة بانتظام هو استثمار في صحتك على المدى الطويل. لا يشترط أن تكون التمارين شاقة أو طويلة، فحتى 30 دقيقة من المشي السريع يومياً يمكن أن تحدث فرقاً كبيراً في صحتك العامة.</p>
        `,
        tags: ["الرياضة", "الصحة", "اللياقة البدنية", "العافية"]
      };
      
      const mockRelatedArticles = [
        {
          id: 2,
          title: "نصائح للوقاية من أمراض القلب",
          summary: "إرشادات هامة للحفاظ على صحة القلب والشرايين",
          category: "صحة القلب",
          imageUrl: "https://via.placeholder.com/600x400",
          date: "5 مايو 2025",
          author: "د. فاطمة محمود",
          readTime: "7 دقائق",
        },
        {
          id: 4,
          title: "العناصر الغذائية الأساسية في نظامك اليومي",
          summary: "تعرف على أهم العناصر الغذائية التي يحتاجها جسمك يومياً",
          category: "التغذية",
          imageUrl: "https://via.placeholder.com/600x400",
          date: "28 أبريل 2025",
          author: "د. علي حسن",
          readTime: "8 دقائق",
        },
        {
          id: 5,
          title: "كيفية التعامل مع القلق والتوتر",
          summary: "استراتيجيات عملية للتخفيف من التوتر وتحسين الصحة النفسية",
          category: "الصحة النفسية",
          imageUrl: "https://via.placeholder.com/600x400",
          date: "25 أبريل 2025",
          author: "د. نور الهدى",
          readTime: "10 دقائق",
        },
      ];
      
      setArticle(mockArticle);
      setRelatedArticles(mockRelatedArticles);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-medical-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Article Header */}
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{article.summary}</p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} className="text-gray-500" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-500" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-500" />
                <span>{article.readTime} للقراءة</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Featured Image */}
        <div className="container mx-auto px-4 py-6">
          <AspectRatio ratio={21/9} className="rounded-lg overflow-hidden shadow-md mb-8">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
        
        {/* Article Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-3/4">
              <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
              
              <div className="flex flex-wrap gap-2 mt-8">
                {article.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              {/* Author Info */}
              <div className="border-t border-gray-200 mt-8 pt-8">
                <div className="flex items-center gap-4">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{article.author}</h3>
                    <p className="text-gray-600">{article.authorTitle}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <h3 className="font-bold text-lg mb-4">مقالات ذات صلة</h3>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} to={`/articles/${relatedArticle.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <AspectRatio ratio={16/9} className="mb-3">
                          <img
                            src={relatedArticle.imageUrl}
                            alt={relatedArticle.title}
                            className="object-cover w-full h-full rounded-md"
                          />
                        </AspectRatio>
                        <h4 className="font-medium line-clamp-2">{relatedArticle.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{relatedArticle.date}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetails;
