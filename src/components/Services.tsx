import React from "react";
import { 
  Plane,
  Heart,
  Car,
  Home,
  Shield,
  Briefcase,
  LucideIcon
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
  return (
    <section id="services" className={`service-section bg-gray-50 ${className}`}>
      {/* top spacing */}
      <div className="pt-20" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-primary/90 mb-2 text-sm font-medium tracking-wide uppercase">{smallTitle}</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{bigTitle}</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">{intro}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ozoneServices.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <article
                key={service.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Icon Header */}
                <div className="relative h-32 bg-gradient-primary flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground leading-tight">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <a 
                    href={`#contact`}
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group"
                  >
                    Get a Quote
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* bottom spacing */}
      <div className="pb-16" />
    </section>
  );
};

export default Services;