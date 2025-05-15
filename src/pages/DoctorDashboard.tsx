
import React, { useState } from "react";
import { PageLoader } from "@/components/ui/loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Bell,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for doctor dashboard
  const appointments = [
    { id: 1, patientName: "أحمد محمود", time: "09:00 صباحاً", date: "2025-05-16", status: "confirmed", type: "video" },
    { id: 2, patientName: "سارة علي", time: "10:30 صباحاً", date: "2025-05-16", status: "confirmed", type: "phone" },
    { id: 3, patientName: "محمد عبدالله", time: "01:15 مساءً", date: "2025-05-17", status: "pending", type: "video" },
    { id: 4, patientName: "فاطمة أحمد", time: "03:00 مساءً", date: "2025-05-17", status: "canceled", type: "phone" },
  ];
  
  const questions = [
    { id: 1, patientName: "خالد عمر", question: "هل يمكنني تناول المضادات الحيوية مع أدوية الضغط؟", date: "2025-05-15", answered: false },
    { id: 2, patientName: "مريم سعيد", question: "ما هي أعراض نقص فيتامين د وكيفية علاجه؟", date: "2025-05-14", answered: true },
  ];
  
  const stats = {
    totalPatients: 142,
    thisMonthAppointments: 37,
    completedAppointments: 29,
    canceledAppointments: 5,
    pendingQuestions: 3,
    rating: 4.8,
    income: 5200,
  };
  
  const notifications = [
    { id: 1, message: "تم تأكيد موعد جديد", time: "منذ 20 دقيقة" },
    { id: 2, message: "لديك سؤال جديد من مريض", time: "منذ ساعة" },
    { id: 3, message: "تم إلغاء موعد الساعة 2:00 م", time: "منذ 3 ساعات" },
  ];
  
  // Check if user is logged in as doctor (simplified check)
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Simplified authentication check - in a real app you'd check doctor role
    // if (!user) {
    //   navigate('/doctor-login');
    // }
    
    return () => clearTimeout(timer);
  }, [navigate, user]);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col dir-rtl">
      {isLoading && <PageLoader />}
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">مرحباً د. {user?.name || "الطبيب"}</h1>
            <p className="text-gray-600">مرحباً بك في لوحة التحكم الخاصة بك</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-block bg-medical-primary text-white rounded-full px-4 py-2">
              طبيب متميز
            </span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">المرضى</p>
                <p className="text-2xl font-bold">{stats.totalPatients}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">مواعيد الشهر</p>
                <p className="text-2xl font-bold">{stats.thisMonthAppointments}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">أسئلة معلقة</p>
                <p className="text-2xl font-bold">{stats.pendingQuestions}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <MessageSquare className="text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">الإيرادات (د.ع)</p>
                <p className="text-2xl font-bold">{stats.income}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content with tabs */}
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="appointments">المواعيد</TabsTrigger>
            <TabsTrigger value="questions">الأسئلة</TabsTrigger>
            <TabsTrigger value="activity">النشاط</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>المواعيد القادمة</CardTitle>
                <CardDescription>قائمة المواعيد المحجوزة للأيام القادمة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-right bg-gray-50">
                        <th className="px-4 py-2 border-b">المريض</th>
                        <th className="px-4 py-2 border-b">التاريخ</th>
                        <th className="px-4 py-2 border-b">الوقت</th>
                        <th className="px-4 py-2 border-b">نوع الاستشارة</th>
                        <th className="px-4 py-2 border-b">الحالة</th>
                        <th className="px-4 py-2 border-b">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-4 py-3 border-b">{appointment.patientName}</td>
                          <td className="px-4 py-3 border-b">{appointment.date}</td>
                          <td className="px-4 py-3 border-b">{appointment.time}</td>
                          <td className="px-4 py-3 border-b">
                            {appointment.type === "video" ? "فيديو" : "هاتف"}
                          </td>
                          <td className="px-4 py-3 border-b">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(appointment.status)}`}>
                              {appointment.status === "confirmed" ? "مؤكد" : 
                               appointment.status === "pending" ? "معلق" : "ملغي"}
                            </span>
                          </td>
                          <td className="px-4 py-3 border-b">
                            <div className="flex space-x-2 justify-end">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Clock size={16} />
                              </button>
                              <button className="text-green-600 hover:text-green-800 mr-2">
                                <CheckCircle size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-800 mr-2">
                                <XCircle size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-600">عرض 4 من أصل 37 موعد</p>
                <button className="text-medical-primary hover:underline">
                  عرض الكل
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>أسئلة المرضى</CardTitle>
                <CardDescription>قائمة الأسئلة الواردة من المرضى</CardDescription>
              </CardHeader>
              <CardContent>
                {questions.map((question) => (
                  <div key={question.id} className="mb-4 border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{question.patientName}</p>
                        <p className="text-sm text-gray-500">{question.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        question.answered ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {question.answered ? "تمت الإجابة" : "في انتظار الإجابة"}
                      </span>
                    </div>
                    <p className="my-2">{question.question}</p>
                    <button className="bg-medical-primary text-white rounded px-3 py-1 text-sm">
                      {question.answered ? "تعديل الإجابة" : "الإجابة"}
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>ملخص النشاط</CardTitle>
                    <CardDescription>نظرة عامة على نشاط المنصة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">عدد زيارات الملف الشخصي</span>
                          <span className="text-sm font-medium">348</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">معدل تأكيد المواعيد</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">معدل الإلغاء</span>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <Progress value={8} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">معدل الرضا</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>الإشعارات الأخيرة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start border-b pb-3 last:border-0">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <Bell className="text-blue-600 w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <button className="text-medical-primary hover:underline text-sm">
                      عرض كل الإشعارات
                    </button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
