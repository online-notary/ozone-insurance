import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TeamSection from "@/components/TeamSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import OptionPanel from "@/components/OptionPanel";
import professionalTeam from "@/assets/professional-team.jpg";
import madhuAbout from "@/assets/madhu-about.png";
import ashutoshShyam from "@/assets/ashutosh-shyam-new.png";
import rukminiVemulakonda from "@/assets/rukmini-vemulakonda-new.png";
import anitaMirchandani from "@/assets/anita-mirchandani-new.png";
import sunithaPentapati from "@/assets/sunitha-pentapati-new.png";
import santhoshRaghunath from "@/assets/santhosh-raghunath.gif";
import madhuGowda from "@/assets/madhu-gowda-new.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";
import project9 from "@/assets/project-9.jpg";

const Index = () => {
  const [isOptionPanelOpen, setIsOptionPanelOpen] = useState(false);

  const teamMembers = [
    {
      name: "Madhu Gowda",
      role: "Founder",
      imgSrc: madhuGowda,
      profileHref: "/team/madhu-gowda",
      socials: [
        { iconClass: "linkedin", href: "#" },
        { iconClass: "facebook", href: "#" }
      ]
    },
    {
      name: "Dr. Ashutosh Shyam, PhD",
      role: "Insurance Advisor",
      imgSrc: ashutoshShyam,
      profileHref: "/team/ashutosh-shyam",
      socials: [
        { iconClass: "linkedin", href: "#" },
        { iconClass: "facebook", href: "#" }
      ]
    },
    {
      name: "Rukmini Vemulakonda",
      role: "Insurance Advisor",
      imgSrc: rukminiVemulakonda,
      profileHref: "/team/rukmini-vemulakonda",
      socials: [
        { iconClass: "linkedin", href: "#" },
        { iconClass: "facebook", href: "#" }
      ]
    },
    {
      name: "Anita Mirchandani",
      role: "Insurance Advisor",
      imgSrc: anitaMirchandani,
      profileHref: "/team/anita-mirchandani",
      socials: [
        { iconClass: "linkedin", href: "#" },
        { iconClass: "facebook", href: "#" }
      ]
    },
    {
      name: "Sunitha Pentapati",
      role: "Insurance Advisor",
      imgSrc: sunithaPentapati,
      profileHref: "/team/sunitha-pentapati",
      socials: [
        { iconClass: "linkedin", href: "#" },
        { iconClass: "facebook", href: "#" }
      ]
    },
    {
      name: "Santhosh Raghunath",
      role: "Insurance Advisor",
      imgSrc: santhoshRaghunath,
      profileHref: "/team/santhosh-raghunath",
      socials: [
        { iconClass: "linkedin", href: "#" },
        { iconClass: "facebook", href: "#" }
      ]
    }
  ];

  const skills = [
    { label: "Insurance Planning", percent: 95 },
    { label: "Risk Assessment", percent: 88 },
    { label: "Financial Analysis", percent: 92 },
    { label: "Client Relations", percent: 97 }
  ];

  const features = [
    {
      iconClass: "consultation",
      title: "Trained Workers",
      desc: "Our highly trained professionals ensure top-quality service and expertise in every interaction.",
      href: "#"
    },
    {
      iconClass: "support",
      title: "Authorized Company",
      desc: "We are an authorized and certified insurance provider, committed to meeting and exceeding industry standards.",
      href: "#"
    },
    {
      iconClass: "analysis",
      title: "Quick Response",
      desc: "We respond quickly and efficiently to all your questions and insurance needs.",
      href: "#"
    }
  ];

  const portfolioItems = [
    { title: "Former insures only the marine perils", href: "#portfolio", imgSrc: project1 },
    { title: "Insurance covers risk of fire absence", href: "#portfolio", imgSrc: project2 },
    { title: "Serving the interests of our clients", href: "#portfolio", imgSrc: project3 },
    { title: "Guide To Audio Visual With JavaScript", href: "#portfolio", imgSrc: project4 },
    { title: "Building Web Layouts For Dual Devices", href: "#portfolio", imgSrc: project5 },
    { title: "Professional Financial Planning Solutions", href: "#portfolio", imgSrc: project6 },
    { title: "Comprehensive Insurance Coverage", href: "#portfolio", imgSrc: project7 },
    { title: "Expert Financial Advisory Services", href: "#portfolio", imgSrc: project8 },
    { title: "Modern Insurance Technology", href: "#portfolio", imgSrc: project9 }
  ];

  return (
    <div className="min-h-screen">
      <Header onOptionPanelToggle={() => setIsOptionPanelOpen(!isOptionPanelOpen)} />
      <main>
        <Hero />
        <TeamSection
          members={teamMembers}
          videoImgSrc={professionalTeam}
          videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          skills={skills}
          features={features}
        />
        <Services />
        <About mainImageSrc={madhuAbout} />
        <Contact />
      </main>
      <Footer />
      
      <OptionPanel
        isOpen={isOptionPanelOpen}
        onClose={() => setIsOptionPanelOpen(false)}
        logoSrc="https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/logo/%20blf%20logo.png"
        aboutText="As independent agents, we review quotes from multiple insurance companies to provide you with the best rates and solutions that meet your personal or business needs. We are your one-stop shop for all things insurance related."
        phone="1-833-MY-OZONE"
        email="info@ozoneinsurance.com"
        hoursLabel="Working Hours :"
        hoursValue="Sun-Monday, 09am-5pm"
        portfolioHeading="Latest Portfolio"
        helpHeading="Need Any Help? Or Looking For an Agent"
        items={portfolioItems}
      />
    </div>
  );
};

export default Index;
