import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Linkedin, Facebook } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import madhuGowda from "@/assets/madhu-gowda.gif";
import ashutoshShyam from "@/assets/ashutosh-shyam.gif";
import rukminiVemulakonda from "@/assets/rukmini-vemulakonda.gif";
import anitaMirchandani from "@/assets/anita-mirchandani.gif";
import sunithaPentapati from "@/assets/sunitha-pentapati.gif";
import santhoshRaghunath from "@/assets/santhosh-raghunath.gif";

interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  imgSrc: string;
  license?: string;
  npn?: string;
  email?: string;
  phone?: string;
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
            <Link to="/#team">
              <Button variant="ghost" className="text-white hover:text-white/80 mb-6">
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
                      <h1 className="text-3xl font-bold text-primary mb-2">{member.name}</h1>
                      <p className="text-xl text-secondary font-semibold mb-4">{member.role}</p>
                    </div>

                    {member.license && (
                      <div className="text-sm text-muted-foreground">
                        <strong>License:</strong> {member.license}
                      </div>
                    )}

                    {member.npn && (
                      <div className="text-sm text-muted-foreground">
                        <strong>NPN:</strong> {member.npn}
                      </div>
                    )}

                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                      >
                        <Mail size={18} />
                        <span className="text-sm">{member.email}</span>
                      </a>
                    )}

                    {member.phone && (
                      <a 
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                      >
                        <Phone size={18} />
                        <span className="text-sm">{member.phone}</span>
                      </a>
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
                <h2 className="text-2xl font-bold text-primary mb-6">About {member.name.split(' ')[0]}</h2>
                
                {member.bio ? (
                  <div className="space-y-4 text-foreground leading-relaxed">
                    {member.bio.map((paragraph, index) => (
                      <p key={index} className="text-base">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {member.name} is a valued member of our team at Ozone Insurance Services.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamMemberDetail;
