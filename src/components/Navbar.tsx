
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-900 sticky top-0 z-30">
      <div className="medical-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded-full bg-medical-primary flex items-center justify-center">
              <span className="text-white font-bold">+</span>
            </div>
            <span className="text-xl font-bold text-medical-dark dark:text-white">
              {language === "en" ? "Iraqi Med Hub" : "منصة الطب العراقية"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/doctors" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {language === "en" ? "Doctors" : "الأطباء"}
            </Link>
            <Link to="/appointments" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {language === "en" ? "My Appointments" : "مواعيدي"}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {language === "en" ? "About Us" : "من نحن"}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              {language === "en" ? "Contact" : "اتصل بنا"}
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button onClick={toggleLanguage} variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button onClick={toggleDarkMode} variant="ghost" size="icon">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                {language === "en" ? "Login" : "تسجيل الدخول"}
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                {language === "en" ? "Register" : "إنشاء حساب"}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <Button onClick={toggleLanguage} variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button onClick={toggleDarkMode} variant="ghost" size="icon">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button onClick={toggleMenu} variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t slide-in">
            <div className="flex flex-col space-y-4">
              <Link to="/doctors" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {language === "en" ? "Doctors" : "الأطباء"}
              </Link>
              <Link to="/appointments" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {language === "en" ? "My Appointments" : "مواعيدي"}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {language === "en" ? "About Us" : "من نحن"}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-medical-primary dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {language === "en" ? "Contact" : "اتصل بنا"}
              </Link>
              <div className="border-t pt-4 px-4 flex space-x-4 rtl:space-x-reverse">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full border-medical-primary text-medical-primary hover:bg-medical-light">
                    {language === "en" ? "Login" : "تسجيل الدخول"}
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                    {language === "en" ? "Register" : "إنشاء حساب"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
