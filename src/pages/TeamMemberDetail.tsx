import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import TeamMemberContactForm from "@/components/TeamMemberContactForm";
import { ArrowLeft, Mail, Phone, Linkedin, Facebook, Twitter, Share2, Globe, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamCard from "@/components/TeamCard";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import madhuGowda from "@/assets/madhu-gowda-new.png";
import ashutoshShyam from "@/assets/ashutosh-shyam-new.png";
import rukminiVemulakonda from "@/assets/rukmini-vemulakonda-new.png";
import anitaMirchandani from "@/assets/anita-mirchandani-new.png";
import sunithaPentapati from "@/assets/sunitha-pentapati-new.png";
import santhoshRaghunath from "@/assets/santhosh-raghunath-new.png";
import raMohan from "@/assets/ra-mohan.png";
import geetaSharma from "@/assets/geeta-sharma.gif";

interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  imgSrc: string;
  license?: string;
  npn?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  bio?: string[];
  socials?: { iconClass: string; href: string }[];
}

const teamMembersData: TeamMemberData[] = [
  {
    id: "madhu-gowda",
    name: "Madhu Gowda",
    role: "Founder",
    imgSrc: madhuGowda,
    license: "CA License # OK20510",
    npn: "17569517",
    email: "Madhu@ozoneinsurance.com",
    phone: "408.921.3048",
    bio: [
      "Madhu began his career in Software Development in 1992. In 2014, he started working as an Insurance broker. He started Ozone Insurance Services in 2016 and has been working in this area full-time since then.",
      "With his IT experience, analytical skills and interest in Insurance, Madhu thinks out of the box in coming up with custom solutions for his clients. He is licensed in 25 states and has worked with hundreds of families and businesses so far. At Ozone, he leads and mentors a team of 30+ licensed agents.",
      "Outside of work, Madhu is a dad to a daughter (a UC Davis student). He enjoys cooking for her when she's home, especially a chicken biryani the old-fashioned way!"
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  },
  {
    id: "ashutosh-shyam",
    name: "Dr. Ashutosh Shyam, PhD",
    role: "Insurance Advisor",
    imgSrc: ashutoshShyam,
    license: "CA License # 2828993",
    npn: "20307264",
    email: "ashymnit@gmail.com",
    phone: "515.708.5545",
    bio: [
      "Ashutosh joined the team from Austin, Texas in 2020. While interacting with the community as a Notary Public, he realized that financial education was quite lacking overall.",
      "With his deep understanding of various financial products, he helps clients find solutions customized towards their specific goals. He strives to educate and empower each and every family with financial literacy. He is based in Texas, but licensed in 2 states (TX, AL) and counting.",
      "Outside of work, Ashu has a passion for music and stringing away on his guitar whenever he can."
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  },
  {
    id: "rukmini-vemulakonda",
    name: "Rukmini Vemulakonda",
    role: "Insurance Advisor",
    imgSrc: rukminiVemulakonda,
    license: "CA License # 4349904",
    npn: "21043171",
    email: "rukminivemulakonda@gmail.com",
    phone: "408.784.0880",
    bio: [
      "Rukmini is a Bay Area insurance agent committed to helping families achieve financial security. She is passionate about educating women on the importance of financial planning and protection. By building trust and offering personalized service, Rukmini assists clients in finding insurance solutions that fit their needs.",
      "Outside of work, she remains active in the technology sector, dedicates herself to educating her sons about the diverse paths to success, volunteers in her community, and raises funds for under-privileged and visually challenged students in India."
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  },
  {
    id: "anita-mirchandani",
    name: "Anita Mirchandani",
    role: "Insurance Advisor",
    imgSrc: anitaMirchandani,
    license: "CA License # 4183626",
    npn: "20189231",
    email: "anita@ozoneinsurance.com",
    phone: "408.643.9702",
    bio: [
      "Anita is proficient in Life Insurance, Long-term Care, Property and Casualty and Commercial and Group Health Insurance. Her repertoire includes being a Notary Public with outreach to the South Bay community.",
      "She brings a seamless experience in tailoring solutions to meet the unique needs of each client. Her commitment to exceptional customer service allows her to guide clients through the complexities of insurance, ensuring that they feel informed and confident in their choice.",
      "Outside of work, she is a mother to a daughter (who is a lawyer with Farella Braun + Martell LLP, San Francisco) and a son (a senior at San Diego State University).",
      "She has an avid interest in Geopolitics, Fado music and globetrotting. Her travel sojourns have taken her from the Norwegian Fjords to the Juneau glaciers, Flamenco dancers in Seville, palaces of the Czars in Moscow and St. Petersburg while absorbing the heritage of different cultures."
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  },
  {
    id: "sunitha-pentapati",
    name: "Sunitha Pentapati",
    role: "Insurance Advisor",
    imgSrc: sunithaPentapati,
    license: "CA License # 4310114",
    npn: "20844209",
    email: "sunitha@ozoneinsurance.com",
    phone: "408-596-0630",
    bio: [
      "Sunitha is a dedicated Insurance Advisor and Financial Planner based in the California Bay Area. She helps individuals manage the most fundamental insurance needs and navigate through financial planning processes to protect their future and prepare for unforeseen circumstances.",
      "She believes in financial education and empowers her clients to make the right decisions.",
      "She specializes in different types of insurance coverages and retirement plans, including travel and life insurance. With a passion for educating clients on the importance of comprehensive coverage, she strives to create strong relationships with them. She provides tailored solutions by understanding her clients' unique requirements. Sunitha is also a Notary Public.",
      "Outside of work, Sunitha likes gardening, dancing, and spending time with her friends and family."
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  },
  {
    id: "santhosh-raghunath",
    name: "Santhosh Raghunath",
    role: "Insurance Advisor",
    imgSrc: santhoshRaghunath,
    license: "CA License # 4206525",
    email: "santhosh@ozoneinsurance.com",
    phone: "408.833.8877",
    bio: [
      "Santhosh is a holistic personal finance planner. He has been campaigning for financial solutions and personal finance education since 2022. He strives to help individuals and families arrive at a suitable solution to address their financial goals and concerns, at various stages in their lifetime. Reach out to him to book an appointment to discuss your needs and learn how to protect and safely grow your hard-earned money. All consultations are complimentary.",
      "Areas of Santhosh's expertise include Retirement Income Planning, Long-term Care, Life Insurance (Permanent/IUL and Term), Health insurance, Travel Insurance including Visitors Health, tax saving strategies and review of existing policies.",
      "Santhosh is also currently helping build a new team of campaigners by helping them setup and grow their business in the finance industry. Since 2018, Santhosh is also a CA State Notary Public and a Loan Signing Agent."
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  },
  {
    id: "ra-mohan",
    name: "R.A. Mohan",
    role: "Realtor | Financial Services | Notary Public",
    imgSrc: raMohan,
    license: "DRE# 02111565",
    email: "mohan@fastagents.com",
    phone: "(209) 362-9933",
    website: "https://ramapuramohan.exprealty.com/",
    address: "eXp Realty Inc., 2603 Camino Ramon Suite 200, San Ramon, CA 94583",
    bio: [
      "R.A. Mohan is a versatile professional offering comprehensive services in real estate, financial services, and notary public services. With expertise across multiple domains, he provides clients with a seamless experience for their real estate transactions and financial planning needs.",
      "As a licensed realtor with eXp Realty Inc., R.A. Mohan brings dedication and expertise to help clients navigate the real estate market. His financial services background enables him to provide valuable insights into investment properties and wealth-building strategies through real estate."
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  },
  {
    id: "geeta-sharma",
    name: "Geeta Sharma",
    role: "Insurance Advisor",
    imgSrc: geetaSharma,
    license: "CA Lic #4431834",
    npn: "21414617",
    email: "geeta@ozoneinsurance.com",
    bio: [
      "With a career shaped by creativity, service, and a genuine desire to uplift others, Geeta brings a unique perspective to the team. Her journey from architect to holistic personal financial planner reflects her passion for helping people move from building dream homes to creating secure, abundant lives within those homes.",
      "She is deeply committed to community financial education, especially empowering the younger generation to become financially confident at the right age. Active in the financial industry since 2021, Geeta is known for her warm communication, thoughtful guidance, and people-first approach.",
      "Outside of work, Geeta enjoys reading, interior decorating, and volunteering with her daughter while creating meaningful memories."
    ],
    socials: [
      { iconClass: "linkedin", href: "#" },
      { iconClass: "facebook", href: "#" }
    ]
  }
];

const getIcon = (iconClass: string) => {
  if (iconClass.includes("facebook")) return <Facebook size={20} />;
  if (iconClass.includes("linkedin")) return <Linkedin size={20} />;
  return null;
};

const TeamMemberDetail = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = teamMembersData.find(m => m.id === memberId);
  const otherMembers = teamMembersData.filter(m => m.id !== memberId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [memberId]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = member ? `Meet ${member.name} - ${member.role} at Ozone Insurance` : '';
  const shareText = member ? `Check out ${member.name}'s profile at Ozone Insurance Services` : '';

  const handleShare = (platform: string) => {
    if (!member) return;

    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Team Member Not Found</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2" size={16} />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        {/* Hero Section */}
        <div className="bg-gradient-primary py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-6">
              <BreadcrumbList className="text-white/80">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/#team" className="hover:text-white transition-colors">Team</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white font-semibold">{member.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <Link to="/#team">
              <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">
                <ArrowLeft className="mr-2" size={16} />
                Back to Team
              </Button>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 -mt-8 pb-16">
          <div className="bg-white rounded-2xl shadow-medium p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Image and Contact */}
              <div className="md:col-span-1">
                <div className="sticky top-8">
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    className="w-full rounded-xl shadow-soft mb-6"
                  />
                  
                  <div className="space-y-4">
                  <div>
                      <h1 className="text-4xl font-bold text-primary mb-3">{member.name}</h1>
                      <p className="text-2xl text-secondary font-semibold mb-6">{member.role}</p>
                    </div>

                    {member.license && (
                      <div className="text-base text-muted-foreground mb-2">
                        <strong>License:</strong> {member.license}
                      </div>
                    )}

                    {member.npn && (
                      <div className="text-base text-muted-foreground mb-2">
                        <strong>NPN:</strong> {member.npn}
                      </div>
                    )}

                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-2"
                      >
                        <Mail size={20} />
                        <span className="text-base">{member.email}</span>
                      </a>
                    )}

                    {member.phone && (
                      <a 
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-2"
                      >
                        <Phone size={20} />
                        <span className="text-base">{member.phone}</span>
                      </a>
                    )}

                    {member.website && (
                      <a 
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-2"
                      >
                        <Globe size={20} />
                        <span className="text-base">Website</span>
                      </a>
                    )}

                    {member.address && (
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                        <span className="text-base">{member.address}</span>
                      </div>
                    )}

                    {member.socials && member.socials.length > 0 && (
                      <div className="flex gap-3 pt-4">
                        {member.socials.map((social, index) => (
                          <a
                            key={index}
                            href={social.href}
                            className="w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center justify-center transition-all duration-300"
                            aria-label={social.iconClass}
                          >
                            {getIcon(social.iconClass)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Biography */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-primary">About {member.name.split(' ')[0]}</h2>
                  
                  {/* Social Sharing Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Share:</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('facebook')}
                      className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
                      title="Share on Facebook"
                    >
                      <Facebook size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('twitter')}
                      className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
                      title="Share on Twitter"
                    >
                      <Twitter size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('linkedin')}
                      className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('email')}
                      className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      title="Share via Email"
                    >
                      <Mail size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('copy')}
                      className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      title="Copy Link"
                    >
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>
                
                {member.bio ? (
                  <div className="space-y-6 text-foreground leading-relaxed mb-12">
                    {member.bio.map((paragraph, index) => (
                      <p key={index} className="text-lg">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-lg mb-12">
                    {member.name} is a valued member of our team at Ozone Insurance Services.
                  </p>
                )}

                {/* Contact Form */}
                <div className="mt-12">
                  <TeamMemberContactForm
                    memberName={member.name}
                    memberEmail={member.email}
                    memberPhone={member.phone}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Other Team Members Section */}
          {otherMembers.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-3xl font-bold text-primary text-center mb-4">
                Meet Other Team Members
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Connect with our other talented advisors who are ready to help you with your insurance needs
              </p>
              
              <div className="flex flex-wrap justify-center gap-8">
                {otherMembers.map((m) => (
                  <div key={m.id} className="w-full sm:w-auto">
                    <TeamCard 
                      m={{
                        name: m.name,
                        role: m.role,
                        imgSrc: m.imgSrc,
                        profileHref: `/team/${m.id}`,
                        socials: m.socials
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamMemberDetail;
