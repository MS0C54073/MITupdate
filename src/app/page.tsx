
'use client';

import Image from 'next/image';
import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { SocialIcons } from '@/components/social-icons';
import { Briefcase, GraduationCap, Star, Award, Languages, BrainCircuit, Globe, Smartphone, Server, Network, Shield, Code, Mic, Gamepad2, Film, Camera, ArrowRight, BookMark, Download, Mail, Phone, Users, ExternalLink, Eye, Github, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


const skills = [
    { name: 'Python', icon: <Code className="h-6 w-6" /> },
    { name: 'Django', icon: <Server className="h-6 w-6" /> },
    { name: 'AI Development', icon: <BrainCircuit className="h-6 w-6" /> },
    { name: 'Next.js', icon: <Globe className="h-6 w-6" /> },
    { name: 'TypeScript', icon: <Code className="h-6 w-6" /> },
    { name: 'React', icon: <Globe className="h-6 w-6" /> },
    { name: 'n8n', icon: <BrainCircuit className="h-6 w-6" /> },
    { name: 'Cybersecurity', icon: <Shield className="h-6 w-6" /> },
    { name: 'System Admin', icon: <Server className="h-6 w-6" /> },
    { name: 'Networking', icon: <Network className="h-6 w-6" /> },
];

const projects = [
  {
    title: 'Career Connect Zambia (CCZ), personal project.',
    link: 'https://github.com/MS0C54073/CCZ',
    demo: 'https://shorturl.at/jLk8n',
  },
  {
    title: 'MULTI-VENDOR ECOMMERCE WEBSITE (FINAL YEAR PROJECT)',
    link: 'https://github.com/MS0C54073/Final-Year-Project',
  },
  {
    title: 'TEXT FILES ARCHIVING PROGRAM (High-level language programming)',
    link: 'https://github.com/MS0C54073/TEXT-FILES-ARCHIVING-PROGRAM-Cplusplus-Builder',
  },
  {
    title: 'PBX SUBSCRIBERS (Data structures and algorithms)',
    link: 'https://github.com/MS0C54073/QueueDatabaseCplusplus',
  },
  {
    title: 'DEVELOPMENT OF A COMPILER (Theory of formal languages and translations)',
    link: 'https://github.com/MS0C54073/Compiler',
  },
  {
    title: 'STOPWATCH (COMPUTING SYSTEMS ARCHITECTURE)',
    link: 'https://github.com/MS0C54073/Stopwatch-in-8051',
  },
  {
    title: 'STOCK PRICE PREDICTION',
    link: 'https://github.com/MS0C54073/Stocks-Price-Prediction-Python',
  },
  {
    title: 'DETECTING FAKE NEWS WITH PYTHON',
    link: 'https://github.com/MS0C54073/store-locator.git',
  },
  {
    title: 'STORE-LOCATOR',
    link: 'https://github.com/MS0C54073/store-locator',
  },
];

const experiences = [
    {
        title: "Software Engineer for AI Training Data",
        company: "Invisible Technologies",
        duration: "2025 June –",
        details: [
            "Evaluated AI-generated code quality and provided human-readable summaries.",
            "Solved coding problems with functional and efficient solutions.",
            "Wrote robust test cases to confirm code effectiveness."
        ]
    },
    {
        title: "System Administrator (Temporal Contract)",
        company: "Embassy of the Republic of Zambia in Moscow, Russia",
        duration: "May 2024 – July 2024",
        details: [
            "Maintain embassy IT systems and integration of the SmartZambia portal.",
            "Implement cybersecurity protocols and optimize system performance.",
            "Provide technical support to ensure seamless digital operations."
        ]
    },
    {
        title: "Software Engineer for AI Training Data",
        company: "Outlier",
        duration: "2024 – Feb 2025",
        details: [
            "Evaluated AI-generated code quality and provided human-readable summaries.",
            "Solved coding problems with functional and efficient solutions.",
            "Wrote robust test cases to confirm code effectiveness."
        ]
    },
    {
        title: "AI Training Methods Researcher (Intern)",
        company: "Novosibirsk State Technical University",
        duration: "May 2022 – Oct 2022",
        details: [
            "Tested new training algorithms specifically for Spiking Neural Networks (SNNs).",
            "Conducted experiments to evaluate the performance of various SNN training approaches.",
            "Managed and preprocessed datasets for training and evaluating SNN models."
        ]
    },
    {
        title: "System Administrator (Intern)",
        company: "Pensions and Insurance Authority, Zambia",
        duration: "May 2022 – Oct 2022",
        details: [
            "Maintained and secured IT systems, optimized websites, and troubleshooted issues.",
            "Provided ICT support and training to staff members."
        ]
    },
    {
        title: "Software Engineer Intern",
        company: "Kursk State University, Russia",
        duration: "2019 – 2021",
        details: [
            "Built, tested, and optimized software in C++, Python, and C#.",
            "Utilized automated debugging and performance enhancement techniques."
        ]
    },
];

const education = [
    {
        degree: "Master's of Science, Informatics and Computer Engineering",
        university: "Novosibirsk State Technical University | Novosibirsk, Russia",
        duration: "September 2022 - July 2024",
    },
    {
        degree: "Diploma of Professional Retraining, Management in the Digital Economy",
        university: "Novosibirsk State Technical University",
        duration: "September 2023 - December 2023",
    },
    {
        degree: "Diploma of Professional Retraining, Technological Entrepreneurship and Innovation Management",
        university: "Novosibirsk State Technical University",
        duration: "September 2023 - December 2023",
    },
    {
        degree: "Diploma of Professional Retraining, Development of Digital Twins",
        university: "Novosibirsk State Technical University",
        duration: "September 2023 - December 2023",
    },
    {
        degree: "Diploma of Professional Retraining, Management of High Tech Programs and Projects",
        university: "Pskov State University",
        duration: "September 2023 - December 2023",
    },
    {
        degree: "Bachelor's of Science, Software and Administration of Information Systems",
        university: "Kursk State University | Kursk, Russia",
        duration: "September 2017 - July 2021",
    },
];

const awards = [
    {
        title: "WINNER of 'International Olympiad of the Financial University for Youth (Master's Degree - 2023-2024)'",
        issuer: "Financial University",
        date: "2024",
    },
];

const certifications = [
    { title: 'Introduction to Cybersecurity', issuer: 'SMART ZAMBIA INSTITUTE (Cisco Networking Academy)', date: 'Jul 2025' },
    { title: 'EF SET English Certificate', issuer: 'EF SET', date: 'Sep 2024' },
    { title: 'Teacher Of English To Speakers Of Other Languages (TEFL)', issuer: 'Teacher Record', date: 'Sep 2023', credentialId: 'TR2672252278' },
    { title: 'Automate Cybersecurity Tasks with Python', issuer: 'Google', date: 'Aug 2023', credentialId: 'C7XRV7CQNCQM', skills: ['PEP 8 style guide'] },
    { title: 'Assets, Threats, and Vulnerabilities', issuer: 'Google', date: 'Aug 2023', credentialId: 'VX5TA2Q2S67K' },
    { title: 'Connect and Protect: Networks and Network Security', issuer: 'Google', date: 'Aug 2023', credentialId: 'QTMMW72GVFNR' },
    { title: 'Google Cybersecurity', issuer: 'Google', date: 'Aug 2023', credentialId: 'ZQRFL5JFN79Z', skills: ['SQL', 'SIEM', 'IDS', 'Linux', 'Python'] },
    { title: 'Introduction to Artificial Intelligence (AI)', issuer: 'IBM', date: 'Aug 2023', credentialId: 'ZQRFL5JFN79Z' },
    { title: 'Introduction to Cloud Computing', issuer: 'IBM', date: 'Aug 2023', credentialId: '6V7R3J56LE33' },
    { title: 'Key Technologies for Business', issuer: 'IBM', date: 'Aug 2023', credentialId: 'ED6HPWDG6QVB' },
    { title: 'Play It Safe: Manage Security Risks', issuer: 'Google', date: 'Aug 2023', credentialId: 'SM23C5AREJRM' },
    { title: 'Put It to Work: Prepare for Cybersecurity Jobs', issuer: 'Google', date: 'Aug 2023', credentialId: 'LSZUYQUMHPP8' },
    { title: 'Sound the Alarm: Detection and Response', issuer: 'Google', date: 'Aug 2023', credentialId: 'DBENMJKEDA46' },
    { title: 'Tools of the Trade: Linux and SQL', issuer: 'Google', date: 'Aug 2023', credentialId: 'PMN4CB7GLMC7' },
    { title: 'Cybersecurity Compliance Framework & System Administration', issuer: 'IBM', date: 'Jun 2022', credentialId: 'SARK6MHGJE2W' },
    { title: 'Cybersecurity Roles, Processes & Operating System Security', issuer: 'IBM', date: 'Jun 2022', credentialId: '9SSFKD6DLP7N' },
    { title: 'IT Fundamentals for Cybersecurity', issuer: 'IBM', date: 'Jun 2022', credentialId: 'BDSXYEGVZUWK', skills: ['Networking', 'Databases', 'Cybersecurity', 'OS Security', 'Cyber Attacks'] },
    { title: 'Introduction to Cybersecurity Tools & Cyber Attacks', issuer: 'Coursera', date: 'Jun 2022' },
    { title: 'Network Security & Database Vulnerabilities', issuer: 'IBM', date: 'Jun 2022', credentialId: 'NTDBPW657286' },
    { title: 'Foundations of Digital Marketing and E-commerce', issuer: 'Google', date: 'May 2022', credentialId: 'F7MG9YAXM94Y' },
    { title: 'Foundations of Project Management', issuer: 'Google', date: 'May 2022', credentialId: 'KBKA6QSQRLGV' },
    { title: 'Crash Course on Python', issuer: 'Google', date: 'Feb 2022', credentialId: '739MZ344RHQ2' },
    { title: 'Exploratory Data Analysis for Machine Learning', issuer: 'IBM', date: 'Feb 2022', credentialId: '65JUNKQNLLNE' },
    { title: 'Foundations of User Experience (UX) Design', issuer: 'Google', date: 'Feb 2022', credentialId: 'LQUUB69CBRJU' },
    { title: 'Foundations: Data, Data, Everywhere', issuer: 'Google', date: 'Feb 2022', credentialId: 'J5KRN8LFPNPK' },
    { title: 'Introduction to Cybersecurity Tools & Cyber Attacks', issuer: 'IBM', date: 'Feb 2022', credentialId: 'RJR6MQHGE65M' },
    { title: 'C++ (Basic) Certificate', issuer: 'HackerRank', date: 'Sep 2020', credentialId: 'DEA4F08FE541' },
    { title: 'Python (Basic) Certificate', issuer: 'HackerRank', date: 'Aug 2020', credentialId: '6E56080D33F3' }
];

const references = [
    {
        name: "Kaumba Samazaka",
        title: "First Secretary Political",
        company: "Embassy of the Republic of Zambia in Moscow, Russia",
        email: null,
        phone: "+79858902623"
    },
    {
        name: "Innocent Mukupa",
        title: "ICT Manager",
        company: "Pensions & Insurance Authority",
        email: "Innocent.mukupa@pia.org.zm",
        phone: "+260-211-251401 | +260-211-251405 | Fax: +260-211-251492"
    },
    {
        name: "Mwansa Kapoka",
        title: "Team Leader",
        company: "TechMahindra Limited Zambia",
        email: "mwansa.kapoka@sc.com",
        phone: "+260 978980443"
    },
    {
        name: "Allan Mwimbu",
        title: "Supervior | First Secretary Political",
        company: "Embassy of the Republic of Zambia in Moscow, Russia",
        email: null,
        phone: "+79855159011"
    }
];

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section id="home" className="py-20 text-center">
        <Image
          src="https://drive.google.com/uc?id=1SEG-a3e_1xHx0-P7gD6MUysCSt6kg96U"
          alt="Muzo's Profile Picture"
          width={150}
          height={150}
          data-ai-hint="profile picture"
          className="rounded-full mx-auto mb-6 shadow-lg border-4 border-primary object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          <TranslatedText text="Musonda Salimu" />
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mt-2">
          <TranslatedText text="IT Professional | Software Engineer | AI Enthusiast" />
        </p>
        <p className="max-w-2xl mx-auto mt-4 text-foreground">
          <TranslatedText text="IT professional with an MSc in Informatics and System Administration experience. Skilled in Python, cybersecurity, and IT infrastructure management. Currently expanding expertise in Django and AI tools to build innovative solutions." />
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <a href="mailto:musondasalim@gmail.com"><TranslatedText text="Get in Touch" /></a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/Muzo_Salimu_CV.pdf" download="Muzo_Salimu_CV.pdf" target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-5 w-5" />
                <TranslatedText text="Preview CV" />
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="/Muzo_Salimu_CV.pdf" download="Muzo_Salimu_CV.pdf">
                <Download className="mr-2 h-5 w-5" />
                <TranslatedText text="Download CV" />
            </a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-t">
          <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="About Me"/></h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="text-lg text-muted-foreground space-y-4">
                  <p><TranslatedText text="I am a versatile and experienced professional with a Master's degree in Informatics and a passion for technology. My journey has taken me through system administration, software engineering, and cutting-edge AI research."/></p>
                  <p><TranslatedText text="I thrive on solving complex problems, whether optimizing IT infrastructure or developing efficient code. But I'm most excited about the future of development. I'm actively exploring new AI-driven development paradigms like Vibe Coding and leveraging powerful automation tools like n8n to build smarter, more efficient applications."/></p>
                  <p><TranslatedText text="Driven by a willingness to learn, I am continuously pushing the boundaries of what's possible, merging my skills in full-stack development and AI to create next-generation solutions."/></p>
              </div>
          </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 border-t bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="Technical Skills" /></h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map(skill => (
            <div key={skill.name} className="flex flex-col items-center gap-2 text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-md text-primary">
                {skill.icon}
              </div>
              <p className="font-semibold text-foreground"><TranslatedText text={skill.name} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 border-t">
        <div className="text-center mb-12">
            <Button asChild size="lg" className="text-3xl font-bold h-auto py-3 px-6">
                <a href="https://github.com/MS0C54073" target="_blank" rel="noopener noreferrer">
                    <TranslatedText text="Projects" />
                    <ArrowRight className="ml-3 h-6 w-6" />
                </a>
            </Button>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            if (project.demo) {
              return (
                <Card key={index} className="bg-card/50 hover:bg-accent/20 hover:border-primary transition-all duration-300 h-full flex flex-col">
                  <CardContent className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-accent group-hover:text-primary transition-colors">
                        <TranslatedText text={project.title} />
                      </h3>
                    </div>
                    <div className="mt-4 flex">
                        <Button asChild variant="outline" className="flex-grow rounded-r-none focus:z-10">
                           <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              <TranslatedText text="View GitHub" />
                            </a>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="-ml-px rounded-l-none focus:z-10">
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        <TranslatedText text="Live Demo" />
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            return (
              <a 
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="bg-card/50 hover:bg-accent/20 hover:border-primary transition-all duration-300 h-full">
                  <CardContent className="p-4 flex items-center gap-4">
                    <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-accent group-hover:text-primary transition-colors">
                        <TranslatedText text={project.title} />
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="Work Experience" /></h2>
        <div className="max-w-3xl mx-auto relative pl-8">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border"></div>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 relative">
                <div className="absolute left-[-34px] top-1.5 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                <p className="text-sm text-muted-foreground">{exp.duration}</p>
                <h3 className="text-xl font-bold text-accent"><TranslatedText text={exp.title}/></h3>
                <p className="font-semibold text-foreground mb-2"><TranslatedText text={exp.company}/></p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {exp.details.map((d, i) => <li key={i}><TranslatedText text={d} /></li>)}
                </ul>
            </div>
          ))}
        </div>
      </section>
      
      {/* Education Section */}
      <section id="education" className="py-20 border-t bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="Education" /></h2>
        <div className="max-w-3xl mx-auto relative pl-8">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border"></div>
          {education.map((edu, index) => (
            <div key={index} className="mb-12 relative">
              <div className="absolute left-[-34px] top-1.5 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              <p className="text-sm text-muted-foreground">{edu.duration}</p>
              <h3 className="text-xl font-bold text-accent"><TranslatedText text={edu.degree}/></h3>
              <p className="font-semibold text-foreground"><TranslatedText text={edu.university}/></p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="Awards & Achievements"/></h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
            {awards.map((award, index) => (
                <Card key={index} className="bg-card/50">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <Award className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                            <div>
                                <CardTitle className="text-lg text-accent"><TranslatedText text={award.title} /></CardTitle>
                                <CardDescription className="mt-1">
                                    <TranslatedText text="Awarded by "/> <strong><TranslatedText text={award.issuer}/></strong> - <TranslatedText text={award.date}/>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
      </section>
      
      {/* Certifications Section */}
      <section id="certifications" className="py-20 border-t">
        <div className="text-center mb-12">
            <Button asChild size="lg" className="text-3xl font-bold h-auto py-3 px-6">
                <Link href="https://www.coursera.org/user/d5bf15915278f56a6f96c3b5195c6d11" target="_blank">
                    <TranslatedText text="Licenses & Certifications" />
                    <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
            </Button>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
                <Card key={index} className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-lg text-accent"><TranslatedText text={cert.title} /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            <TranslatedText text="Issued by "/> <strong><TranslatedText text={cert.issuer}/></strong> - <TranslatedText text={cert.date}/>
                        </p>
                        {cert.credentialId && (
                             <p className="text-xs text-muted-foreground mt-1">
                                <TranslatedText text="Credential ID: "/> {cert.credentialId}
                            </p>
                        )}
                        {cert.skills && (
                            <div className="mt-2">
                                <h4 className="text-xs font-semibold text-foreground mb-1"><TranslatedText text="Skills:"/></h4>
                                <div className="flex flex-wrap gap-1">
                                    {cert.skills.map(skill => <Badge key={skill} variant="secondary"><TranslatedText text={skill}/></Badge>)}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

       {/* References Section */}
      <section id="references" className="py-20 border-t bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="References"/></h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {references.map((ref, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl text-primary">{ref.name}</CardTitle>
                        <CardDescription>
                            <TranslatedText text={ref.title}/> at <TranslatedText text={ref.company}/>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2">
                        {ref.email && (
                            <a href={`mailto:${ref.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                                <Mail className="h-4 w-4" />
                                <span>{ref.email}</span>
                            </a>
                        )}
                        {ref.phone && (
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>{ref.phone}</span>
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold"><TranslatedText text="Let's Connect" /></h2>
          <p className="text-muted-foreground mt-4 mb-8">
            <TranslatedText text="I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out." />
          </p>
          <Button asChild size="lg" className="mb-8">
            <a href="mailto:musondasalim@gmail.com"><TranslatedText text="musondasalim@gmail.com"/></a>
          </Button>
          <div className="flex space-x-6 justify-center">
            <TranslatedText text="Find me on:" />
          </div>
        </div>
      </section>
    </div>
  );
}
