import React, { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageLoader } from "@/components/ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, Activity, DollarSign } from "lucide-react";
import { useHomePageData } from "@/hooks/useHomePageData";

// Stats data
const statsData = {
  dailyAppointments: {
    count: 247,
    change: 12.4,
    positive: true
  },
  doctors: {
    count: 1256,
    change: 8.2,
    positive: true
  },
  patients: {
    count: 32450,
    change: 15.6,
    positive: true
  },
  revenue: {
    count: 18635,
    change: -2.3,
    positive: false
  }
};

// Chart data (mock data)
const appointmentsData = [
  { name: 'السبت', value: 120 },
  { name: 'الأحد', value: 152 },
  { name: 'الاثنين', value: 187 },
  { name: 'الثلاثاء', value: 165 },
  { name: 'الأربعاء', value: 198 },
  { name: 'الخميس', value: 247 },
  { name: 'الجمعة', value: 110 },
];

const departmentsData = [
  { name: 'القلب', value: 25 },
  { name: 'العيون', value: 18 },
  { name: 'الأطفال', value: 22 },
  { name: 'الجلدية', value: 15 },
  { name: 'العظام', value: 20 },
];

const onlineDoctorsData = [
  { name: '8 صباحًا', online: 32, consultation: 15 },
  { name: '10 صباحًا', online: 45, consultation: 28 },
  { name: '12 ظهرًا', online: 56, consultation: 34 },
  { name: '2 مساءً', online: 62, consultation: 40 },
  { name: '4 مساءً', online: 58, consultation: 32 },
  { name: '6 مساءً', online: 49, consultation: 30 },
  { name: '8 مساءً', online: 37, consultation: 22 },
];

const revenueData = [
  { name: 'كانون ٢', value: 12500 },
  { name: 'شباط', value: 14800 },
  { name: 'آذار', value: 13200 },
  { name: 'نيسان', value: 15700 },
  { name: 'أيار', value: 17800 },
  { name: 'حزيران', value: 18600 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const Dashboard = () => {
  const { isLoading, simulateLoading } = useHomePageData();
  const [chartData, setChartData] = useState({
    appointments: appointmentsData,
    departments: departmentsData,
    onlineDoctors: onlineDoctorsData,
    revenue: revenueData
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update appointments data with slight random variations
      const newAppointments = chartData.appointments.map(item => ({
        ...item,
        value: Math.max(80, Math.min(250, item.value + Math.floor(Math.random() * 20) - 10))
      }));

      // Update online doctors data
      const newOnlineDoctors = chartData.onlineDoctors.map(item => ({
        ...item,
        online: Math.max(20, Math.min(70, item.online + Math.floor(Math.random() * 6) - 3)),
        consultation: Math.max(10, Math.min(50, item.consultation + Math.floor(Math.random() * 4) - 2))
      }));

      setChartData({
        ...chartData,
        appointments: newAppointments,
        onlineDoctors: newOnlineDoctors
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [chartData]);

  // Initial loading effect
  useEffect(() => {
    simulateLoading(() => {}, 1500);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ar-IQ');
  };

  return (
    <PageLayout>
      {isLoading && <PageLoader />}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
            <p className="text-gray-600">مرحباً بك في لوحة تحكم الإدارة</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline">تنزيل التقرير</Button>
            <Button>تحديث</Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">المواعيد اليومية</p>
                  <h3 className="text-2xl font-bold mb-1">{formatNumber(statsData.dailyAppointments.count)}</h3>
                  <div className={`flex items-center ${statsData.dailyAppointments.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {statsData.dailyAppointments.positive ? 
                      <TrendingUp size={16} className="ml-1" /> : 
                      <TrendingDown size={16} className="ml-1" />
                    }
                    <span className="text-sm font-medium">{statsData.dailyAppointments.change}%</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">الأطباء النشطين</p>
                  <h3 className="text-2xl font-bold mb-1">{formatNumber(statsData.doctors.count)}</h3>
                  <div className={`flex items-center ${statsData.doctors.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {statsData.doctors.positive ? 
                      <TrendingUp size={16} className="ml-1" /> : 
                      <TrendingDown size={16} className="ml-1" />
                    }
                    <span className="text-sm font-medium">{statsData.doctors.change}%</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">المرضى المسجلين</p>
                  <h3 className="text-2xl font-bold mb-1">{formatNumber(statsData.patients.count)}</h3>
                  <div className={`flex items-center ${statsData.patients.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {statsData.patients.positive ? 
                      <TrendingUp size={16} className="ml-1" /> : 
                      <TrendingDown size={16} className="ml-1" />
                    }
                    <span className="text-sm font-medium">{statsData.patients.change}%</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Activity size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">الإيرادات (آلاف د.ع)</p>
                  <h3 className="text-2xl font-bold mb-1">{formatNumber(statsData.revenue.count)}</h3>
                  <div className={`flex items-center ${statsData.revenue.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {statsData.revenue.positive ? 
                      <TrendingUp size={16} className="ml-1" /> : 
                      <TrendingDown size={16} className="ml-1" />
                    }
                    <span className="text-sm font-medium">{statsData.revenue.change}%</span>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <DollarSign size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="appointments">المواعيد</TabsTrigger>
            <TabsTrigger value="doctors">الأطباء</TabsTrigger>
            <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Appointments trend */}
              <Card>
                <CardHeader>
                  <CardTitle>المواعيد الأسبوعية</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.appointments}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Department distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>توزيع المواعيد حسب التخصص</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.departments}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.departments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Online doctors */}
              <Card>
                <CardHeader>
                  <CardTitle>الأطباء المتصلون حاليًا</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.onlineDoctors}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="online" name="متصل" fill="#8884d8" />
                        <Bar dataKey="consultation" name="في استشارة" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue trend */}
              <Card>
                <CardHeader>
                  <CardTitle>تطور الإيرادات (آلاف د.ع)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.revenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>بيانا�� المواعيد التفصيلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">هنا سيتم عرض بيانات تفصيلية عن المواعيد</p>
                  <Button>تحميل البيانات التفصيلية</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="doctors">
            <Card>
              <CardHeader>
                <CardTitle>بيانات الأطباء التفصيلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">هنا سيتم عرض بيانات تفصيلية عن الأطباء</p>
                  <Button>تحميل البيانات التفصيلية</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>بيانات الإيرادات التفصيلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">هنا سيتم عرض بيانات تفصيلية عن الإيرادات</p>
                  <Button>تحميل البيانات التفصيلية</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
