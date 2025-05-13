
import { useState } from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    "الصحة العامة",
    "صحة القلب",
    "صحة الأطفال",
    "التغذية",
    "الرياضة",
    "الصحة النفسية",
  ];
  
  // Mock articles data
  const [articles] = useState([
    {
      id: 1,
      title: "فوائد ممارسة الرياضة بانتظام",
      summary: "تعرف على التأثيرات الإيجابية للرياضة على الصحة الجسدية والنفسية",
      category: "الرياضة",
      imageUrl: "https://via.placeholder.com/600x400",
      date: "10 مايو 2025",
      author: "د. محمد أحمد",
      readTime: "5 دقائق",
    },
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
      id: 3,
      title: "أهمية التطعيمات للأطفال",
      summary: "دليل شامل حول اللقاحات الأساسية وجدول التطعيمات للأطفال",
      category: "صحة الأطفال",
      imageUrl: "https://via.placeholder.com/600x400",
      date: "1 مايو 2025",
      author: "د. سارة العلي",
      readTime: "6 دقائق",
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
    {
      id: 6,
      title: "الفحوصات الطبية الدورية: دليلك الشامل",
      summary: "أهم الفحوصات الطبية التي يجب إجراؤها بشكل دوري للحفاظ على صحتك",
      category: "الصحة العامة",
      imageUrl: "https://via.placeholder.com/600x400",
      date: "20 أبريل 2025",
      author: "د. خالد العبدالله",
      readTime: "9 دقائق",
    },
  ]);
  
  // Filter articles based on search term and selected category
  const filteredArticles = articles.filter(
    (article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">المقالات الطبية</h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative md:w-1/3">
              <Input
                type="text"
                placeholder="ابحث عن مقالات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Badge
                className={`cursor-pointer ${!selectedCategory ? 'bg-medical-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setSelectedCategory(null)}
              >
                الكل
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  className={`cursor-pointer ${selectedCategory === category ? 'bg-medical-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} to={`/articles/${article.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <div className="p-4">
                        <Badge className="mb-2">{article.category}</Badge>
                        <h2 className="font-bold text-lg mb-2">{article.title}</h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">لا توجد مقالات تطابق بحثك</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
