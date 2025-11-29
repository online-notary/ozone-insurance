import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Shield, Clock, Users, Star, Phone, Mail, ArrowLeft, Heart, TrendingUp, FileText, Calculator, LucideIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import heroFamily from '@/assets/hero-family.jpg';
interface ServiceData {
  id: string;
  slug: string;
  title: string;
  main_title: string;
  description: string;
  image_url: string;
  icon_name: string;
  features: string[];
  benefits: string[];
  additional_features: string[];
  items: string[];
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Shield,
  TrendingUp,
  Users,
  FileText,
  Calculator
};
const ServiceDetails = () => {
  const {
    serviceId
  } = useParams();
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) {
        setError('No service ID provided');
        setLoading(false);
        return;
      }
      try {
        const {
          data,
          error
        } = await supabase.from('services').select('*').eq('slug', serviceId).maybeSingle();
        if (error) {
          console.error('Error fetching service:', error);
          setError('Failed to fetch service details');
        } else if (!data) {
          setError('Service not found');
        } else {
          // Type cast the JSON fields to proper types
          const typedService: ServiceData = {
            ...data,
            features: Array.isArray(data.features) ? data.features as string[] : [],
            benefits: Array.isArray(data.benefits) ? data.benefits as string[] : [],
            additional_features: Array.isArray(data.additional_features) ? data.additional_features as string[] : [],
            items: Array.isArray(data.items) ? data.items as string[] : []
          };
          setService(typedService);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to fetch service details');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);
  if (loading) {
    return <div className="min-h-screen bg-background">
        <Header />
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-96 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>;
  }
  if (error || !service) {
    return <div className="min-h-screen bg-background">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">{error || 'The requested service could not be found.'}</p>
            <Link to="/#services">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>;
  }
  const ServiceIcon = iconMap[service.icon_name] || FileText;
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="absolute inset-0" style={{
        backgroundImage: `url(${heroFamily})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1
      }}></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Service Details
          </h1>
          <nav className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>→</span>
            <span>Service Details</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative">
              
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <ServiceIcon className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Content */}
            
          </div>

          {/* Health Coverage Options - Only for Health Service */}
          {service.slug === 'health' && <div className="mb-16">
              <div className="text-center mb-12">
                <p className="text-primary font-medium mb-2">Coverage Options</p>
                <h3 className="text-3xl font-bold text-foreground">
                  Explore Our Health Insurance Plans
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[{
              id: 1,
              image: '/images/health-plan-1.png',
              title: 'Anthem Blue Cross',
              description: 'Comprehensive PPO and HMO plans with extensive provider networks',
              url: 'https://shop.anthem.com/individuals/shop/basics?locale=en_US&parenttin=LMJQRQNVTY&agentType=Agent&partnerID=ATK&ffm=&certificationNO=&channel=AC&licenseNO=&state=CA&phone=6502852264&cid=&addr=PO%20BOX%20789&agency=OZONE%20INSURANCE%20SERVICES%20INC&brand=abc&appState=CA&Faxext=&id=CKDNNPMSMZ&lname=Gowda&npn=17569517&email=MADHU.GOWDA@GMAIL.COM&language=en&lobState=&city=MOUNTAIN%20VIEW&zip=94042&agentCode=&fax=&fname=Madhu&paidTIN=LMJQRQNVTY&phoneext='
            }, {
              id: 2,
              image: '/images/health-plan-2.png',
              title: 'Blue Shield of California',
              description: 'Flexible health insurance options for individuals and families',
              url: 'https://www.blueshieldca.com/buyblue/unauth/shopping?broker_id=I%2BM785yypW3g&role=broker&filterEndorsedBroker=TRUE'
            }, {
              id: 3,
              image: '/images/health-plan-3.png',
              title: 'Covered California',
              description: 'Affordable Care Act marketplace plans with premium assistance'
            }, {
              id: 4,
              image: '/images/health-plan-4.png',
              title: 'Health Net',
              description: 'Quality healthcare coverage with competitive rates and benefits'
            }].map(plan => <Card 
                    key={plan.id} 
                    className="group cursor-pointer overflow-hidden bg-card hover:shadow-2xl transition-all duration-300 flex flex-col"
                    onClick={() => plan.url && window.open(plan.url, '_blank', 'noopener,noreferrer')}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      <img src={plan.image} alt={plan.title} className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {plan.title}
                      </h4>
                      <p className="text-sm text-muted-foreground flex-1 mb-4">
                        {plan.description}
                      </p>
                      <div className="flex justify-end">
                        <svg width="24" height="24" viewBox="0 -960 960 960" className="text-primary group-hover:translate-x-1 transition-transform" fill="currentColor">
                          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                        </svg>
                      </div>
                    </div>
                  </Card>)}
              </div>
            </div>}

          {/* Service Benefits */}
          

          {/* Additional Features */}
          

          {/* Back to Services */}
          <div className="text-center mt-12">
            <Link to="/#services">
              <Button variant="outline" className="inline-flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default ServiceDetails;