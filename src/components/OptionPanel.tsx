import { useEffect, useRef } from "react";
import { X, Phone, Mail, Clock, ChevronLeft, ChevronRight } from "lucide-react";

type PortfolioItem = {
  title: string;
  href: string;
  imgSrc: string;
  alt?: string;
};

type OptionPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  logoSrc: string;
  aboutText: string;
  phone: string;          // e.g. "9806071234"
  email: string;          // e.g. "sendmail@example.com"
  hoursLabel: string;     // e.g. "Working Hours :"
  hoursValue: string;     // e.g. "Sun–Monday, 09am–5pm"
  portfolioHeading?: string;
  helpHeading?: string;
  items: PortfolioItem[];
};

export default function OptionPanel({
  isOpen,
  onClose,
  logoSrc,
  aboutText,
  phone,
  email,
  hoursLabel,
  hoursValue,
  portfolioHeading = "Latest Portfolio",
  helpHeading = "Need Any Help? Or Looking For an Agent",
  items
}: OptionPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".modal_post_grid");
    const delta = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  return (
    <div
      ref={rootRef}
      className={`option_panel-popup ${isOpen ? "popup-visible" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="sdmenu_overlay" onClick={onClose}></div>

      <div className="option_boxed scrollbarcolor">
        <button
          type="button"
          className="close-option-pan"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="option_content scrollbarcolor">
          <div className="log_bx">
            <a href="#" className="logo navbar-brand" aria-label="Home">
              <img src={logoSrc} alt="Vankine" className="logo_default" />
            </a>
            <div className="about_company">{aboutText}</div>
          </div>

          <div className="contnet_box">
            <div className="post_contet_modal">
              <h2 className="title_no_a_28">{portfolioHeading}</h2>

              {/* Carousel (native scroll-snap) */}
              <div className="post_enable">
                <div className="theme_carousel owl-theme">
                  <div className="owl-stage-outer">
                    <div
                      ref={trackRef}
                      className="owl-stage"
                      style={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gridAutoColumns: "minmax(260px, 340px)",
                        gap: "10px",
                        overflowX: "auto",
                        scrollSnapType: "x mandatory",
                        scrollBehavior: "smooth",
                        paddingBottom: "10px"
                      }}
                    >
                      {items.map((it, idx) => (
                        <div
                          key={idx}
                          className="owl-item"
                          style={{ scrollSnapAlign: "start" }}
                        >
                          <div className="modal_post_grid">
                            <a href={it.href}>
                              <img
                                src={it.imgSrc}
                                className="main_img img-fluid"
                                alt={it.alt || it.title}
                              />
                              <h2 className="tit_ho title_no_a_20">{it.title}</h2>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nav buttons */}
                  <div className="owl-nav" style={{ display: "flex", gap: 8, justifyContent: "center", paddingTop: 12 }}>
                    <button 
                      type="button" 
                      className="owl-prev bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors" 
                      onClick={() => scrollByCards(-1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      type="button" 
                      className="owl-next bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors" 
                      onClick={() => scrollByCards(1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="owl-dots" style={{ display: "none" }}></div>
                </div>
              </div>
            </div>

            <h2 className="title_no_a_28">{helpHeading}</h2>

            <div className="contact_panel">
              <div className="c_pan">
                <a href={`tel:${phone}`} className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>{phone}</span>
                </a>
              </div>
              <div className="c_pan">
                <a href={`mailto:${email}`} className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </a>
              </div>
              <div className="c_pan">
                <span className="wk_hours flex items-center space-x-2 text-slate-700">
                  <Clock className="h-4 w-4" />
                  <span>{hoursLabel} <span>{hoursValue}</span></span>
                </span>
              </div>
            </div>

            <div className="c_pan text-slate-500 text-sm">© 2022 Vankine. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
}