import React from "react";
import { Play, ArrowRight } from "lucide-react";
import TeamCard, { TeamMember } from "./TeamCard";

type Skill = { label: string; percent: number };
type Feature = { iconClass: string; title: string; desc: string; href?: string };

type TeamSectionProps = {
  headingSmall?: string;
  heading?: string;
  members: TeamMember[];
  videoImgSrc: string;
  videoUrl: string;
  skillsHeadingSmall?: string;
  skillsHeading?: string;
  skillsDesc?: string;
  skills: Skill[];
  featuresHeadingSmall?: string;
  featuresHeading?: string;
  features: Feature[]; // 3 items
};


const SkillBar: React.FC<{ s: Skill }> = ({ s }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <h6 className="text-lg font-medium text-foreground">{s.label}</h6>
      <span className="text-primary font-semibold">{s.percent}%</span>
    </div>
    <div className="w-full bg-secondary rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${s.percent}%` }}
      />
    </div>
  </div>
);

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
  videoImgSrc,
  videoUrl,
  skillsHeadingSmall = "Popular Skills",
  skillsHeading = "We're Best Experience Insurance Provider",
  skillsDesc = "Sit amet consectetur adipiscing elites varius montes, massa blandit orci. Sed egestas tellu aliquet egetristique",
  skills,
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

        {/* Skills Section */}
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
              <img
                src={videoImgSrc}
                alt="video cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <a 
                  href={videoUrl} 
                  className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="Play video"
                >
                  <Play size={32} fill="currentColor" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-primary font-medium mb-4">{skillsHeadingSmall}</h4>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{skillsHeading}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{skillsDesc}</p>

            {skills.map((s, i) => (
              <SkillBar key={i} s={s} />
            ))}
          </div>
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