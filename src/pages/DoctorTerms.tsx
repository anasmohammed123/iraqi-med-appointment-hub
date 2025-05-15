
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageLoader } from "@/components/ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const DoctorTerms = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Pricing plans data
  const plans = [
    {
      id: "basic",
      name: "الخطة الأساسية",
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        "إنشاء ملف تعريفي كامل",
        "استقبال حتى 20 موعداً شهرياً",
        "الرد على الأسئلة (حتى 30 شهرياً)",
        "استشارات هاتفية",
        "تقارير أساسية",
      ],
      notIncluded: [
        "استشارات فيديو",
        "الأولوية في نتائج البحث",
        "خاصية المتابعة المستمرة للمرضى",
        "دعم فني متميز",
      ]
    },
    {
      id: "pro",
      name: "الخطة المتقدمة",
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: true,
      features: [
        "جميع مميزات الخطة الأساسية",
        "استقبال حتى 50 موعداً شهرياً",
        "الرد على الأسئلة (غير محدود)",
        "استشارات فيديو كاملة",
        "تقارير متقدمة وتحليلات",
        "الأولوية في نتائج البحث",
        "دعم فني متميز",
      ],
      notIncluded: [
        "خاصية المتابعة المستمرة للمرضى",
        "أدوات التشخيص المتقدمة",
      ]
    },
    {
      id: "premium",
      name: "الخطة الاحترافية",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "جميع مميزات الخطة المتقدمة",
        "عدد غير محدود من المواعيد",
        "خاصية المتابعة المستمرة للمرضى",
        "أعلى أولوية في نتائج البحث",
        "أدوات التشخيص المتقدمة",
        "دعم فني متميز على مدار الساعة",
        "تحليلات وتقارير شاملة",
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="min-h-screen flex flex-col dir-rtl">
      {isLoading && <PageLoader />}
      
      <Navbar />
      
      <div className="bg-gradient-to-b from-medical-light to-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">انضم إلى شبكة أطبائنا المميزين</h1>
            <p className="text-xl text-gray-600">
              ابدأ في استقبال المرضى عبر الإنترنت وتوسيع نطاق ممارستك الطبية
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="pricing">خطط الاشتراك</TabsTrigger>
            <TabsTrigger value="terms">الشروط والأحكام</TabsTrigger>
            <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pricing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative h-full flex flex-col ${
                    plan.popular ? "border-medical-primary shadow-lg ring-1 ring-medical-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-medical-primary text-white text-sm px-3 py-1 rounded-full">
                        الأكثر شيوعاً
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-center">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Tabs defaultValue="monthly" className="w-full mb-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="monthly">شهري</TabsTrigger>
                        <TabsTrigger value="yearly">سنوي</TabsTrigger>
                      </TabsList>
                      <TabsContent value="monthly" className="text-center py-4">
                        <span className="text-3xl font-bold">{plan.monthlyPrice} د.ع</span>
                        <span className="text-gray-500"> / شهرياً</span>
                      </TabsContent>
                      <TabsContent value="yearly" className="text-center py-4">
                        <span className="text-3xl font-bold">{plan.yearlyPrice} د.ع</span>
                        <span className="text-gray-500"> / سنوياً</span>
                        <p className="text-medical-primary text-sm mt-1">توفير 15%</p>
                      </TabsContent>
                    </Tabs>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="text-green-600 h-5 w-5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feature, index) => (
                        <li key={`not-${index}`} className="flex items-center gap-2 text-gray-400">
                          <span className="text-gray-300 h-5 w-5 flex-shrink-0">✖</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <div className="p-6 mt-auto">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-medical-primary hover:bg-medical-primary/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      اختر هذه الخطة
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-16 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">هل أنت مركز طبي أو مستشفى؟</h3>
              <p className="mb-6 text-gray-600">
                نقدم خططاً خاصة للمؤسسات الطبية الكبيرة. تواصل مع فريقنا للحصول على عرض سعر مخصص.
              </p>
              <Button variant="outline" size="lg">
                تواصل معنا للحصول على عرض خاص
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="terms">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>الشروط والأحكام للأطباء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. التسجيل والمؤهلات</h3>
                  <p className="text-gray-700">
                    يجب على جميع الأطباء تقديم وثائق تثبت مؤهلاتهم الطبية، بما في ذلك شهادات التخرج وشهادات الترخيص المهني. سيتم التحقق من جميع المستندات قبل الموافقة على حسابك. يجب أن يمتلك الطبيب المسجل ترخيصاً سارياً لممارسة الطب في البلد/المنطقة التي يعمل بها.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">2. جودة الخدمة</h3>
                  <p className="text-gray-700">
                    نلتزم بتقديم أعلى مستوى من الرعاية للمرضى. يجب على الأطباء الالتزام بمعايير الرعاية المهنية، واحترام مواعيد الاستشارات، والرد على أسئلة المرضى في الوقت المناسب. تلتزم بالحفاظ على مستوى رضا لا يقل عن 4.0 من 5.0 نجوم في تقييمات المرضى.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">3. الخصوصية والسرية</h3>
                  <p className="text-gray-700">
                    يجب الحفاظ على خصوصية وسرية بيانات المرضى في جميع الأوقات، وفقاً للقوانين والأنظمة المحلية والدولية المعمول بها. لا يُسمح بمشاركة معلومات المرضى مع أي طرف ثالث دون موافقة صريحة من المريض، إلا في الحالات التي يتطلبها القانون.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">4. الرسوم والمدفوعات</h3>
                  <p className="text-gray-700">
                    ستحصل على 80% من رسوم الاستشارة المدفوعة من قبل المريض. سيتم تحويل المدفوعات إليك بشكل شهري للاستشارات المكتملة. يرجى ملاحظة أنه قد يتم خصم الضرائب المطبقة قبل الدفع، اعتماداً على القوانين المحلية في بلدك.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">5. إلغاء الاشتراك</h3>
                  <p className="text-gray-700">
                    يمكنك إلغاء اشتراكك في أي وقت بإشعار مسبق مدته 30 يوماً. سيتم استرداد رسوم الاشتراك المدفوعة مسبقاً على أساس تناسبي، باستثناء رسوم الشهر الأول. يرجى ملاحظة أنه في حالة انتهاك أي من شروط الاستخدام، نحتفظ بالحق في تعليق أو إنهاء حسابك دون إشعار مسبق.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">6. التوافر والاستجابة</h3>
                  <p className="text-gray-700">
                    يُتوقع من الأطباء تحديث حالة توافرهم بانتظام وتأكيد أو رفض طلبات المواعيد في غضون 24 ساعة. يجب الرد على الأسئلة المكتوبة من المرضى في غضون 48 ساعة. الاستشارات المحدَدة مواعيدها يجب الالتزام بها في الوقت المحدد، مع سماح تأخير لا يتجاوز 10 دقائق.
                  </p>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <p className="text-gray-600 italic">
                    بالتسجيل كطبيب على منصتنا، فإنك توافق على جميع الشروط والأحكام المذكورة أعلاه. نحتفظ بالحق في تحديث هذه الشروط والأحكام من وقت لآخر، وسيتم إخطارك بأي تغييرات جوهرية.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">كيف يمكنني التسجيل كطبيب على المنصة؟</h3>
                      <p className="text-gray-700">
                        يمكنك التسجيل من خلال النقر على زر "تسجيل كطبيب" في أعلى الصفحة الرئيسية. ستحتاج إلى تقديم معلوماتك الشخصية ووثائقك المهنية، بما في ذلك شهادة التخرج وترخيص مزاولة المهنة. سيتم مراجعة طلبك خلال 2-3 أيام عمل.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">كيف أحدد رسوم الاستشارة الخاصة بي؟</h3>
                      <p className="text-gray-700">
                        يمكنك تحديد رسوم الاستشارة الخاصة بك من لوحة التحكم الخاصة بك. نوصي بتحديد الأسعار بناءً على تخصصك والخدمات التي تقدمها. يمكنك تعديل الأسعار في أي وقت، لكنها ستنطبق فقط على المواعيد الجديدة.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">هل يمكنني تحديد ساعات عملي على المنصة؟</h3>
                      <p className="text-gray-700">
                        نعم، لديك حرية كاملة في تحديد ساعات التوفر الخاصة بك. يمكنك تعيين جدول زمني منتظم أو تحديث توافرك أسبوعياً. سيتمكن المرضى من حجز مواعيد فقط خلال الساعات التي تحددها كمتاحة.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">كيف أتلقى مدفوعاتي؟</h3>
                      <p className="text-gray-700">
                        سيتم تحويل المدفوعات إلى حسابك المصرفي المسجل شهرياً. تتم معالجة المدفوعات في الأسبوع الأول من كل شهر للاستشارات المكتملة في الشهر السابق. يمكنك عرض تقرير مفصل بجميع الاستشارات والمدفوعات في لوحة التحكم الخاصة بك.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">هل أحتاج إلى معدات خاصة لإجراء استشارات الفيديو؟</h3>
                      <p className="text-gray-700">
                        تحتاج إلى كمبيوتر أو جهاز محمول (هاتف ذكي أو جهاز لوحي) مع كاميرا وميكروفون، واتصال إنترنت مستقر. نوصي باستخدام سماعات رأس للحصول على جودة صوت أفضل وضمان الخصوصية. منصتنا متوافقة مع معظم المتصفحات الحديثة، ولا تحتاج إلى تثبيت برامج إضافية.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">هل يمكنني طلب المساعدة في استخدام المنصة؟</h3>
                      <p className="text-gray-700">
                        نعم، نوفر جلسات تدريبية افتراضية لجميع الأطباء الجدد للتعرف على كيفية استخدام المنصة. بالإضافة إلى ذلك، لدينا فريق دعم متاح على مدار الساعة للإجابة على أي أسئلة أو حل أي مشكلات قد تواجهها. يمكنك الوصول إلى فريق الدعم عبر البريد الإلكتروني أو الدردشة المباشرة من لوحة التحكم الخاصة بك.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorTerms;
