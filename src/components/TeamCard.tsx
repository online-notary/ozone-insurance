import React, { useRef } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export type Social = { iconClass: string; href: string };
export type TeamMember = {
  name: string;
  role: string;
  imgSrc: string;
  profileHref?: string;
  socials?: Social[];
  /** optional short, muted mp4/webm preview */
  videoSrc?: string;
  /** optional poster (defaults to imgSrc) */
  videoPoster?: string;
  /** optional license number */
  license?: string;
};

const TeamCard: React.FC<{ m: TeamMember }> = ({ m }) => {
  const vidRef = useRef<HTMLVideoElement | null>(null);

  const play = async () => {
    console.log(`Play function called for: ${m.name}`);
    console.log(`Video element exists:`, !!vidRef.current);
    console.log(`Video source:`, m.videoSrc);
    
    if (vidRef.current && m.videoSrc) {
      try {
        // Reset to beginning
        vidRef.current.currentTime = 0;
        // Wait a bit to ensure any previous operations are complete
        await new Promise(resolve => setTimeout(resolve, 50));
        await vidRef.current.play();
        console.log(`Video playing successfully for ${m.name}`);
      } catch (error) {
        console.error(`Video play failed for ${m.name}:`, error);
      }
    }
  };
  
  const stop = () => {
    if (vidRef.current && !vidRef.current.paused) {
      vidRef.current.pause();
      vidRef.current.currentTime = 0;
    }
  };

  const handleVideoEnd = () => {
    // Video has ended, it will naturally fade out due to CSS
    console.log(`Video ended for ${m.name}`);
  };

  const getIcon = (iconClass: string) => {
    if (iconClass.includes('facebook')) return <Facebook size={16} />;
    if (iconClass.includes('twitter')) return <Twitter size={16} />;
    if (iconClass.includes('linkedin')) return <Linkedin size={16} />;
    if (iconClass.includes('instagram')) return <Instagram size={16} />;
    return null;
  };

  return (
    <div 
      className="group hover:bg-gradient-to-b hover:from-[#8e6f2f] hover:to-[#7d6129] focus:bg-gradient-to-b focus:from-[#8e6f2f] focus:to-[#7d6129] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 p-6 text-center max-w-md mx-auto"
      style={{backgroundColor: '#EDF7FE'}}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      tabIndex={0}
    >
      <div className="mb-4">
        <div 
          className="w-80 h-80 mx-auto rounded-xl overflow-hidden shadow-md team-video-wrap"
        >
          <img src={m.imgSrc} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

          {/* video overlay (only renders if provided) */}
          {m.videoSrc && (
            <video
              ref={vidRef}
              className="team-hover-video"
              muted
              playsInline
              preload="metadata"
              poster={m.videoPoster || m.imgSrc}
              onLoadStart={() => console.log(`Video loading started: ${m.videoSrc}`)}
              onCanPlay={() => console.log(`Video can play: ${m.videoSrc}`)}
              onError={(e) => console.error(`Video error for ${m.name}:`, e)}
              onEnded={handleVideoEnd}
            >
              <source src={m.videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      
      <div className="px-2">
        <h6 className="text-lg font-bold text-[#0F3567] group-hover:text-white group-focus:text-white transition-colors mb-2">
          <a href={m.profileHref || "#"} className="text-inherit group-hover:text-white group-focus:text-white transition-colors">
            {m.name}
          </a>
        </h6>
        <p className="text-[#0F3567] group-hover:text-white group-focus:text-white text-xs mb-4 leading-relaxed transition-colors">{m.role}</p>
        
        {m.license && (
          <p className="text-[#0F3567] group-hover:text-white group-focus:text-white text-xs mb-4 leading-relaxed transition-colors font-medium">
            {m.license}
          </p>
        )}
        
        <div className="flex gap-3 justify-center mt-6">
          {(m.socials || []).map((s, i) => (
            <a 
              key={i}
              href={s.href} 
              className="w-10 h-10 bg-blue-600/20 group-hover:bg-white/20 group-focus:bg-white/20 hover:bg-blue-600/30 group-hover:hover:bg-white/30 group-focus:hover:bg-white/30 text-[#0F3567] group-hover:text-white group-focus:text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              style={{}}
              aria-label={s.iconClass}
            >
              {getIcon(s.iconClass)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;