import React from "react";
import TeamCard, { TeamMember } from "./TeamCard";
type TeamSectionProps = {
  headingSmall?: string;
  heading?: string;
  members: TeamMember[];
};
const TeamSection: React.FC<TeamSectionProps> = ({
  headingSmall = "Our Team Member",
  heading = "Meet Our Amazing Team",
  members
}) => {
  return <section id="team" className="py-20 relative overflow-hidden">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/team-background.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[5]"></div>
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Team Members */}
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white">{heading}</h2>
        </div>

        {/* Team Members Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {members.map((m, i) => <div key={i} className="w-full sm:w-auto">
              <TeamCard m={m} />
            </div>)}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a href="#contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Get in Touch with Our Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
      </div>
    </section>;
};
export default TeamSection;