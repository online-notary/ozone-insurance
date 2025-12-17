import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Shield, Clock, Users, Star, Phone, Mail, ArrowLeft, Heart, TrendingUp, FileText, Calculator, LucideIcon, Plane, MapPin, Globe, ExternalLink } from 'lucide-react';
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
  const { serviceId } = useParams();
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTravelOption, setSelectedTravelOption] = useState<string | null>(null);

  // Scroll to top when serviceId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) {
        setError('No service ID provided');
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from('services').select('*').eq('slug', serviceId).maybeSingle();
        if (error) {
          console.error('Error fetching service:', error);
          setError('Failed to fetch service details');
        } else if (!data) {
          setError('Service not found');
        } else {
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
    return (
      <div className="min-h-screen bg-background">
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
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background">
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
      </div>
    );
  }

  const ServiceIcon = iconMap[service.icon_name] || FileText;

  return (
    <div className="min-h-screen bg-background">
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
          </div>

          {/* Health Coverage Options - Only for Health Service */}
          {service.slug === 'health' && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <p className="text-primary font-medium mb-2">Coverage Options</p>
                <h3 className="text-3xl font-bold text-foreground">Explore Health Plans On Your Own</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    id: 1,
                    image: '/images/health-plan-1.png',
                    title: 'Anthem Blue Cross',
                    description: 'Comprehensive PPO and HMO plans with extensive provider networks',
                    url: 'https://shop.anthem.com/individuals/shop/basics?locale=en_US&parenttin=LMJQRQNVTY&agentType=Agent&partnerID=ATK&ffm=&certificationNO=&channel=AC&licenseNO=&state=CA&phone=6502852264&cid=&addr=PO%20BOX%20789&agency=OZONE%20INSURANCE%20SERVICES%20INC&brand=abc&appState=CA&Faxext=&id=CKDNNPMSMZ&lname=Gowda&npn=17569517&email=MADHU.GOWDA@GMAIL.COM&language=en&lobState=&city=MOUNTAIN%20VIEW&zip=94042&agentCode=&fax=&fname=Madhu&paidTIN=LMJQRQNVTY&phoneext='
                  },
                  {
                    id: 2,
                    image: '/images/health-plan-2.png',
                    title: 'Blue Shield of California',
                    description: 'Flexible health insurance options for individuals and families',
                    url: 'https://www.blueshieldca.com/buyblue/unauth/shopping?broker_id=I%2BM785yypW3g&role=broker&filterEndorsedBroker=TRUE'
                  },
                  {
                    id: 3,
                    image: '/images/health-plan-3.png',
                    title: 'Covered California',
                    description: 'Affordable Care Act marketplace plans with premium assistance',
                    url: 'https://form.jotform.com/253316970682059'
                  },
                  {
                    id: 4,
                    image: '/images/health-plan-4.png',
                    title: 'Kaiser Permanente',
                    description: 'Quality healthcare coverage with competitive rates and benefits',
                    url: 'https://apply-individual-family.kaiserpermanente.org/validate-consumer?ln=en&guid=1f0d6f22-1280-4fb7-9d9a-f0ada7fb16c1'
                  }
                ].map(plan => (
                  <Card 
                    key={plan.id} 
                    className="group cursor-pointer overflow-hidden bg-card hover:shadow-2xl transition-all duration-300 flex flex-col" 
                    onClick={() => {
                      if (plan.url) {
                        if (plan.id === 3) {
                          window.open(plan.url, 'blank', 'scrollbars=yes,toolbar=no,width=700,height=500');
                        } else {
                          window.open(plan.url, '_blank', 'noopener,noreferrer');
                        }
                      }
                    }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      <img src={plan.image} alt={plan.title} className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {plan.title}
                      </h4>
                      <p className="text-base text-muted-foreground flex-1 mb-4">
                        {plan.description}
                      </p>
                      <div className="flex justify-end">
                        <svg width="24" height="24" viewBox="0 -960 960 960" className="text-primary group-hover:translate-x-1 transition-transform" fill="currentColor">
                          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Individual Health Insurance Quote Request - Only for Health Service */}
          {service.slug === 'health' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Want Help Choosing?</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Get personalized health insurance quotes tailored to your needs. Fill out our quick form and our team will help you find the perfect coverage.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://form.jotform.com/253316970682059', 'blank', 'scrollbars=yes,toolbar=no,width=700,height=500')}
                    className="inline-flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Get Your Quote
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Dental Insurance Portal - Only for Dental Service */}
          {service.slug === 'dental' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Explore Dental Plans</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Browse and compare dental insurance plans to find the perfect coverage for your smile.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://brokers.dentalforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771', '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Dental Insurance Plans
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Vision Insurance Portal - Only for Vision Service */}
          {service.slug === 'vision' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Explore Vision Plans</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Browse and compare vision insurance plans to find the perfect coverage for your eyecare needs.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://brokers.visionforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771', '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Vision Insurance Plans
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Identity Insurance Portal - Only for Identity Service */}
          {service.slug === 'identity' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Explore Identity Insurance Plans</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Protect yourself from identity theft and fraud with comprehensive identity insurance coverage.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://brokers.insuranceforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771', '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Identity Insurance Plans
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Auto Insurance Quote - Only for Auto Service */}
          {service.slug === 'auto' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Get Your Auto Insurance Quote</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Fill out our form to receive a personalized auto insurance quote tailored to your driving needs.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://www.ezlynx.com/rater/CfQkAyR_u0W9m99Ql0PySw/all', '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Get Auto Insurance Quote
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Home Insurance Quote - Only for Home Service */}
          {service.slug === 'home' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Get Your Home Insurance Quote</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Protect your home with comprehensive coverage. Fill out our form to receive a personalized quote.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://www.ezlynx.com/rater/CfQkAyR_u0W9m99Ql0PySw/all', '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Get Home Insurance Quote
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Group Health Insurance Form - Only for Group Health Service */}
          {service.slug === 'group-health' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Get Your Group Health Insurance Quote</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Fill out our form to receive a personalized group health insurance quote for your organization.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://forms.monday.com/forms/346b024b1b2521abb30be53c4f0dc5a5?r=use1', '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open Group Health Insurance Form
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Business Insurance Form - Only for Business Service */}
          {service.slug === 'business' && (
            <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Get Your Business Insurance Quote</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Fill out our form to receive a personalized business insurance quote tailored to your company's needs.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.open('https://forms.monday.com/forms/3e204bacbc35930c1cbd3fe6dc7b2433?r=use1', '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open Business Insurance Form
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Travel Insurance Options - Only for Travel Service */}
          {service.slug === 'travel' && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <p className="text-primary font-medium mb-2">Travel Coverage Options</p>
                <h3 className="text-3xl font-bold text-foreground">Choose Your Travel Insurance Plan</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    id: 'usa',
                    icon: MapPin,
                    title: 'USA Visitors Insurance',
                    description: 'Medical coverage for visitors to the USA',
                    url: 'https://ozoneinsurance.brokersnexus.com/get-travel-insurance-quotes/?presection=visitorUSA'
                  },
                  {
                    id: 'outside',
                    icon: Plane,
                    title: 'Outside USA Insurance',
                    description: 'Medical coverage for destinations excluding the USA',
                    url: 'https://ozoneinsurance.brokersnexus.com/get-travel-insurance-quotes/?presection=travelOutsideUSA'
                  },
                  {
                    id: 'trip',
                    icon: Globe,
                    title: 'Travel Insurance',
                    description: 'Trip cancellation coverage for US residents',
                    url: 'https://ozoneinsurance.brokersnexus.com/get-travel-insurance-quotes/?presection=tripCancellation'
                  }
                ].map((plan) => {
                  const IconComponent = plan.icon;
                  return (
                    <Card 
                      key={plan.id} 
                      className="group cursor-pointer overflow-hidden bg-card hover:shadow-2xl transition-all duration-300 flex flex-col"
                      onClick={() => window.open(plan.url, '_blank', 'noopener,noreferrer')}
                    >
                      <div className="p-8 flex-1 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {plan.title}
                        </h4>
                        <p className="text-base text-muted-foreground flex-1 mb-6">
                          {plan.description}
                        </p>
                        <div className="flex justify-center items-center gap-2 text-primary font-medium">
                          <ExternalLink className="w-4 h-4" />
                          Get Quote
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our team of experienced insurance professionals is here to help you find the perfect coverage for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.open('https://meeting.levitate.ai/#/landing/9105df-4i4n1e', '_blank', 'noopener,noreferrer')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="tel:+18336969663">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 1-833-MY-OZONE
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Link to="/#services">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
