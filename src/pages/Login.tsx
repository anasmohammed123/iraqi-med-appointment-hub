
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with your backend
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بعودتك إلى منصة الطب العراقية",
      });
      // Normally would redirect to dashboard or profile page
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !password) {
      toast({
        title: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send a registration request and verify OTP
    setRegisterLoading(true);
    setTimeout(() => {
      setRegisterLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 4) {
      toast({
        title: "يرجى إدخال رمز التحقق الصحيح",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would verify the OTP with the backend
    setRegisterLoading(true);
    setTimeout(() => {
      setRegisterLoading(false);
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحبًا بك في منصة الطب العراقية",
      });
      // Normally would redirect to dashboard or profile page
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">مرحبًا بعودتك</CardTitle>
                  <CardDescription>
                    قم بتسجيل الدخول للوصول إلى حسابك ومتابعة مواعيدك
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">البريد الإلكتروني</Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="example@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="login-password">كلمة المرور</Label>
                        <Link to="/forgot-password" className="text-sm text-medical-primary hover:underline">
                          نسيت كلمة المرور؟
                        </Link>
                      </div>
                      <div className="relative">
                        <Input 
                          id="login-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button 
                          type="button"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox 
                        id="remember-me" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember-me" className="text-sm text-gray-500">
                        تذكرني
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-primary hover:bg-medical-dark"
                      disabled={loginLoading}
                    >
                      {loginLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-sm mt-2">
                        هل أنت طبيب؟{" "}
                        <Link to="/doctor-login" className="text-medical-primary hover:underline">
                          سجل دخولك هنا
                        </Link>
                      </p>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
                  <CardDescription>
                    سجل الآن للاستفادة من منصة الطب العراقية وحجز المواعيد
                  </CardDescription>
                </CardHeader>
                {!otpSent ? (
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">الاسم الكامل</Label>
                        <Input 
                          id="register-name" 
                          placeholder="أدخل اسمك الكامل" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-email">البريد الإلكتروني</Label>
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="example@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-phone">رقم الهاتف</Label>
                        <Input 
                          id="register-phone" 
                          placeholder="+964 7712 345678" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-password">كلمة المرور</Label>
                        <div className="relative">
                          <Input 
                            id="register-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button 
                            type="button"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 rtl:space-x-reverse">
                        <Checkbox id="terms" required className="mt-1" />
                        <Label htmlFor="terms" className="text-sm text-gray-500">
                          أوافق على <Link to="/terms" className="text-medical-primary hover:underline">شروط الاستخدام</Link> و <Link to="/privacy" className="text-medical-primary hover:underline">سياسة الخصوصية</Link>
                        </Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-medical-primary hover:bg-medical-dark"
                        disabled={registerLoading}
                      >
                        {registerLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm">
                          هل أنت طبيب؟{" "}
                          <Link to="/doctor-registration" className="text-medical-primary hover:underline">
                            سجل كطبيب جديد
                          </Link>
                        </p>
                      </div>
                    </CardFooter>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP}>
                    <CardContent className="space-y-4 text-center">
                      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      
                      <h3 className="text-lg font-semibold">تأكيد رقم الهاتف</h3>
                      <p className="text-gray-600 mb-6">
                        تم إرسال رمز التحقق إلى {phone}
                      </p>
                      
                      <div className="space-y-2">
                        <Label htmlFor="otp">رمز التحقق</Label>
                        <Input 
                          id="otp" 
                          placeholder="0000" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          className="text-center"
                          maxLength={4}
                        />
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        لم تستلم الرمز؟ <button type="button" className="text-medical-primary hover:underline">إعادة إرسال</button>
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-medical-primary hover:bg-medical-dark"
                        disabled={registerLoading}
                      >
                        {registerLoading ? "جاري التحقق..." : "تأكيد"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        className="w-full"
                        onClick={() => setOtpSent(false)}
                      >
                        العودة
                      </Button>
                    </CardFooter>
                  </form>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
