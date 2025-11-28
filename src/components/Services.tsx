import React, { useEffect, useRef, useState } from "react";
import { Plane, Heart, Car, Home, Shield, Briefcase, LucideIcon, ArrowRight } from "lucide-react";
import professionalTeam from "@/assets/professional-team.jpg";

type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  items: string[];
  slug: string;
  icon: LucideIcon;
};

type ServicesProps = {
  smallTitle?: string;
  bigTitle?: string;
  intro?: React.ReactNode;
  className?: string;
};

const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className ?? "w-5 h-5"} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.43 4.72-1.61-1.61a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.153-.091l3.91-5.447z"
      clipRule="evenodd"
    />
  </svg>
);

// Ozone Insurance Services
const ozoneServices: ServiceCategory[] = [
  {
    id: "travel",
    title: "Travel Insurance",
    description: "Comprehensive coverage for your domestic and international trips",
    items: [
      "Trip Cancellation Coverage",
      "Medical Emergency Protection",
      "Lost Luggage Reimbursement",
      "Emergency Evacuation",
    ],
    slug: "travel",
    icon: Plane,
  },
  {
    id: "health",
    title: "Health Insurance",
    description: "Quality healthcare coverage for you and your family",
    items: [
      "Individual & Family Plans",
      "Medicare Advantage",
      "Dental & Vision Coverage",
      "Prescription Drug Coverage",
    ],
    slug: "health",
    icon: Heart,
  },
  {
    id: "business",
    title: "Business Insurance",
    description: "Comprehensive coverage solutions for your business needs",
    items: ["General Liability", "Property Coverage", "Workers Compensation", "Professional Liability"],
    slug: "business",
    icon: Briefcase,
  },
  {
    id: "umbrella",
    title: "Umbrella Insurance",
    description: "Extra liability protection beyond your standard policies",
    items: [
      "Extended Liability Coverage",
      "Personal Injury Protection",
      "Property Damage Coverage",
      "Legal Defense Costs",
    ],
    slug: "umbrella",
    icon: Shield,
  },
  {
    id: "auto",
    title: "Auto Insurance",
    description: "Protect your vehicle with comprehensive auto coverage",
    items: ["Liability Coverage", "Collision & Comprehensive", "Uninsured Motorist Protection", "Roadside Assistance"],
    slug: "auto",
    icon: Car,
  },
  {
    id: "home",
    title: "Home Insurance",
    description: "Safeguard your home and belongings with complete protection",
    items: ["Dwelling Coverage", "Personal Property Protection", "Liability Coverage", "Additional Living Expenses"],
    slug: "home",
    icon: Home,
  },
];

// Service card gradients matching CodePen design
const serviceGradients = [
  "linear-gradient(to bottom, #ff2ae0, #645bf6)", // Travel: Pink to Purple
  "linear-gradient(to bottom, #3f2ae0, #6ffa12)", // Health: Blue to Green
  "linear-gradient(to bottom, #af2ae0, #145ba6)", // Auto: Purple to Blue
  "linear-gradient(to bottom, #ff6b2a, #ff2ae0)", // Home: Orange to Pink
  "linear-gradient(to bottom, #2affe0, #145ba6)", // Umbrella: Teal to Blue
  "linear-gradient(to bottom, #6ffa12, #2affe0)", // Business: Green to Teal
];

const Services: React.FC<ServicesProps> = ({
  smallTitle = "Our Services",
  bigTitle = "Insurance Solutions Tailored to Your Needs",
  intro = (
    <>
      Comprehensive insurance coverage for all aspects of your life. From Travel and Health to Auto, Home, Umbrella, and
      Business Insurance - we provide personalized solutions that protect what matters most.
    </>
  ),
  className = "",
}) => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={`service-section relative overflow-hidden ${className}`}>
      {/* Dark Purple Background */}
      <div className="absolute inset-0 bg-[#3c2846]" />

      {/* top spacing */}
      <div className="pt-20" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 rounded-full">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">{smallTitle}</h4>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{bigTitle}</h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">{intro}</p>
        </div>

        {/* Cards Grid */}
        <div className="flex justify-center flex-wrap gap-12 mb-8 px-4">
          {ozoneServices.map((service, index) => {
            const IconComponent = service.icon;
            const isVisible = visibleCards.has(index);

            return (
              <article
                key={service.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`service-card-pill group/card relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  background: serviceGradients[index],
                }}
              >
                {/* Diagonal Light Streak */}
                <div className="service-card-shine" />

                {/* Gradient Glow Effect on Hover */}
                <div className="service-card-glow" />

                {/* Icon Container with Notches */}
                <div className="service-icon-container">
                  <IconComponent className="service-card-icon text-white text-6xl" size={96} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="service-card-content">
                  <h2 className="text-white text-3xl font-bold uppercase mb-4 tracking-wide">{service.title}</h2>
                  <p className="text-white/90 leading-relaxed text-base">{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* bottom spacing */}
      <div className="pb-20" />
    </section>
  );
};

export default Services;
