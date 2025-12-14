import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, Search, Facebook, Twitter, MessageCircle, Send, Grid3X3, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ozoneLogo from "@/assets/ozone-logo.png";

const Header = ({ onOptionPanelToggle }: { onOptionPanelToggle?: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, userRole, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.email || 'User';
  };

  const getRoleBadge = () => {
    if (userRole === 'advisor') return 'Advisor';
    if (userRole === 'client') return 'Client';
    if (userRole === 'admin') return 'Admin';
    return '';
  };

  const handleBookMeeting = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigation = [
    { name: "Home", href: "#home", section: "home" },
    { name: "Services", href: "#services", section: "services" },
    { name: "Advisors", href: "#team", section: "team" },
    { name: "About", href: "#about", section: "about" },
    { name: "Contact", href: "#contact", section: "contact" },
    { name: "Privacy", href: "/privacy", section: "privacy", isRoute: true },
  ];

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent, item: { name: string; href: string; section: string; isRoute?: boolean }) => {
    e.preventDefault();
    
    // If it's a route, navigate directly
    if (item.isRoute) {
      navigate(item.href);
      setIsMenuOpen(false);
      return;
    }
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate(`/${item.href}`);
    } else {
      // We're on the home page, scroll to section with offset for fixed header
      const element = document.getElementById(item.section);
      if (element) {
        const headerOffset = 130; // Height of fixed header (top bar + nav)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    setIsMenuOpen(false);
  };

  // Track active section based on URL hash
  useEffect(() => {
    const updateActiveSection = () => {
      const hash = window.location.hash.slice(1);
      setActiveSection(hash || "home");
    };
    
    updateActiveSection();
    window.addEventListener("hashchange", updateActiveSection);
    
    return () => window.removeEventListener("hashchange", updateActiveSection);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Contact Bar - Hidden on mobile for cleaner UX */}
      <div className="hidden md:block bg-slate-900 py-2.5">
        <div className="large-container">
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center space-x-6">
              <span className="text-gray-300">CA LIC# 0K48512 | Working Hours: Monday-Saturday, 9am-5pm</span>
              <a href="tel:+18336969663" className="flex items-center bg-primary hover:bg-primary/90 px-3 py-1 rounded-full transition-colors">
                <Phone className="h-3 w-3 mr-2" />
                <span className="font-medium text-white">Call: 1-833-MY-OZONE</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Facebook className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
                <MessageCircle className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
                <Send className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="large-container py-0">
          <div className="flex items-center justify-between h-16 md:h-[84px]">
            {/* Logo Section */}
            <Link to="/" className="flex items-center cursor-pointer">
              <img 
                src={ozoneLogo}
                alt="Ozone Insurance Services, Inc."
                className="object-contain h-10 md:h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item) => {
                const isActive = item.isRoute 
                  ? location.pathname === item.href
                  : activeSection === item.section && location.pathname === '/';
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`
                      px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm cursor-pointer
                      ${isActive 
                        ? "bg-primary text-white shadow-md" 
                        : "text-slate-700 hover:text-primary hover:bg-primary/5"
                      }
                    `}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Search className="h-5 w-5 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
              
              {user ? (
                <>
                  <Button 
                    onClick={handleBookMeeting}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium text-sm shadow-sm"
                  >
                    Book a Meeting
                  </Button>
                  
                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 px-3">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{getUserDisplayName()}</span>
                        {getRoleBadge() && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {getRoleBadge()}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{getUserDisplayName()}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        {getRoleBadge() && (
                          <p className="text-xs text-primary font-medium mt-1">{getRoleBadge()}</p>
                        )}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="h-4 w-4 mr-2" />
                        <Link to="/dashboard" className="flex-1">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button 
                  onClick={handleBookMeeting}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium text-sm shadow-sm"
                >
                  Book a Meeting
                </Button>
              )}
              
              <Grid3X3 
                className="h-5 w-5 text-slate-600 hover:text-primary cursor-pointer transition-colors" 
                onClick={onOptionPanelToggle}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 -mr-2 touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-7 w-7 text-slate-700" />
              ) : (
                <Menu className="h-7 w-7 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu - Full Screen Overlay */}
          <div 
            className={`
              lg:hidden fixed inset-0 top-16 bg-white z-40 transition-all duration-300 ease-in-out
              ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
            `}
          >
            <nav className="flex flex-col h-full overflow-y-auto pb-24">
              {/* Navigation Items */}
              <div className="flex flex-col p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = item.isRoute 
                    ? location.pathname === item.href
                    : activeSection === item.section && location.pathname === '/';
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`
                        flex items-center px-5 py-4 rounded-xl font-medium text-lg transition-all duration-200 cursor-pointer touch-manipulation
                        ${isActive 
                          ? "bg-primary text-white shadow-md" 
                          : "text-slate-700 hover:bg-primary/5 active:bg-primary/10"
                        }
                      `}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
              
              {/* Divider */}
              <div className="mx-4 border-t border-gray-200 my-2" />
              
              {/* Action Buttons */}
              <div className="flex flex-col p-4 space-y-3">
                <Button 
                  onClick={handleBookMeeting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-base shadow-sm touch-manipulation"
                  size="lg"
                >
                  Book a Meeting
                </Button>
                
                <a
                  href="tel:+18336969663"
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold text-base shadow-sm touch-manipulation transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Call: 1-833-MY-OZONE
                </a>
                
                {user && (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full bg-primary/10 text-primary py-4 rounded-xl font-semibold text-base touch-manipulation"
                    >
                      <Settings className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Button 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }} 
                      variant="ghost" 
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 py-4 rounded-xl font-semibold text-base touch-manipulation"
                      size="lg"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
              
              {/* Social Links */}
              <div className="mt-auto p-4 border-t border-gray-200">
                <p className="text-sm text-muted-foreground text-center mb-3">Follow Us</p>
                <div className="flex items-center justify-center space-x-6">
                  <Facebook className="h-6 w-6 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
                  <Twitter className="h-6 w-6 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
                  <MessageCircle className="h-6 w-6 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
                  <Send className="h-6 w-6 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">CA LIC# 0K48512</p>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;