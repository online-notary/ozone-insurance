// src/components/AboutHero.tsx
import React, { useState } from "react";

type AboutTab = {
  key: "aboutus" | "mission" | "vision";
  title: string;
  paragraph: React.ReactNode;
  col1: string[];
  col2: string[];
};

type Props = {
  mainImageSrc: string;
  waveLeftSrc?: string;     // soft blue waves (left)
  mandalaSrc?: string;      // small orange mandala accent (behind image)
  cityLineSrc?: string;     // faint city line art (right)
  smallTitle?: string;
  bigTitle?: string;
  ctaText?: string;
  ctaHref?: string;
  tabs?: AboutTab[];
};

const Arrow12 = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Tick = () => (
  <svg width="20" height="20" viewBox="0 0 25 25" fill="none" aria-hidden>
    <circle cx="12.5" cy="12.5" r="12.5" fill="#36DB9F"/>
    <path d="M11.8 18.7c.4.4 1.3.3 1.4-.3.6-3.8 3.5-7 5.7-10 .6-.8-0-1.6-.6-.7-2 2.8-4.5 5.7-5.5 9-.9-.9-2.1-2-3.4-3.1-.8-.6-1.9.5-1.1 1.2 1.7 1.3 3.1 2.9 4.5 4.2Z" fill="#fff"/>
  </svg>
);

const AboutHero: React.FC<Props> = ({
  mainImageSrc,
  waveLeftSrc = "/assets/images/shape/wave-pattern-2.png",
  mandalaSrc = "/assets/images/about/about-background.png",
  cityLineSrc = "/assets/images/shape/city-line.svg",
  smallTitle = "About Company",
  bigTitle = "We’re a Trusted and Professional Insurance Company",
  ctaText = "More About Us",
  ctaHref = "#",
  tabs
}) => {
  const defaults: AboutTab[] = [
    {
      key: "aboutus",
      title: "About Us",
      paragraph: (
        <>As independent agents, we review quotes from multiple insurance companies to provide you with the best rates and solutions that meet your personal or business needs. We are your one-stop shop for all things insurance related.</>
      ),
      col1: ["Independent Agents", "Best Rates & Solutions", "Comprehensive Coverage"],
      col2: ["Trained Workers", "Authorized Company", "Quick Response"]
    },
    {
      key: "mission",
      title: "Mission",
      paragraph: (
        <>To simplify the insurance process, making it convenient and seamless to protect your future. We analyze your insurance needs and get you covered quickly at the most optimum price.</>
      ),
      col1: ["Best Rates", "Multiple Carriers", "Personalized Service"],
      col2: ["Fast Quotes", "Expert Guidance", "Complete Protection"]
    },
    {
      key: "vision",
      title: "Vision",
      paragraph: (
        <>To be the leading independent insurance agency, providing better insurance for everyone through personalized service, competitive rates, and comprehensive coverage solutions.</>
      ),
      col1: ["Industry Excellence", "Client Satisfaction", "Innovation"],
      col2: ["Trusted Service", "Community Focus", "Reliable Protection"]
    }
  ];

  const data = tabs?.length ? tabs : defaults;
  const [active, setActive] = useState<AboutTab["key"]>(data[0].key);

  return (
    <section id="about" className="relative overflow-hidden bg-gray-50">
      {/* Light blue wave background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-blue-100/80 to-transparent rounded-r-[100px]" />
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.1fr] gap-10 lg:gap-14 items-center py-10 lg:py-16">
          {/* Left image */}
          <div className="relative order-2 lg:order-1">
            {/* orange mandala accent */}
            {mandalaSrc && (
              <img
                src={mandalaSrc}
                alt=""
                className="absolute left-1/2 top-1/3 -translate-x-10 -translate-y-6 w-40 opacity-70"
              />
            )}
            <img
              src={mainImageSrc}
              alt="Professional holding laptop"
              className="relative z-[1] w-full max-w-xl mx-auto drop-shadow-[0_12px_32px_rgba(15,53,103,0.18)]"
            />
          </div>

          {/* Right content */}
          <div className="order-1 lg:order-2">
            {/* eyebrow */}
            <p className="text-sm font-medium text-[#2B6CB0] mb-2">{smallTitle}</p>

            {/* headline */}
            <h2 className="text-[#0F3567] text-4xl leading-tight font-extrabold sm:text-5xl mb-5">
              We’re a Trusted and Professional
              <br className="hidden sm:block" /> Insurance Company
            </h2>

            {/* tabs card */}
            <div className="mb-6">
              <div className="inline-flex gap-3 rounded-2xl bg-white/90 backdrop-blur shadow-[0_12px_30px_rgba(15,53,103,0.12)] p-2">
                {data.map((t) => {
                  const isActive = active === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActive(t.key)}
                      aria-selected={isActive}
                      className={[
                        "px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-all",
                        isActive
                          ? "bg-[#8e6f2f] text-white shadow-md"
                          : "bg-white text-[#8e6f2f] hover:bg-[#f5f1e8] border border-[#e8dcc6]"
                      ].join(" ")}
                    >
                      {t.title} <Arrow12 />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* paragraph */}
            <div className="text-[#5B6B7D] leading-relaxed mb-5 max-w-3xl">
              {data.find((t) => t.key === active)?.paragraph}
            </div>

            {/* bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 mb-7">
              {(data.find((t) => t.key === active)?.col1 || []).map((txt, i) => (
                <div key={`c1-${i}`} className="flex items-center gap-3">
                  <Tick />
                  <span className="text-[#0F3567]">{txt}</span>
                </div>
              ))}
              {(data.find((t) => t.key === active)?.col2 || []).map((txt, i) => (
                <div key={`c2-${i}`} className="flex items-center gap-3">
                  <Tick />
                  <span className="text-[#0F3567]">{txt}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-xl bg-[#8e6f2f] hover:bg-[#7d6129] text-white px-6 py-3 font-semibold shadow-[0_10px_24px_rgba(142,111,47,0.35)] transition-colors"
            >
              {ctaText} <Arrow12 />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
