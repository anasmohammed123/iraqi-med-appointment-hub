
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import DoctorList from "./pages/DoctorList";
import DoctorDetails from "./pages/DoctorDetails";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";
import Hospitals from "./pages/Hospitals";
import HospitalDetails from "./pages/HospitalDetails";
import Promos from "./pages/Promos";
import PromoDetails from "./pages/PromoDetails";
import DoctorLogin from "./pages/DoctorLogin";
import OnlineDoctors from "./pages/OnlineDoctors";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorTerms from "./pages/DoctorTerms";
import PatientQuestions from "./pages/PatientQuestions";
import Dashboard from "./pages/Dashboard";
import ServicePricing from "./pages/ServicePricing";
import LocationSearch from "./pages/LocationSearch";
import CosmeticCenters from "./pages/CosmeticCenters";
import CosmeticCenterDetails from "./pages/CosmeticCenterDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DoctorRegistration from "./pages/DoctorRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/hospitals/:id" element={<HospitalDetails />} />
            <Route path="/promos" element={<Promos />} />
            <Route path="/promos/:id" element={<PromoDetails />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />
            <Route path="/online-doctors" element={<OnlineDoctors />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-terms" element={<DoctorTerms />} />
            <Route path="/patient-questions" element={<PatientQuestions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service-pricing" element={<ServicePricing />} />
            <Route path="/location-search" element={<LocationSearch />} />
            <Route path="/cosmetic-centers" element={<CosmeticCenters />} />
            <Route path="/cosmetic-centers/:id" element={<CosmeticCenterDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctor-registration" element={<DoctorRegistration />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
