import React, { useEffect, useRef, useState } from "react";
import { 
  Plane,
  Heart,
  Car,
  Home,
  Shield,
  Briefcase,
  LucideIcon,
  ArrowRight
} from "lucide-react";
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
  <svg
    className={className ?? "w-5 h-5"}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
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
    id: 'travel',
    title: 'Travel Insurance',
    description: 'Comprehensive coverage for your domestic and international trips',
    items: [
      'Trip Cancellation Coverage',
      'Medical Emergency Protection',
      'Lost Luggage Reimbursement',
      'Emergency Evacuation'
    ],
    slug: 'travel',
    icon: Plane
  },
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Quality healthcare coverage for you and your family',
    items: [
      'Individual & Family Plans',
      'Medicare Advantage',
      'Dental & Vision Coverage',
      'Prescription Drug Coverage'
    ],
    slug: 'health',
    icon: Heart
  },
  {
    id: 'auto',
    title: 'Auto Insurance',
    description: 'Protect your vehicle with comprehensive auto coverage',
    items: [
      'Liability Coverage',
      'Collision & Comprehensive',
      'Uninsured Motorist Protection',
      'Roadside Assistance'
    ],
    slug: 'auto',
    icon: Car
  },
  {
    id: 'home',
    title: 'Home Insurance',
    description: 'Safeguard your home and belongings with complete protection',
    items: [
      'Dwelling Coverage',
      'Personal Property Protection',
      'Liability Coverage',
      'Additional Living Expenses'
    ],
    slug: 'home',
    icon: Home
  },
  {
    id: 'umbrella',
    title: 'Umbrella Insurance',
    description: 'Extra liability protection beyond your standard policies',
    items: [
      'Extended Liability Coverage',
      'Personal Injury Protection',
      'Property Damage Coverage',
      'Legal Defense Costs'
    ],
    slug: 'umbrella',
    icon: Shield
  },
  {
    id: 'business',
    title: 'Business Insurance',
    description: 'Comprehensive coverage solutions for your business needs',
    items: [
      'General Liability',
      'Property Coverage',
      'Workers Compensation',
      'Professional Liability'
    ],
    slug: 'business',
    icon: Briefcase
  }
];


const Services: React.FC<ServicesProps> = ({
  smallTitle = "Our Services",
  bigTitle = "Insurance Solutions Tailored to Your Needs",
  intro = (
    <>
      Comprehensive insurance coverage for all aspects of your life. From Travel and Health 
      to Auto, Home, Umbrella, and Business Insurance - we provide personalized solutions that protect what matters most.
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
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={`service-section relative overflow-hidden ${className}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted/50" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* top spacing */}
      <div className="pt-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <h4 className="text-primary font-semibold text-sm tracking-wide uppercase">{smallTitle}</h4>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {bigTitle}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">{intro}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {ozoneServices.map((service, index) => {
            const IconComponent = service.icon;
            const isVisible = visibleCards.has(index);
            
            return (
              <article
                key={service.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`group relative bg-card rounded-2xl overflow-hidden transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="absolute inset-[2px] bg-card rounded-2xl" />
                
                {/* Content Container */}
                <div className="relative">
                  {/* Icon Header with Animated Background */}
                  <div className="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                    {/* Animated Circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    
                    {/* Icon */}
                    <div className="relative h-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-primary shadow-strong group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <IconComponent className="w-12 h-12" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 bg-card">
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Feature List */}
                    <ul className="space-y-3 mb-8">
                      {service.items.map((item, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-3 text-sm text-muted-foreground group/item"
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            <div className="w-5 h-5 rounded-full bg-primary/10 group-hover/item:bg-primary/20 flex items-center justify-center transition-colors duration-300">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                          </div>
                          <span className="group-hover/item:text-foreground transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a 
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-strong hover:scale-105 transition-all duration-300 group/btn"
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
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