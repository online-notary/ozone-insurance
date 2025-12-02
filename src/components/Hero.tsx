import { ChevronLeft, ChevronRight } from "lucide-react";
import banner11 from "@/assets/banner-1-1.jpg";
import banner12 from "@/assets/banner-1-2.jpg";
import banner13 from "@/assets/banner-1-3.jpg";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const sliderRef = useRef<Slider>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
      badge: "Independent Agents",
      title: ["Better Insurance", "For", "Everyone"],
      video: "/videos/hero-slider-1.mp4",
      image: banner11, // fallback
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
      setCurrentSlide(next);
    },
    afterChange: (current: number) => {
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
              {/* Background Layer - Video or Image */}
              {slide.type === "video" && slide.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-[50vh] object-cover"
                  onLoadedMetadata={(e) => {
                    (e.target as HTMLVideoElement).playbackRate = 0.5;
                  }}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : (
                <div 
                  className="image-layer absolute inset-0 bg-cover bg-center bg-no-repeat h-[50vh]"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                ></div>
              )}
              
              {/* Background Overlay - Lighter for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent h-[50vh]"></div>
              
              {/* Empty content area for slide height */}
              <div className="relative h-[50vh]"></div>
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