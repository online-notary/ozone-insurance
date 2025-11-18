import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, Search, Facebook, Twitter, MessageCircle, Send, Grid3X3, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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

  const navigation = [
    { name: "Home", href: "#home", section: "home" },
    { name: "Services", href: "#services", section: "services" },
    { name: "Advisors", href: "#advisors", section: "advisors" },
    { name: "About", href: "#about", section: "about" },
    { name: "Contact", href: "#contact", section: "contact" },
  ];

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent, item: { name: string; href: string; section: string }) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate(`/${item.href}`);
    } else {
      // We're on the home page, just scroll to section
      const element = document.getElementById(item.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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
      {/* Top Contact Bar */}
      <div className="bg-slate-900 py-2.5">
        <div className="large-container">
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center space-x-6">
              <span className="text-gray-300">Working Hours: Sun-monday, 09am-5pm</span>
              <div className="flex items-center bg-primary hover:bg-primary/90 px-3 py-1 rounded-full transition-colors cursor-pointer">
                <Phone className="h-3 w-3 mr-2" />
                <span className="font-medium text-white">Call: (415) 900-9086</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
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
          <div className="flex items-center justify-between" style={{ height: '84px' }}>
            {/* Logo Section - Extended Blue Angled Background */}
            <div className="flex items-center -ml-4">
              <div className="relative">
                {/* SVG Border */}
                <svg 
                  className="absolute inset-0" 
                  style={{ width: '208.87px', height: '114.81px' }}
                  viewBox="0 0 209 115"
                >
                  <path 
                    d="M2 2 L167 2 L207 113 L2 113 Z" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Main White Background Shape */}
                <div 
                  className="relative flex items-center justify-start pl-8 pr-16 transform transition-all duration-300"
                  style={{
                    width: '208.87px',
                    height: '114.81px',
                    background: "white",
                    clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)",
                    boxShadow: `
                      0 16px 64px rgba(59, 130, 246, 0.4),
                      0 12px 48px rgba(59, 130, 246, 0.3),
                      0 8px 32px rgba(59, 130, 246, 0.2),
                      0 4px 16px rgba(0, 0, 0, 0.15),
                      0 2px 8px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                    `
                  }}
                >
                  {/* Logo */}
                  <div className="flex items-center relative z-10">
                    <img 
                      src="https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/logo/%20blf%20logo.png"
                      alt="BLF Logo"
                      className="object-contain filter drop-shadow-sm"
                      style={{
                        width: '205px',
                        height: '110px'
                      }}
                    />
                  </div>
                  
                  {/* Subtle inner highlight */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)"
                    }}
                  ></div>
                </div>
                
                {/* Shadow layer for depth */}
                <div 
                  className="absolute top-1 left-1 -z-10 opacity-20"
                  style={{
                    width: '208.87px',
                    height: '114.81px',
                    background: "rgba(0, 0, 0, 0.1)",
                    clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)",
                    filter: "blur(6px)"
                  }}
                ></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item) => {
                const isActive = activeSection === item.section && location.pathname === '/';
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
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium text-sm shadow-sm">
                    Get A Quote
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
                <>
                  <Link to="/auth">
                    <Button variant="ghost" className="text-slate-700 hover:text-primary px-4">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium text-sm shadow-sm">
                      Get A Quote
                    </Button>
                  </Link>
                </>
              )}
              
              <Grid3X3 
                className="h-5 w-5 text-slate-600 hover:text-primary cursor-pointer transition-colors" 
                onClick={onOptionPanelToggle}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-slate-700" />
              ) : (
                <Menu className="h-6 w-6 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => {
                  const isActive = activeSection === item.section && location.pathname === '/';
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`
                        px-4 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer
                        ${isActive 
                          ? "bg-primary text-white" 
                          : "text-slate-700 hover:text-primary"
                        }
                      `}
                    >
                      {item.name}
                    </a>
                  );
                })}
                <div className="flex items-center space-x-4 pt-4">
                  <Search className="h-5 w-5 text-slate-600" />
                  
                  {user ? (
                    <>
                      <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium">
                        Get A Quote
                      </Button>
                      <Button 
                        onClick={handleSignOut} 
                        variant="ghost" 
                        className="text-red-600 hover:text-red-700 px-4"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth">
                        <Button variant="ghost" className="text-slate-700 hover:text-primary px-4">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth">
                        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium">
                          Get A Quote
                        </Button>
                      </Link>
                    </>
                  )}
                  
                  <Grid3X3 
                    className="h-5 w-5 text-slate-600 hover:text-primary cursor-pointer transition-colors" 
                    onClick={onOptionPanelToggle}
                  />
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;