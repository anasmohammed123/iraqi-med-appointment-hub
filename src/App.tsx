
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
