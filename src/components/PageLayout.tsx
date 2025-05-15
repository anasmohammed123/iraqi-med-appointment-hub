
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageLoader } from "@/components/ui/loader";

interface PageLayoutProps {
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const PageLayout = ({
  children,
  isLoading = false,
  fullWidth = false,
  className = "",
}: PageLayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col dir-rtl ${className}`}>
      {isLoading && <PageLoader />}
      
      <Navbar />
      
      <main className={`flex-1 ${fullWidth ? "" : "container mx-auto px-4 sm:px-6 lg:px-8"}`}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
