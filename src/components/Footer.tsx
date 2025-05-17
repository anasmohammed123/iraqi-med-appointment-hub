
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="medical-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-medical-dark dark:text-white">Iraqi Med Hub</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              نربط المرضى بأفضل الأطباء في جميع أنحاء العراق.
              سهولة حجز المواعيد وتلقي الرعاية الطبية عالية الجودة.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-medical-primary hover:text-medical-dark">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-medical-primary hover:text-medical-dark">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-medical-primary hover:text-medical-dark">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-medical-primary hover:text-medical-dark">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-medical-dark dark:text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/doctors" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  ابحث عن طبيب
                </Link>
              </li>
              <li>
                <Link to="/specialties" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  التخصصات الطبية
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  مواعيدي
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  مقالات طبية
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  من نحن
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Top Visited */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-medical-dark dark:text-white">الأكثر زيارة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hospitals" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  مستشفى الرشيد التخصصي
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  د. محمد عبد الكريم - القلب
                </Link>
              </li>
              <li>
                <Link to="/cosmetic-centers" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  مركز النخبة للتجميل
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  د. سارة حسين - الجلدية
                </Link>
              </li>
              <li>
                <Link to="/hospitals" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  المركز الطبي التخصصي
                </Link>
              </li>
              <li>
                <Link to="/cosmetic-centers" className="text-gray-600 dark:text-gray-300 hover:text-medical-primary dark:hover:text-medical-secondary">
                  مركز الجمال الحديث
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-medical-dark dark:text-white">اتصل بنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="text-medical-primary mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-600 dark:text-gray-300">
                  شارع الرشيد، بغداد، العراق
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="text-medical-primary flex-shrink-0" size={18} />
                <span className="text-gray-600 dark:text-gray-300">
                  +964 7712 345678
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="text-medical-primary flex-shrink-0" size={18} />
                <span className="text-gray-600 dark:text-gray-300">
                  info@iraqimedhub.iq
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400">
          <p>© 2025 Iraqi Med Hub. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
