"use client";
import React from "react";
import WavePattern from "@/components/WavePattern";
import heroFamily from "@/assets/hero-family.jpg";
import professionalTeam from "@/assets/professional-team.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";

/** --- Inline SVG icons (no external libs) --- */
const IconArrowNE = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1.5 1.5 0 011.5-.37c1.6.53 3.3.82 5 .87a1.5 1.5 0 011.5 1.5V21a1.5 1.5 0 01-1.5 1.5C9.2 22.5 1.5 14.8 1.5 3A1.5 1.5 0 013 1.5H6.7A1.5 1.5 0 018.2 3c.05 1.7.34 3.4.87 5a1.5 1.5 0 01-.37 1.5l-2.1 2.3z" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500" fill="currentColor">
    <path d="M12 2l7 3v6c0 5.55-3.84 10.74-7 12-3.16-1.26-7-6.45-7-12V5l7-3z" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 11h4v-2h-3V7h-2v6z" />
  </svg>
);
const IconUp = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 4l8 8-1.41 1.41L13 7.83V20h-2V7.83L5.41 13.4 4 12z" />
  </svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);
const IconFb = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8z" />
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M4 3l7.5 9.2L4.7 21h2.1l5.8-7.1L18 21h3l-7.8-9.7L20.5 3h-2.1l-5.2 6.4L8 3H4z" />
  </svg>
);
const IconSkype = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 4a8 8 0 018 8 5.5 5.5 0 01-1.4 3.7A5.6 5.6 0 0115 18.4 8 8 0 114 12c0-.5 0-.9.1-1.4A5.6 5.6 0 018.6 6 8 8 0 0112 4zm.2 12.5c2 0 3.6-.9 3.6-2.3 0-3.2-5.5-1.6-5.5-3.4 0-.6.6-1 1.7-1 1 0 2 .3 2.7.8l.6-1.3c-.8-.5-1.9-.8-3.1-.8-1.9 0-3.4.9-3.4 2.3 0 3.1 5.5 1.6 5.5 3.4 0 .7-.8 1.1-2.1 1.1-1.2 0-2.4-.4-3.2-1l-.6 1.3c.9.6 2.2.9 3.8.9z" />
  </svg>
);
const IconIg = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 4a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM18 6.5a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
);

export default function Footer() {
  const backToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* CTA Banner */}
      <section className="container mx-auto px-4 my-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl leading-tight">
              Better Insurance For Everyone
              <br className="hidden md:block" /> Start Your Quote Today
            </h2>
          </div>
          <div className="flex items-center gap-6 md:ml-auto">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 rounded-full px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
            >
              Track Your Claim <IconArrowNE />
            </a>

            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
                <IconPhone />
              </span>
              <div className="text-sm">
                <div className="text-white/80">Need Help?</div>
                <div className="font-bold text-lg">(415) 900-9086</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden pt-16">
        {/* Decorative wave patterns */}
        <div className="absolute inset-0">
          {/* Top-left wave */}
          <div className="absolute top-0 left-0">
            <WavePattern />
          </div>
          
          {/* Bottom-right wave (mirrored) */}
          <div className="absolute bottom-0 right-0 transform rotate-180 scale-x-[-1]">
            <WavePattern />
          </div>
        </div>

        <div className="container mx-auto px-4 pb-8 relative z-10">
          <div className="grid grid-cols-12 gap-8">
            {/* Col 1: Company Info */}
            <div className="col-span-12 lg:col-span-4">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-bold">🛡️ Ozone Insurance</span>
              </div>
              <p className="text-white/80 mb-2 font-semibold">
                Ozone Insurance Services Inc.
              </p>
              <p className="text-white/70 mb-1 text-sm">
                Your one-stop shop for all your insurance needs
              </p>
              <p className="text-white/70 mb-6 text-sm">
                CA LIC# 0K48512
              </p>

              <form className="mb-6 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
                <input
                  className="flex-1 rounded-lg bg-white text-gray-800 placeholder:text-gray-500 px-4 py-3 outline-none"
                  placeholder="Your email address"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 transition-colors"
                >
                  Sign up
                </button>
              </form>

              <div className="flex gap-3">
                {[
                  [IconFb, "Facebook"],
                  [IconX, "Twitter"],
                  [IconSkype, "Skype"],
                  [IconIg, "Instagram"],
                ].map(([Icon, label]) => (
                  <a
                    key={label as string}
                    href="#"
                    aria-label={label as string}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors"
                  >
                    {React.createElement(Icon as any)}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="col-span-6 lg:col-span-2">
              <h5 className="mb-6 font-semibold text-white text-lg">Services</h5>
              <ul className="space-y-3">
                {[
                  "House Insurance",
                  "Medical Insurance",
                  "Car Insurance",
                  "Business Insurance",
                  "Travel Insurance",
                  "Fire Insurance",
                  "Marrige Insurance",
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="flex items-center gap-2 text-white/80 hover:text-blue-400 transition-colors">
                      <IconArrowRight />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Other Pages */}
            <div className="col-span-6 lg:col-span-2">
              <h5 className="mb-6 font-semibold text-white text-lg">Other Pages</h5>
              <ul className="space-y-3">
                {[
                  "My Account",
                  "Need A Career?",
                  "News & Blog",
                  "Payment Way",
                  "Team Member",
                  "About Us",
                ].map((page) => (
                  <li key={page}>
                    <a href="#" className="flex items-center gap-2 text-white/80 hover:text-blue-400 transition-colors">
                      <IconArrowRight />
                      {page}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Photo Gallery */}
            <div className="col-span-12 lg:col-span-4">
              <h5 className="mb-6 font-semibold text-white text-lg">Photo Gallery</h5>
              <div className="grid grid-cols-3 gap-2">
                <img src={heroFamily} alt="Happy family" className="w-full h-20 object-cover rounded-lg" />
                <img src={professionalTeam} alt="Professional team" className="w-full h-20 object-cover rounded-lg" />
                <img src={project1} alt="Team meeting" className="w-full h-20 object-cover rounded-lg" />
                <img src={project2} alt="Business consultation" className="w-full h-20 object-cover rounded-lg" />
                <img src={project3} alt="Professional handshake" className="w-full h-20 object-cover rounded-lg" />
                <img src={project4} alt="Team collaboration" className="w-full h-20 object-cover rounded-lg" />
                <img src={project5} alt="Business meeting" className="w-full h-20 object-cover rounded-lg" />
                <img src={project6} alt="Office workspace" className="w-full h-20 object-cover rounded-lg" />
                <img src={project7} alt="Team discussion" className="w-full h-20 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="bg-slate-900/50 border-t border-white/10">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2">
              <IconShield />
              <span className="text-white/80 text-sm">© 2025 Ozone Insurance Services Inc.</span>
            </div>

            <div className="flex items-center gap-2">
              <IconClock />
              <span className="text-white/80 text-sm">Working Hours : Sun-Monday, 09am–5pm</span>
            </div>

            <button
              onClick={backToTop}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
            >
              <IconUp />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}