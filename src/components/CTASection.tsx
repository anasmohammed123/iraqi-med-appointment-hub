
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-medical-primary to-medical-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">هل أنت طبيب؟</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          انضم إلى شبكة الأطباء الخاصة بنا، وقم بتوسيع نطاق ممارستك، وأدِر جدولك بكفاءة، واتصل بالمزيد من المرضى.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/doctor-register">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-primary">
              انضم كطبيب
            </Button>
          </Link>
          <Link to="/doctor-login">
            <Button className="bg-white text-medical-primary hover:bg-gray-100">
              تسجيل دخول الأطباء
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
