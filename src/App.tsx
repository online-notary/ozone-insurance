import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MobileCallButton from "@/components/MobileCallButton";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ServiceDetails from "./pages/ServiceDetails";
import UpdateServices from "./pages/UpdateServices";
import TeamMemberDetail from "./pages/TeamMemberDetail";
import Privacy from "./pages/Privacy";
import SmsPrivacy from "./pages/SmsPrivacy";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";
import ExternalRedirect from "./components/ExternalRedirect";

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
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service/:serviceId" element={<ServiceDetails />} />
            <Route path="/update-services" element={<UpdateServices />} />
            <Route path="/team/:memberId" element={<TeamMemberDetail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/sms-privacy" element={<SmsPrivacy />} />
            <Route path="/book" element={<Book />} />
            {/* Service shortcut routes */}
            <Route path="/travel" element={<ExternalRedirect to="https://ozoneinsurance.brokersnexus.com" />} />
            <Route path="/grouphealth" element={<Navigate to="/service/group-health" replace />} />
            <Route path="/health" element={<Navigate to="/service/health" replace />} />
            <Route path="/dental" element={<Navigate to="/service/dental" replace />} />
            <Route path="/business" element={<Navigate to="/service/business" replace />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileCallButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
