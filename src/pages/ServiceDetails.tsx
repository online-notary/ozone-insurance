import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Shield, Clock, Users, Star, Phone, Mail, ArrowLeft, Heart, TrendingUp, FileText, Calculator, Maximize, Minimize, LucideIcon } from 'lucide-react';
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
  const [isDentalFullscreen, setIsDentalFullscreen] = useState(false);
  const [isVisionFullscreen, setIsVisionFullscreen] = useState(false);
  const [isIdentityFullscreen, setIsIdentityFullscreen] = useState(false);
  const [isAutoFullscreen, setIsAutoFullscreen] = useState(false);
  const [isHomeFullscreen, setIsHomeFullscreen] = useState(false);
  const [isGroupHealthFullscreen, setIsGroupHealthFullscreen] = useState(false);
  const [dentalIframeError, setDentalIframeError] = useState(false);
  const [visionIframeError, setVisionIframeError] = useState(false);
  const [identityIframeError, setIdentityIframeError] = useState(false);
  const [autoIframeError, setAutoIframeError] = useState(false);
  const [homeIframeError, setHomeIframeError] = useState(false);
  const [groupHealthIframeError, setGroupHealthIframeError] = useState(false);
  const [dentalIframeLoading, setDentalIframeLoading] = useState(true);
  const [visionIframeLoading, setVisionIframeLoading] = useState(true);
  const [identityIframeLoading, setIdentityIframeLoading] = useState(true);
  const [autoIframeLoading, setAutoIframeLoading] = useState(true);
  const [homeIframeLoading, setHomeIframeLoading] = useState(true);
  const [groupHealthIframeLoading, setGroupHealthIframeLoading] = useState(true);
  const dentalIframeRef = useRef<HTMLDivElement>(null);
  const visionIframeRef = useRef<HTMLDivElement>(null);
  const identityIframeRef = useRef<HTMLDivElement>(null);
  const autoIframeRef = useRef<HTMLDivElement>(null);
  const homeIframeRef = useRef<HTMLDivElement>(null);
  const groupHealthIframeRef = useRef<HTMLDivElement>(null);
  const dentalTimeoutRef = useRef<NodeJS.Timeout>();
  const visionTimeoutRef = useRef<NodeJS.Timeout>();
  const identityTimeoutRef = useRef<NodeJS.Timeout>();
  const autoTimeoutRef = useRef<NodeJS.Timeout>();
  const homeTimeoutRef = useRef<NodeJS.Timeout>();
  const groupHealthTimeoutRef = useRef<NodeJS.Timeout>();

  // Timeout fallback for dental iframe
  useEffect(() => {
    if (service?.slug === 'dental' && !dentalIframeError) {
      dentalTimeoutRef.current = setTimeout(() => {
        // If still loading after 5 seconds, assume it failed
        if (dentalIframeLoading) {
          console.log('Dental iframe timeout - switching to fallback button');
          setDentalIframeError(true);
          setDentalIframeLoading(false);
        }
      }, 5000);

      return () => {
        if (dentalTimeoutRef.current) {
          clearTimeout(dentalTimeoutRef.current);
        }
      };
    }
  }, [service?.slug, dentalIframeLoading, dentalIframeError]);

  // Timeout fallback for vision iframe
  useEffect(() => {
    if (service?.slug === 'vision' && !visionIframeError) {
      visionTimeoutRef.current = setTimeout(() => {
        // If still loading after 5 seconds, assume it failed
        if (visionIframeLoading) {
          console.log('Vision iframe timeout - switching to fallback button');
          setVisionIframeError(true);
          setVisionIframeLoading(false);
        }
      }, 5000);

      return () => {
        if (visionTimeoutRef.current) {
          clearTimeout(visionTimeoutRef.current);
        }
      };
    }
  }, [service?.slug, visionIframeLoading, visionIframeError]);

  // Timeout fallback for identity iframe
  useEffect(() => {
    if (service?.slug === 'identity' && !identityIframeError) {
      identityTimeoutRef.current = setTimeout(() => {
        // If still loading after 5 seconds, assume it failed
        if (identityIframeLoading) {
          console.log('Identity iframe timeout - switching to fallback button');
          setIdentityIframeError(true);
          setIdentityIframeLoading(false);
        }
      }, 5000);

      return () => {
        if (identityTimeoutRef.current) {
          clearTimeout(identityTimeoutRef.current);
        }
      };
    }
  }, [service?.slug, identityIframeLoading, identityIframeError]);

  // Timeout fallback for auto iframe
  useEffect(() => {
    if (service?.slug === 'auto' && !autoIframeError) {
      autoTimeoutRef.current = setTimeout(() => {
        // If still loading after 5 seconds, assume it failed
        if (autoIframeLoading) {
          console.log('Auto iframe timeout - switching to fallback button');
          setAutoIframeError(true);
          setAutoIframeLoading(false);
        }
      }, 5000);

      return () => {
        if (autoTimeoutRef.current) {
          clearTimeout(autoTimeoutRef.current);
        }
      };
    }
  }, [service?.slug, autoIframeLoading, autoIframeError]);

  // Timeout fallback for home iframe
  useEffect(() => {
    if (service?.slug === 'home' && !homeIframeError) {
      homeTimeoutRef.current = setTimeout(() => {
        // If still loading after 5 seconds, assume it failed
        if (homeIframeLoading) {
          console.log('Home iframe timeout - switching to fallback button');
          setHomeIframeError(true);
          setHomeIframeLoading(false);
        }
      }, 5000);

      return () => {
        if (homeTimeoutRef.current) {
          clearTimeout(homeTimeoutRef.current);
        }
      };
    }
  }, [service?.slug, homeIframeLoading, homeIframeError]);

  // Timeout fallback for group health iframe
  useEffect(() => {
    if (service?.slug === 'group-health' && !groupHealthIframeError) {
      groupHealthTimeoutRef.current = setTimeout(() => {
        // If still loading after 5 seconds, assume it failed
        if (groupHealthIframeLoading) {
          console.log('Group Health iframe timeout - switching to fallback button');
          setGroupHealthIframeError(true);
          setGroupHealthIframeLoading(false);
        }
      }, 5000);

      return () => {
        if (groupHealthTimeoutRef.current) {
          clearTimeout(groupHealthTimeoutRef.current);
        }
      };
    }
  }, [service?.slug, groupHealthIframeLoading, groupHealthIframeError]);

  const toggleDentalFullscreen = () => {
    if (!dentalIframeRef.current) return;

    if (!document.fullscreenElement) {
      dentalIframeRef.current.requestFullscreen().then(() => {
        setIsDentalFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsDentalFullscreen(false);
      });
    }
  };

  const toggleVisionFullscreen = () => {
    if (!visionIframeRef.current) return;

    if (!document.fullscreenElement) {
      visionIframeRef.current.requestFullscreen().then(() => {
        setIsVisionFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsVisionFullscreen(false);
      });
    }
  };

  const toggleIdentityFullscreen = () => {
    if (!identityIframeRef.current) return;

    if (!document.fullscreenElement) {
      identityIframeRef.current.requestFullscreen().then(() => {
        setIsIdentityFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsIdentityFullscreen(false);
      });
    }
  };

  const toggleAutoFullscreen = () => {
    if (!autoIframeRef.current) return;

    if (!document.fullscreenElement) {
      autoIframeRef.current.requestFullscreen().then(() => {
        setIsAutoFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsAutoFullscreen(false);
      });
    }
  };

  const toggleHomeFullscreen = () => {
    if (!homeIframeRef.current) return;

    if (!document.fullscreenElement) {
      homeIframeRef.current.requestFullscreen().then(() => {
        setIsHomeFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsHomeFullscreen(false);
      });
    }
  };

  const toggleGroupHealthFullscreen = () => {
    if (!groupHealthIframeRef.current) return;

    if (!document.fullscreenElement) {
      groupHealthIframeRef.current.requestFullscreen().then(() => {
        setIsGroupHealthFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsGroupHealthFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsDentalFullscreen(false);
        setIsVisionFullscreen(false);
        setIsIdentityFullscreen(false);
        setIsAutoFullscreen(false);
        setIsHomeFullscreen(false);
        setIsGroupHealthFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
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
                <h3 className="text-3xl font-bold text-foreground">Explore Health Plans On Your Own</h3>
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
              description: 'Affordable Care Act marketplace plans with premium assistance',
              url: 'https://form.jotform.com/253316970682059'
            }, {
              id: 4,
              image: '/images/health-plan-4.png',
              title: 'Kaiser Permanente',
              description: 'Quality healthcare coverage with competitive rates and benefits',
              url: 'https://apply-individual-family.kaiserpermanente.org/validate-consumer?ln=en&guid=1f0d6f22-1280-4fb7-9d9a-f0ada7fb16c1'
            }].map(plan => <Card key={plan.id} className="group cursor-pointer overflow-hidden bg-card hover:shadow-2xl transition-all duration-300 flex flex-col" onClick={() => {
                if (plan.url) {
                  if (plan.id === 3) {
                    window.open(plan.url, 'blank', 'scrollbars=yes,toolbar=no,width=700,height=500');
                  } else {
                    window.open(plan.url, '_blank', 'noopener,noreferrer');
                  }
                }
              }}>
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
                  </Card>)}
              </div>
            </div>}

          {/* Service Benefits */}
          

          {/* Additional Features */}
          

          {/* Individual Health Insurance Quote Request - Only for Health Service */}
          {service.slug === 'health' && <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Want Help Choosing?</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Get personalized health insurance quotes tailored to your needs. Fill out our quick form and our team will help you find the perfect coverage.
                  </p>
                  <Button size="lg" onClick={() => {
                window.open('https://form.jotform.com/253316970682059', 'blank', 'scrollbars=yes,toolbar=no,width=700,height=500');
              }} className="inline-flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Get Your Quote
                  </Button>
                </div>
              </Card>
            </div>}

          {/* Dental Insurance Portal - Only for Dental Service */}
          {service.slug === 'dental' && <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                <div className="p-4 md:p-6">
                  <h3 className="text-3xl font-bold text-foreground mb-4 text-center">Explore Dental Plans</h3>
                  <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Browse and compare dental insurance plans to find the perfect coverage for your smile.
                  </p>
                  
                  {dentalIframeError ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-6">
                        The dental portal couldn't be loaded directly. Click below to open it in a new window.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={() => {
                          window.open('https://brokers.dentalforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771', '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        View Dental Insurance Plans
                      </Button>
                    </div>
                  ) : (
                    <div ref={dentalIframeRef} className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: isDentalFullscreen ? '100vh' : '800px' }}>
                      {dentalIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading dental portal...</p>
                          </div>
                        </div>
                      )}
                      <Button
                        onClick={toggleDentalFullscreen}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-foreground shadow-lg"
                        size="icon"
                        title={isDentalFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isDentalFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </Button>
                      <iframe 
                        src="https://brokers.dentalforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771"
                        className="w-full h-full border-0"
                        title="Dental Insurance Portal"
                        allow="geolocation"
                        onLoad={() => {
                          console.log('Dental iframe loaded successfully');
                          setDentalIframeLoading(false);
                          if (dentalTimeoutRef.current) {
                            clearTimeout(dentalTimeoutRef.current);
                          }
                        }}
                        onError={() => {
                          console.error('Dental iframe failed to load');
                          setDentalIframeError(true);
                          setDentalIframeLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>}

          {/* Vision Insurance Portal - Only for Vision Service */}
          {service.slug === 'vision' && <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                <div className="p-4 md:p-6">
                  <h3 className="text-3xl font-bold text-foreground mb-4 text-center">Explore Vision Plans</h3>
                  <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Browse and compare vision insurance plans to find the perfect coverage for your eyecare needs.
                  </p>
                  
                  {visionIframeError ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-6">
                        The vision portal couldn't be loaded directly. Click below to open it in a new window.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={() => {
                          window.open('https://brokers.visionforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771', '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        View Vision Insurance Plans
                      </Button>
                    </div>
                  ) : (
                    <div ref={visionIframeRef} className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: isVisionFullscreen ? '100vh' : '800px' }}>
                      {visionIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading vision portal...</p>
                          </div>
                        </div>
                      )}
                      <Button
                        onClick={toggleVisionFullscreen}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-foreground shadow-lg"
                        size="icon"
                        title={isVisionFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isVisionFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </Button>
                      <iframe 
                        src="https://brokers.visionforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771"
                        className="w-full h-full border-0"
                        title="Vision Insurance Portal"
                        allow="geolocation"
                        onLoad={() => {
                          console.log('Vision iframe loaded successfully');
                          setVisionIframeLoading(false);
                          if (visionTimeoutRef.current) {
                            clearTimeout(visionTimeoutRef.current);
                          }
                        }}
                        onError={() => {
                          console.error('Vision iframe failed to load');
                          setVisionIframeError(true);
                          setVisionIframeLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>}

          {/* Identity Insurance Portal - Only for Identity Service */}
          {service.slug === 'identity' && <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                <div className="p-4 md:p-6">
                  <h3 className="text-3xl font-bold text-foreground mb-4 text-center">Explore Identity Insurance Plans</h3>
                  <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Protect yourself from identity theft and fraud with comprehensive identity insurance coverage.
                  </p>
                  
                  {identityIframeError ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-6">
                        The identity insurance portal couldn't be loaded directly. Click below to open it in a new window.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={() => {
                          window.open('https://brokers.insuranceforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771', '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        View Identity Insurance Plans
                      </Button>
                    </div>
                  ) : (
                    <div ref={identityIframeRef} className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: isIdentityFullscreen ? '100vh' : '800px' }}>
                      {identityIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading identity insurance portal...</p>
                          </div>
                        </div>
                      )}
                      <Button
                        onClick={toggleIdentityFullscreen}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-foreground shadow-lg"
                        size="icon"
                        title={isIdentityFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isIdentityFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </Button>
                      <iframe 
                        src="https://brokers.insuranceforeveryone.com/?share=true&Portal=3F1E75E8-3EB3-44DF-B610-D07EF8AA8771"
                        className="w-full h-full border-0"
                        title="Identity Insurance Portal"
                        allow="geolocation"
                        onLoad={() => {
                          console.log('Identity iframe loaded successfully');
                          setIdentityIframeLoading(false);
                          if (identityTimeoutRef.current) {
                            clearTimeout(identityTimeoutRef.current);
                          }
                        }}
                        onError={() => {
                          console.error('Identity iframe failed to load');
                          setIdentityIframeError(true);
                          setIdentityIframeLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>}

          {/* Auto Insurance Form - Only for Auto Service */}
          {service.slug === 'auto' && <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                <div className="p-4 md:p-6">
                  <h3 className="text-3xl font-bold text-foreground mb-4 text-center">Get Your Auto Insurance Quote</h3>
                  <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Fill out the form below to receive a personalized auto insurance quote tailored to your needs.
                  </p>
                  
                  {autoIframeError ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-6">
                        The form couldn't be loaded directly. Click below to open it in a new window.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={() => {
                          window.open('https://forms.monday.com/forms/50cd81705c249bac4ec9804fd41f7336?r=use1', '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Open Auto Insurance Form
                      </Button>
                    </div>
                  ) : (
                    <div ref={autoIframeRef} className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: isAutoFullscreen ? '100vh' : '800px' }}>
                      {autoIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading form...</p>
                          </div>
                        </div>
                      )}
                      <Button
                        onClick={toggleAutoFullscreen}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-foreground shadow-lg"
                        size="icon"
                        title={isAutoFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isAutoFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </Button>
                      <iframe 
                        src="https://forms.monday.com/forms/embed/50cd81705c249bac4ec9804fd41f7336?r=use1"
                        className="w-full h-full border-0"
                        title="Auto Insurance Quote Form"
                        onLoad={() => {
                          console.log('Auto form iframe loaded successfully');
                          setAutoIframeLoading(false);
                          if (autoTimeoutRef.current) {
                            clearTimeout(autoTimeoutRef.current);
                          }
                        }}
                        onError={() => {
                          console.error('Auto form iframe failed to load');
                          setAutoIframeError(true);
                          setAutoIframeLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>}

          {/* Home Insurance Form - Only for Home Service */}
          {service.slug === 'home' && <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                <div className="p-4 md:p-6">
                  <h3 className="text-3xl font-bold text-foreground mb-4 text-center">Get Your Home Insurance Quote</h3>
                  <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Fill out the form below to receive a personalized home insurance quote tailored to your needs.
                  </p>
                  
                  {homeIframeError ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-6">
                        The form couldn't be loaded directly. Click below to open it in a new window.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={() => {
                          window.open('https://forms.monday.com/forms/50cd81705c249bac4ec9804fd41f7336?r=use1', '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Open Home Insurance Form
                      </Button>
                    </div>
                  ) : (
                    <div ref={homeIframeRef} className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: isHomeFullscreen ? '100vh' : '800px' }}>
                      {homeIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading form...</p>
                          </div>
                        </div>
                      )}
                      <Button
                        onClick={toggleHomeFullscreen}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-foreground shadow-lg"
                        size="icon"
                        title={isHomeFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isHomeFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </Button>
                      <iframe 
                        src="https://forms.monday.com/forms/embed/50cd81705c249bac4ec9804fd41f7336?r=use1"
                        className="w-full h-full border-0"
                        title="Home Insurance Quote Form"
                        onLoad={() => {
                          console.log('Home form iframe loaded successfully');
                          setHomeIframeLoading(false);
                          if (homeTimeoutRef.current) {
                            clearTimeout(homeTimeoutRef.current);
                          }
                        }}
                        onError={() => {
                          console.error('Home form iframe failed to load');
                          setHomeIframeError(true);
                          setHomeIframeLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>}

          {/* Group Health Insurance Form - Only for Group Health Service */}
          {service.slug === 'group-health' && <div className="mb-16">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                <div className="p-4 md:p-6">
                  <h3 className="text-3xl font-bold text-foreground mb-4 text-center">Get Your Group Health Insurance Quote</h3>
                  <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Fill out the form below to receive a personalized group health insurance quote for your organization.
                  </p>
                  
                  {groupHealthIframeError ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-6">
                        The form couldn't be loaded directly. Click below to open it in a new window.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={() => {
                          window.open('https://forms.monday.com/forms/346b024b1b2521abb30be53c4f0dc5a5?r=use1', '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Open Group Health Insurance Form
                      </Button>
                    </div>
                  ) : (
                    <div ref={groupHealthIframeRef} className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: isGroupHealthFullscreen ? '100vh' : '800px' }}>
                      {groupHealthIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading form...</p>
                          </div>
                        </div>
                      )}
                      <Button
                        onClick={toggleGroupHealthFullscreen}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-foreground shadow-lg"
                        size="icon"
                        title={isGroupHealthFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isGroupHealthFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </Button>
                      <iframe 
                        src="https://forms.monday.com/forms/embed/346b024b1b2521abb30be53c4f0dc5a5?r=use1"
                        className="w-full h-full border-0"
                        title="Group Health Insurance Quote Form"
                        onLoad={() => {
                          console.log('Group Health form iframe loaded successfully');
                          setGroupHealthIframeLoading(false);
                          if (groupHealthTimeoutRef.current) {
                            clearTimeout(groupHealthTimeoutRef.current);
                          }
                        }}
                        onError={() => {
                          console.error('Group Health form iframe failed to load');
                          setGroupHealthIframeError(true);
                          setGroupHealthIframeLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>}

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