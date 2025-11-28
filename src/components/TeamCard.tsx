import React, { useRef } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

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
    <Link 
      to={m.profileHref || "#"}
      className="block group hover:bg-gradient-primary focus:bg-gradient-primary rounded-2xl overflow-hidden shadow-soft hover:shadow-medium focus:shadow-medium transition-all duration-300 p-6 text-center max-w-md mx-auto bg-muted"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
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
        <h6 className="text-2xl font-bold text-primary group-hover:text-white group-focus:text-white transition-colors mb-3">
          {m.name}
        </h6>
        <p className="text-primary group-hover:text-white group-focus:text-white text-base font-semibold mb-4 leading-relaxed transition-colors">{m.role}</p>
        
        {m.license && (
          <p className="text-primary group-hover:text-white group-focus:text-white text-xs mb-4 leading-relaxed transition-colors font-medium">
            {m.license}
          </p>
        )}
        
        <div className="flex gap-3 justify-center mt-6">
          {(m.socials || []).map((s, i) => (
            <a 
              key={i}
              href={s.href} 
              className="w-10 h-10 bg-primary/10 group-hover:bg-white/20 group-focus:bg-white/20 hover:bg-primary/20 group-hover:hover:bg-white/30 group-focus:hover:bg-white/30 text-primary group-hover:text-white group-focus:text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              onClick={(e) => e.preventDefault()}
              aria-label={s.iconClass}
            >
              {getIcon(s.iconClass)}
            </a>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;