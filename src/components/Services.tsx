import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Plane, Heart, Car, Home, Shield, Briefcase, Smile, Laugh, Eye, EyeOff, ShieldCheck, Users, LucideIcon, ArrowRight } from "lucide-react";
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
const Check: React.FC<{
  className?: string;
}> = ({
  className
}) => <svg className={className ?? "w-5 h-5"} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.43 4.72-1.61-1.61a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.153-.091l3.91-5.447z" clipRule="evenodd" />
  </svg>;

// Ozone Insurance Services
const ozoneServices: ServiceCategory[] = [{
  id: "travel",
  title: "Travel Health & Trip Insurance",
  description: "Health insurance for travel/vacation and coverage for trip interruptions/cancellations",
  items: ["Trip Cancellation Coverage", "Medical Emergency Protection", "Lost Luggage Reimbursement", "Emergency Evacuation"],
  slug: "travel",
  icon: Plane
}, {
  id: "health",
  title: "Individual Health Insurance",
  description: "Health insurance for US residents and their families",
  items: ["Individual & Family Plans", "Medicare Advantage", "Dental & Vision Coverage", "Prescription Drug Coverage"],
  slug: "health",
  icon: Heart
}, {
  id: "business",
  title: "Business Insurance",
  description: "Coverage for businesses such as General Liability, Professional Liability, Workers Comp, Business Umbrella",
  items: ["General Liability", "Property Coverage", "Workers Compensation", "Professional Liability"],
  slug: "business",
  icon: Briefcase
}, {
  id: "umbrella",
  title: "Personal Umbrella Insurance",
  description: "Protect your personal assets above and beyond coverage offered by typical home and auto policies",
  items: ["Extended Liability Coverage", "Personal Injury Protection", "Property Damage Coverage", "Legal Defense Costs"],
  slug: "umbrella",
  icon: Shield
}, {
  id: "auto",
  title: "Auto Insurance",
  description: "Protect your vehicle with comprehensive auto coverage",
  items: ["Liability Coverage", "Collision & Comprehensive", "Uninsured Motorist Protection", "Roadside Assistance"],
  slug: "auto",
  icon: Car
}, {
  id: "home",
  title: "Home, Rental & Landlord Insurance",
  description: "Safeguard your home and belongings with complete protection",
  items: ["Dwelling Coverage", "Personal Property Protection", "Liability Coverage", "Additional Living Expenses"],
  slug: "home",
  icon: Home
}, {
  id: "dental",
  title: "Dental Insurance",
  description: "Trust us to help you achieve and maintain a healthy smile with reliable dental coverage.",
  items: ["Routine Cleanings & Exams", "Fillings & Extractions", "Root Canals & Crowns", "Braces & Aligners"],
  slug: "dental",
  icon: Smile
}, {
  id: "vision",
  title: "Vision Insurance",
  description: "Trust us to help you see the world clearly with reliable vision coverage.",
  items: ["Annual Eye Exams", "Designer Frame Options", "Lens Upgrades", "LASIK Discounts"],
  slug: "vision",
  icon: Eye
}, {
  id: "identity",
  title: "Identity Insurance",
  description: "Helps you if someone steals your personal info and uses it to commit fraud.",
  items: ["24/7 Monitoring", "Dark Web Surveillance", "Credit Report Access", "Identity Restoration"],
  slug: "identity",
  icon: ShieldCheck
}, {
  id: "group-health",
  title: "Group Health Insurance",
  description: "Comprehensive health coverage solutions for businesses and organizations.",
  items: ["Employee Benefits", "Flexible Plan Options", "Wellness Programs", "Provider Networks"],
  slug: "group-health",
  icon: Users
}];

// Service card gradients matching CodePen design
const serviceGradients = ["linear-gradient(to bottom, #ff2ae0, #645bf6)",
// Travel: Pink to Purple
"linear-gradient(to bottom, #3f2ae0, #6ffa12)",
// Health: Blue to Green
"linear-gradient(to bottom, #af2ae0, #145ba6)",
// Business: Purple to Blue
"linear-gradient(to bottom, #2affe0, #145ba6)",
// Umbrella: Teal to Blue
"linear-gradient(to bottom, #ff6b2a, #ff2ae0)",
// Auto: Orange to Pink
"linear-gradient(to bottom, #6ffa12, #2affe0)",
// Home: Green to Teal
"linear-gradient(to bottom, #4facfe, #00f2fe)",
// Dental: Blue gradient
"linear-gradient(to bottom, #fa709a, #fee140)",
// Vision: Pink to Yellow
"linear-gradient(to bottom, #667eea, #764ba2)",
// Identity: Purple gradient
"linear-gradient(to bottom, #0d5fb8, #1e88e5)" // Group Health: Consistent blue gradient
];
const Services: React.FC<ServicesProps> = ({
  smallTitle = "Our Services",
  bigTitle = "Insurance Solutions Tailored to Your Needs",
  intro = <>
      Comprehensive insurance coverage for all aspects of your life. From Travel and Health to Auto, Home, Umbrella, and
      Business Insurance - we provide personalized solutions that protect what matters most.
    </>,
  className = ""
}) => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = cardsRef.current.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setVisibleCards(prev => new Set(prev).add(index));
          }
        }
      });
    }, {
      threshold: 0.1
    });
    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);
  return <section id="services" className={`service-section relative overflow-hidden ${className}`}>
      {/* Dark Purple Background */}
      <div className="absolute inset-0 bg-[#003b7ae6]" />

      {/* top spacing */}
      <div className="pt-4" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 rounded-full">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">{smallTitle}</h4>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{bigTitle}</h2>
          
        </div>

        {/* Cards Grid */}
        <div className="flex justify-center flex-wrap gap-9 mb-8 px-4">
          {ozoneServices.map((service, index) => {
          const IconComponent = service.icon;
          const isVisible = visibleCards.has(index);
          return <Link key={service.id} to={`/service/${service.slug}`} ref={el => {
            cardsRef.current[index] = el;
          }} className={`service-card-pill group/card relative transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
            transitionDelay: `${index * 100}ms`,
            background: serviceGradients[index]
          }}>
                {/* Diagonal Light Streak */}
                <div className="service-card-shine" />

                {/* Gradient Glow Effect on Hover */}
                <div className="service-card-glow" />

                {/* Icon Container with Notches */}
                <div className="service-icon-container">
                  {service.id === 'dental' ? <>
                      <Smile className="service-card-icon text-white" size={48} strokeWidth={1.5} />
                      <Laugh className="service-card-icon text-white hidden group-hover/card:block" size={48} strokeWidth={1.5} />
                    </> : service.id === 'vision' ? <>
                      <Eye className="service-card-icon text-white group-hover/card:hidden" size={48} strokeWidth={1.5} />
                      <EyeOff className="service-card-icon text-white hidden group-hover/card:block" size={48} strokeWidth={1.5} />
                    </> : service.id === 'travel' ? <IconComponent className="service-card-icon text-white group-hover/card:animate-[fly-around_3s_ease-in-out_infinite]" size={48} strokeWidth={1.5} /> : <IconComponent className="service-card-icon text-white" size={48} strokeWidth={1.5} />}
                </div>

                {/* Content */}
                <div className="service-card-content">
                  <h2 className="text-white text-lg font-bold uppercase mb-3 tracking-wide">{service.title}</h2>
                  <p className="text-white/90 leading-relaxed text-sm">{service.description}</p>
                </div>
              </Link>;
        })}
        </div>
      </div>

      {/* bottom spacing */}
      <div className="pb-20" />
    </section>;
};
export default Services;