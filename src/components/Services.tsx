import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Heart, 
  Shield, 
  TrendingUp, 
  Users, 
  FileText, 
  Calculator,
  LucideIcon
} from "lucide-react";
import professionalTeam from "@/assets/professional-team.jpg";

type ServiceCategory = {
  id: string;
  title: string;
  items?: string[];
  slug: string;
  image_url?: string;
  icon_name?: string;
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

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Shield,
  TrendingUp,
  Users,
  FileText,
  Calculator
};


const Services: React.FC<ServicesProps> = ({
  smallTitle = "Our Services",
  bigTitle = "Better Insurance For Everyone",
  intro = (
    <>
      Comprehensive insurance solutions tailored to your needs. From Life and Health 
      to Travel Insurance, we provide custom packages that fit all your requirements.
    </>
  ),
  className = "",
}) => {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title, slug, image_url, icon_name, items')
          .order('created_at');

        if (error) {
          console.error('Error fetching services:', error);
        } else {
          const typedServices = (data || []).map(service => ({
            ...service,
            items: Array.isArray(service.items) ? service.items as string[] : []
          }));
          setServices(typedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className={`service-section bg-gray-50 ${className}`}>
        <div className="pt-20" />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pb-16" />
      </section>
    );
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((cat, i) => {
            const IconComponent = cat.icon_name ? iconMap[cat.icon_name] : FileText;
            
            return (
              <article
                key={cat.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cat.image_url || professionalTeam} 
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-foreground leading-tight">{cat.title}</h3>
                  
                  {cat.items && cat.items.length > 0 ? (
                    <ul className="space-y-2 mb-4">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      Professional coverage and guidance tailored to your needs.
                    </p>
                  )}

                  {/* Read More Link */}
                  <a 
                    href={`/service/${cat.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    Learn More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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