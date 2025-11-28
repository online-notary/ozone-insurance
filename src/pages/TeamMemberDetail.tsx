import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Linkedin, Facebook } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
