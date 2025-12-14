import { Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileCallButton = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <a
      href="tel:+18336969663"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Call Ozone Insurance"
    >
      <Phone className="h-5 w-5 animate-pulse" />
      <span className="font-semibold text-sm">Call Now</span>
    </a>
  );
};

export default MobileCallButton;
