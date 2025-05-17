
import React from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Users, StarIcon } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">عن Iraqi Med Hub</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">منصة طبية متكاملة تهدف إلى ربط المرضى بأفضل الأطباء والمستشفيات في العراق لتقديم رعاية صحية عالية الجودة وسهلة الوصول</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">رؤيتنا ومهمتنا</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">رؤيتنا</h3>
              <p className="text-gray-700">
                نسعى لأن نكون المنصة الطبية الرائدة في العراق والشرق الأوسط التي توفر رعاية صحية ذات جودة عالية وسهلة الوصول لجميع المواطنين. نتطلع إلى تحويل تجربة الرعاية الصحية من خلال التكنولوجيا والابتكار.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">مهمتنا</h3>
              <p className="text-gray-700">
                تسهيل وصول المرضى إلى الرعاية الصحية المناسبة في الوقت المناسب من خلال ربطهم بالأطباء المناسبين والمؤسسات الصحية عالية الجودة. نلتزم بتحسين تجربة المرضى وكفاءة نظام الرعاية الصحية في العراق.
              </p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&q=75&fit=crop&crop=top&w=1200&h=630" 
              alt="Iraqi Med Hub Team" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
              <h3 className="text-2xl font-bold mb-2">فريق متخصص</h3>
              <p>نضم مجموعة من الخبراء والمتخصصين في مجال الرعاية الصحية والتكنولوجيا</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="values" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="values">قيمنا</TabsTrigger>
            <TabsTrigger value="achievements">إنجازاتنا</TabsTrigger>
            <TabsTrigger value="future">خطتنا المستقبلية</TabsTrigger>
          </TabsList>
          <TabsContent value="values">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-medical-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="text-medical-primary" size={28} />
                  </div>
                  <CardTitle>المريض أولاً</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    نضع احتياجات وراحة المرضى في مقدمة أولوياتنا ونسعى دائمًا لتحسين تجربتهم مع نظام الرعاية الصحية.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-medical-primary/10 rounded-full flex items-center justify-center mb-4">
                    <StarIcon className="text-medical-primary" size={28} />
                  </div>
                  <CardTitle>الجودة والتميز</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    نلتزم بتقديم خدمات ذات جودة عالية ونعمل باستمرار على تطوير منصتنا لتلبية أعلى المعايير العالمية.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-medical-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Check className="text-medical-primary" size={28} />
                  </div>
                  <CardTitle>الشفافية والأمانة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    نؤمن بالشفافية في عملنا ونتعامل بأمانة ومصداقية مع جميع الأطراف من مرضى وأطباء ومؤسسات صحية.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>إنجازاتنا في أرقام</CardTitle>
                <CardDescription>نفخر بما حققناه خلال مسيرتنا في خدمة المرضى والأطباء في العراق</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">عدد الأطباء المسجلين</span>
                    <span className="text-medical-primary font-bold">+2500</span>
                  </div>
                  <Progress value={75} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">المواعيد المحجوزة</span>
                    <span className="text-medical-primary font-bold">+50,000</span>
                  </div>
                  <Progress value={85} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">المستشفيات المشاركة</span>
                    <span className="text-medical-primary font-bold">+120</span>
                  </div>
                  <Progress value={60} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">تقييم رضا المرضى</span>
                    <span className="text-medical-primary font-bold">91%</span>
                  </div>
                  <Progress value={91} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="future">
            <Card>
              <CardHeader>
                <CardTitle>خطتنا المستقبلية</CardTitle>
                <CardDescription>نعمل باستمرار على تطوير منصتنا وتوسيع نطاق خدماتنا لخدمة المزيد من المرضى والأطباء</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-medical-primary/10 p-3 rounded h-fit">
                        <Check className="text-medical-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">توسيع التغطية الجغرافية</h4>
                        <p className="text-gray-600">التوسع في جميع محافظات العراق وزيادة شبكة الأطباء والمستشفيات المشاركة.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="bg-medical-primary/10 p-3 rounded h-fit">
                        <Check className="text-medical-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">تطوير خدمات الاستشارات عن بعد</h4>
                        <p className="text-gray-600">توسيع نطاق خدمات الطب عن بعد لتوفير الرعاية الصحية للمناطق النائية.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-medical-primary/10 p-3 rounded h-fit">
                        <Check className="text-medical-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">تحليل البيانات الصحية</h4>
                        <p className="text-gray-600">استخدام الذكاء الاصطناعي لتحليل البيانات الصحية وتقديم رعاية شخصية أفضل.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="bg-medical-primary/10 p-3 rounded h-fit">
                        <Check className="text-medical-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">شراكات استراتيجية</h4>
                        <p className="text-gray-600">بناء شراكات مع مؤسسات التأمين الصحي ووزارة الصحة لتحسين الوصول للرعاية.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">فريق الإدارة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                  <Skeleton className="w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold">د. {["أحمد الحسن", "سارة العلي", "محمد الصالح"][i-1]}</h3>
                <p className="text-gray-600">{["المدير التنفيذي", "مدير العمليات", "المدير الطبي"][i-1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
