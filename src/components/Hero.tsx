import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import banner11 from "@/assets/banner-1-1.jpg";
import banner12 from "@/assets/banner-1-2.jpg";
import banner13 from "@/assets/banner-1-3.jpg";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { useAnimatedVideo } from "@/hooks/useAnimatedVideo";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const sliderRef = useRef<Slider>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { videoUrl, isLoading: videoLoading, error: videoError } = useAnimatedVideo();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const slides = [
    {
      type: "video",
      badge: "Dynamic Showcase",
      title: ["Experience", "Our", "Innovation"],
      videoUrl: videoUrl,
      alt: "Dynamic showcase of our innovative insurance solutions"
    },
    {
      type: "image",
      badge: "Independent Agents",
      title: ["Better Insurance", "For", "Everyone"],
      image: banner11,
      alt: "Professional insurance services for a better world"
    },
    {
      type: "image",
      badge: "Your One-Stop Shop", 
      title: ["Complete", "Insurance", "Solutions"],
      image: banner12,
      alt: "Secure insurance coverage for your family's future"
    },
    {
      type: "image",
      badge: "Authorized Company",
      title: ["Professional", "Service", "Guaranteed"],
      image: banner13,
      alt: "Complete insurance solutions for all your needs"
    }
  ];

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    beforeChange: (current: number, next: number) => {
      // Safely pause video when leaving video slide
      if (slides[current]?.type === "video" && videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (error) {
          console.warn('Error pausing video:', error);
        }
      }
      setCurrentSlide(next);
    },
    afterChange: (current: number) => {
      // Safely play video when entering video slide
      if (slides[current]?.type === "video" && videoRef.current) {
        try {
          videoRef.current.play().catch(error => {
            console.warn('Error playing video:', error);
          });
        } catch (error) {
          console.warn('Error accessing video:', error);
        }
      }
      setCurrentSlide(current);
    },
    pauseOnHover: true,
    pauseOnFocus: true,
    waitForAnimate: true,
  };

  const pauseAutoplayTemporarily = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Pause autoplay for UI indication
    setIsAutoPlaying(false);
    
    // Resume autoplay after 8 seconds
    timeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  const handleDotClick = (index: number) => {
    try {
      sliderRef.current?.slickGoTo(index);
      pauseAutoplayTemporarily();
    } catch (error) {
      console.warn('Error navigating to slide:', error);
    }
  };

  const handlePrevClick = () => {
    try {
      sliderRef.current?.slickPrev();
      pauseAutoplayTemporarily();
    } catch (error) {
      console.warn('Error navigating to previous slide:', error);
    }
  };

  const handleNextClick = () => {
    try {
      sliderRef.current?.slickNext();
      pauseAutoplayTemporarily();
    } catch (error) {
      console.warn('Error navigating to next slide:', error);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Slider ref={sliderRef} {...slickSettings}>
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className="outline-none">
            <div className="slide-item-content relative">
              {/* Video or Image Layer - Background */}
              {slide.type === "video" && slide.videoUrl && !videoLoading ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-screen object-cover"
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => {
                    // Reset video to beginning when it ends so carousel can continue normally
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                    }
                  }}
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              ) : slide.type === "image" ? (
                <div 
                  className="image-layer absolute inset-0 bg-cover bg-center bg-no-repeat h-screen"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                ></div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 h-screen"></div>
              )}
              
              {/* Background Overlay - Lighter for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent h-screen"></div>
              
              {/* Slide Content */}
              <div className="slide-item content_left relative h-screen">
                <div className="auto-container container mx-auto px-4 sm:px-6 lg:px-8 h-full">
                  <div className="row flex items-center h-full">
                    <div className="col-md-6 max-w-2xl w-full">
                      {slide.type === "image" ? (
                        /* Shape Background Container - Only for image slides */
                        <div className="relative bg-transparent max-w-4xl">
                          <div 
                            className="absolute inset-0 bg-contain bg-left bg-no-repeat w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
                            style={{
                              backgroundImage: `url(/lovable-uploads/76051c9e-2951-4125-a29c-44eab67f0ee6.png)`,
                            }}
                          ></div>
                          <div className="relative z-10 p-8 sm:p-12 lg:p-16 xl:p-20 max-w-2xl">
                            <div className="slider_content text-white">
                              {/* Subtitle with Icon */}
                              <h6 className="animate_up flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base lg:text-lg font-semibold mb-4 sm:mb-6">
                                <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white flex-shrink-0" />
                                <span>{slide.badge}</span>
                              </h6>

                              {/* Multi-line Title */}
                              <h1 className="animate_left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-heading mb-6 sm:mb-8">
                                {slide.title.map((line, lineIndex) => (
                                  <span key={lineIndex} className="block">
                                    {line}
                                    {lineIndex < slide.title.length - 1 && <br />}
                                  </span>
                                ))}
                              </h1>

                              {/* Single Button */}
                              <div className="button_all animate_down">
                                <Button 
                                  size="lg" 
                                  className="theme_btn color_white bg-white text-primary hover:bg-white/90 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 h-auto text-sm sm:text-base lg:text-lg font-bold rounded-lg transition-all duration-300 hover:shadow-xl"
                                >
                                  Read More
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Controls - Overlaid */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Navigation Dots */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? "bg-white w-3 h-3 sm:w-4 sm:h-4 shadow-lg scale-125" 
                      : "bg-white/50 w-2 h-2 sm:w-3 sm:h-3 hover:bg-white/80 hover:scale-110"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
              
              {/* Auto-play indicator */}
              <div className="ml-3 sm:ml-4 flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isAutoPlaying ? "bg-white animate-pulse" : "bg-white/50"
                }`}></div>
                <span className="text-xs text-white/70 font-medium hidden sm:inline">
                  {isAutoPlaying ? "Auto" : "Paused"}
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button 
                onClick={handlePrevClick}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 flex items-center justify-center hover:shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button 
                onClick={handleNextClick}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 flex items-center justify-center hover:shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;