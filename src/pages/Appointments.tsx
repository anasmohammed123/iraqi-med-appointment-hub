
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Phone, Search, X, Filter, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors } from "@/data/mockData";

// Mock appointments data
const mockAppointments = [
  {
    id: "1",
    doctorId: "1",
    status: "upcoming", // upcoming, completed, cancelled
    date: "2025-05-20",
    time: "10:00 AM",
    type: "كشف",
    notes: "فحص روتيني للقلب",
    bookedAt: "2025-05-13",
  },
  {
    id: "2",
    doctorId: "2",
    status: "upcoming",
    date: "2025-05-25",
    time: "02:30 PM",
    type: "استشارة",
    notes: "متابعة نتائج التحاليل",
    bookedAt: "2025-05-10",
  },
  {
    id: "3",
    doctorId: "4",
    status: "completed",
    date: "2025-05-05",
    time: "11:00 AM",
    type: "كشف",
    notes: "مشكلة جلدية",
    bookedAt: "2025-04-28",
  },
  {
    id: "4",
    doctorId: "6",
    status: "completed",
    date: "2025-04-20",
    time: "09:30 AM",
    type: "متابعة",
    notes: "فحص سلامة الحمل",
    bookedAt: "2025-04-10",
  },
  {
    id: "5",
    doctorId: "3",
    status: "cancelled",
    date: "2025-05-10",
    time: "04:00 PM",
    type: "كشف",
    notes: "ألم في الركبة",
    cancelReason: "ظروف طارئة للطبيب",
    bookedAt: "2025-05-01",
  },
];

const Appointments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelAppointmentId, setCancelAppointmentId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState<string | null>(null);
  const [selectedNewDate, setSelectedNewDate] = useState("");
  const [selectedNewTime, setSelectedNewTime] = useState("");

  // Filter appointments based on active tab
  const filteredAppointments = mockAppointments.filter(
    (appointment) => appointment.status === activeTab
  );

  // Filter appointments based on search term
  const searchedAppointments = searchTerm
    ? filteredAppointments.filter((appointment) => {
        const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
        return (
          doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor?.nameAr.includes(searchTerm) ||
          doctor?.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor?.specialtyAr.includes(searchTerm) ||
          appointment.date.includes(searchTerm) ||
          appointment.time.includes(searchTerm)
        );
      })
    : filteredAppointments;

  const handleCancelAppointment = () => {
    // In a real app, this would make an API request to cancel the appointment
    toast({
      title: "تم إلغاء الموعد",
      description: "تم إلغاء موعدك بنجاح.",
    });
    setCancelAppointmentId(null);
    setCancelReason("");
  };

  const handleRescheduleAppointment = () => {
    if (!selectedNewDate || !selectedNewTime) {
      toast({
        title: "الرجاء اختيار التاريخ والوقت",
        description: "يرجى اختيار تاريخ ووقت جديدين للموعد.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API request to reschedule the appointment
    toast({
      title: "تم إعادة جدولة الموعد",
      description: `تم تغيير موعدك إلى ${selectedNewDate} الساعة ${selectedNewTime}.`,
    });
    setRescheduleAppointmentId(null);
    setSelectedNewDate("");
    setSelectedNewTime("");
  };

  // Sample available dates and times for rescheduling
  const availableDates = ["2025-05-21", "2025-05-22", "2025-05-23", "2025-05-24"];
  const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-medical-light py-6 px-4">
        <div className="medical-container">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مواعيدي</h1>
          <p className="text-gray-600">إدارة جميع مواعيدك الطبية في مكان واحد</p>
        </div>
      </div>

      <div className="medical-container py-8">
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن طبيب أو تخصص أو تاريخ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-3 pl-10 py-2 border-gray-300"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b grid grid-cols-3">
              <TabsTrigger value="upcoming" className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>مواعيد قادمة</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <CheckCircle className="h-4 w-4" />
                <span>مواعيد سابقة</span>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <XCircle className="h-4 w-4" />
                <span>مواعيد ملغية</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="pt-6">
              {searchedAppointments.length > 0 ? (
                <div className="space-y-6">
                  {searchedAppointments.map((appointment) => {
                    const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                    if (!doctor) return null;

                    return (
                      <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-6 md:w-1/4 bg-blue-50 flex flex-col justify-center items-center">
                              <div className="text-center">
                                <Calendar className="h-10 w-10 text-medical-primary mx-auto mb-2" />
                                <p className="text-xl font-bold text-gray-900">{appointment.date}</p>
                                <p className="text-medical-primary">{appointment.time}</p>
                              </div>
                            </div>
                            
                            <div className="p-6 flex-1">
                              <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                  <div className="flex items-center">
                                    <img
                                      src={doctor.image}
                                      alt={doctor.nameAr}
                                      className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                      <h3 className="text-xl font-bold mb-1">{doctor.nameAr}</h3>
                                      <p className="text-medical-primary mb-2">{doctor.specialtyAr}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 space-y-2">
                                    <div className="flex items-start">
                                      <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                                      <span className="text-gray-600">{doctor.hospitalAr}، {doctor.cityAr}</span>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                                      <span className="text-gray-600">مدة الكشف: 30 دقيقة</span>
                                    </div>
                                    <div className="flex items-start">
                                      <Phone className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                                      <span className="text-gray-600">{doctor.phone}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0 md:text-right">
                                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                    <span className="font-semibold">نوع الكشف:</span> {appointment.type}
                                    {appointment.notes && (
                                      <p className="text-gray-600 mt-1 text-sm">{appointment.notes}</p>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Dialog open={rescheduleAppointmentId === appointment.id} onOpenChange={(open) => !open && setRescheduleAppointmentId(null)}>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-full mb-2 border-medical-primary text-medical-primary"
                                          onClick={() => setRescheduleAppointmentId(appointment.id)}
                                        >
                                          إعادة جدولة
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>إعادة جدولة الموعد</DialogTitle>
                                          <DialogDescription>
                                            اختر تاريخًا ووقتًا جديدًا لموعدك مع {doctor.nameAr}
                                          </DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="space-y-6 py-4">
                                          <div className="space-y-2">
                                            <h3 className="font-semibold">اختر تاريخًا جديدًا</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                              {availableDates.map((date) => (
                                                <button
                                                  key={date}
                                                  onClick={() => setSelectedNewDate(date)}
                                                  className={`p-2 rounded-md text-center transition-colors ${
                                                    selectedNewDate === date
                                                      ? "bg-medical-primary text-white"
                                                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                                  }`}
                                                >
                                                  {date}
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-2">
                                            <h3 className="font-semibold">اختر وقتًا جديدًا</h3>
                                            <div className="grid grid-cols-3 gap-2">
                                              {availableTimes.map((time) => (
                                                <button
                                                  key={time}
                                                  onClick={() => setSelectedNewTime(time)}
                                                  className={`p-2 rounded-md text-center transition-colors ${
                                                    selectedNewTime === time
                                                      ? "bg-medical-primary text-white"
                                                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                                  }`}
                                                >
                                                  {time}
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <DialogFooter>
                                          <Button
                                            variant="outline"
                                            onClick={() => setRescheduleAppointmentId(null)}
                                          >
                                            إلغاء
                                          </Button>
                                          <Button
                                            className="bg-medical-primary hover:bg-medical-dark"
                                            onClick={handleRescheduleAppointment}
                                          >
                                            تأكيد إعادة الجدولة
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                    
                                    <Dialog open={cancelAppointmentId === appointment.id} onOpenChange={(open) => !open && setCancelAppointmentId(null)}>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-full border-red-500 text-red-500 hover:bg-red-50"
                                          onClick={() => setCancelAppointmentId(appointment.id)}
                                        >
                                          إلغاء الموعد
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>تأكيد إلغاء الموعد</DialogTitle>
                                          <DialogDescription>
                                            هل أنت متأكد من رغبتك في إلغاء الموعد مع {doctor.nameAr}؟
                                          </DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="py-4">
                                          <div className="space-y-2">
                                            <label htmlFor="cancel-reason" className="font-medium">
                                              سبب الإلغاء (اختياري)
                                            </label>
                                            <Input
                                              id="cancel-reason"
                                              value={cancelReason}
                                              onChange={(e) => setCancelReason(e.target.value)}
                                              placeholder="يرجى ذكر سبب الإلغاء"
                                            />
                                          </div>
                                          
                                          <div className="mt-4 text-amber-500 flex items-start">
                                            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                                            <p className="text-sm">
                                              يرجى ملاحظة أن الإلغاء قبل أقل من 24 ساعة من الموعد قد يؤدي إلى رسوم الإلغاء.
                                            </p>
                                          </div>
                                        </div>
                                        
                                        <DialogFooter>
                                          <Button
                                            variant="outline"
                                            onClick={() => setCancelAppointmentId(null)}
                                          >
                                            تراجع
                                          </Button>
                                          <Button
                                            className="bg-red-500 hover:bg-red-600 text-white"
                                            onClick={handleCancelAppointment}
                                          >
                                            تأكيد الإلغاء
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🗓️</div>
                  <h3 className="text-xl font-bold mb-2">لا توجد مواعيد قادمة</h3>
                  <p className="text-gray-600 mb-6">
                    ليس لديك أي مواعيد قادمة في هذا الوقت.
                  </p>
                  <Link to="/doctors">
                    <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                      احجز موعدًا الآن
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="pt-6">
              {searchedAppointments.length > 0 ? (
                <div className="space-y-6">
                  {searchedAppointments.map((appointment) => {
                    const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                    if (!doctor) return null;

                    return (
                      <Card key={appointment.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-6 md:w-1/4 bg-green-50 flex flex-col justify-center items-center">
                              <div className="text-center">
                                <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                                <p className="text-xl font-bold text-gray-900">{appointment.date}</p>
                                <p className="text-green-600">{appointment.time}</p>
                              </div>
                            </div>
                            
                            <div className="p-6 flex-1">
                              <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                  <div className="flex items-center">
                                    <img
                                      src={doctor.image}
                                      alt={doctor.nameAr}
                                      className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                      <h3 className="text-xl font-bold mb-1">{doctor.nameAr}</h3>
                                      <p className="text-green-600 mb-2">{doctor.specialtyAr}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 space-y-2">
                                    <div className="flex items-start">
                                      <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                                      <span className="text-gray-600">{doctor.hospitalAr}، {doctor.cityAr}</span>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                                      <span className="text-gray-600">مدة الكشف: 30 دقيقة</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0 md:text-right">
                                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                                    <span className="font-semibold">نوع الكشف:</span> {appointment.type}
                                    {appointment.notes && (
                                      <p className="text-gray-600 mt-1 text-sm">{appointment.notes}</p>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Link to={`/doctors/${doctor.id}`}>
                                      <Button
                                        className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                                      >
                                        حجز موعد جديد
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📋</div>
                  <h3 className="text-xl font-bold mb-2">لا توجد مواعيد سابقة</h3>
                  <p className="text-gray-600">
                    سيتم عرض المواعيد المكتملة هنا.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="pt-6">
              {searchedAppointments.length > 0 ? (
                <div className="space-y-6">
                  {searchedAppointments.map((appointment) => {
                    const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                    if (!doctor) return null;

                    return (
                      <Card key={appointment.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-6 md:w-1/4 bg-red-50 flex flex-col justify-center items-center">
                              <div className="text-center">
                                <XCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                                <p className="text-xl font-bold text-gray-900">{appointment.date}</p>
                                <p className="text-red-600">{appointment.time}</p>
                              </div>
                            </div>
                            
                            <div className="p-6 flex-1">
                              <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                  <div className="flex items-center">
                                    <img
                                      src={doctor.image}
                                      alt={doctor.nameAr}
                                      className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                      <h3 className="text-xl font-bold mb-1">{doctor.nameAr}</h3>
                                      <p className="text-red-600 mb-2">{doctor.specialtyAr}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 space-y-2">
                                    <div className="flex items-start">
                                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                                      <span className="text-gray-600">
                                        سبب الإلغاء: {appointment.cancelReason || "غير محدد"}
                                      </span>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                                      <span className="text-gray-600">{doctor.hospitalAr}، {doctor.cityAr}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0 md:text-right">
                                  <div className="bg-red-50 rounded-lg p-3 mb-4">
                                    <span className="font-semibold">نوع الكشف:</span> {appointment.type}
                                    {appointment.notes && (
                                      <p className="text-gray-600 mt-1 text-sm">{appointment.notes}</p>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Link to={`/doctors/${doctor.id}`}>
                                      <Button
                                        className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                                      >
                                        إعادة الحجز
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🚫</div>
                  <h3 className="text-xl font-bold mb-2">لا توجد مواعيد ملغية</h3>
                  <p className="text-gray-600">
                    ليس لديك أي مواعيد ملغية.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Appointments;
