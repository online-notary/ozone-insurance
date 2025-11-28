import React from "react";
import { Play, ArrowRight } from "lucide-react";
import TeamCard, { TeamMember } from "./TeamCard";

type Feature = { iconClass: string; title: string; desc: string; href?: string };

type TeamSectionProps = {
  headingSmall?: string;
  heading?: string;
  members: TeamMember[];
  featuresHeadingSmall?: string;
  featuresHeading?: string;
  features: Feature[]; // 3 items
};


const FeatureCard: React.FC<{ f: Feature }> = ({ f }) => {
  const getFeatureIcon = (iconClass: string) => {
    // You can map more icons here based on your needs
    return <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
      <span className="text-2xl font-bold">★</span>
    </div>;
  };

  return (
    <div className="bg-card p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="mb-6">
        {getFeatureIcon(f.iconClass)}
      </div>
      <h4 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
        <a href={f.href || "#"}>{f.title}</a>
      </h4>
      <p className="text-muted-foreground mb-6 leading-relaxed">{f.desc}</p>
      <a 
        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300" 
        href={f.href || "#"}
      >
        Read More
        <ArrowRight size={16} />
      </a>
    </div>
  );
};

const TeamSection: React.FC<TeamSectionProps> = ({
  headingSmall = "Our Team Member",
  heading = "Meet Our Amazing Team",
  members,
  featuresHeadingSmall = "Great Offer For Customer",
  featuresHeading = "Amazing Features For Insurance",
  features
}) => {
  return (
    <section id="team" className="py-20 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/team-background.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[5]"></div>
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Team Members */}
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="text-primary font-medium mb-4">{headingSmall}</h4>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">{heading}</h2>
        </div>

        {/* Team Members Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {members.map((m, i) => (
            <div key={i} className="w-full sm:w-auto">
              <TeamCard m={m} />
            </div>
          ))}
        </div>
      </div>

        {/* Features Section */}
        <div className="bg-secondary/30 mt-20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-primary font-medium mb-4">{featuresHeadingSmall}</h4>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{featuresHeading}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} f={f} />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;