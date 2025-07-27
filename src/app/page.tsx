
'use client';

import Image from 'next/image';
import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { SocialIcons } from '@/components/social-icons';
import { Briefcase, GraduationCap, Star, Award, Languages, BrainCircuit, Globe, Smartphone, Server, Network, Shield, Code, Mic, Gamepad2, Film, Camera, ArrowRight, BookMark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skills = [
    { name: 'Python', icon: <Code className="h-6 w-6" /> },
    { name: 'Django', icon: <Server className="h-6 w-6" /> },
    { name: 'AI Development', icon: <BrainCircuit className="h-6 w-6" /> },
    { name: 'Next.js', icon: <Globe className="h-6 w-6" /> },
    { name: 'TypeScript', icon: <Code className="h-6 w-6" /> },
    { name: 'React', icon: <Globe className="h-6 w-6" /> },
    { name: 'Firebase', icon: <Server className="h-6 w-6" /> },
    { name: 'Cybersecurity', icon: <Shield className="h-6 w-6" /> },
    { name: 'System Admin', icon: <Server className="h-6 w-6" /> },
    { name: 'Networking', icon: <Network className="h-6 w-6" /> },
];

const projects = [
  {
    title: 'AI-Powered Portfolio Website',
    description: 'This very website, a dynamic personal portfolio featuring real-time, AI-powered language translation using Genkit, a modern tech stack with Next.js, and a fully responsive design.',
    tags: ['Next.js', 'React', 'TypeScript', 'Genkit', 'Tailwind CSS', 'Firebase'],
    link: 'https://tinyurl.com/zedzareer',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'modern website design'
  },
  {
    title: 'E-commerce Platform MVP',
    description: 'Designed and built a minimum viable product for an e-commerce platform. Focused on RESTful API design, user authentication, and inventory management concepts.',
    tags: ['Node.js', 'Express', 'MongoDB', 'React'],
    link: '#',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'online shopping cart'
  },
  {
    title: 'Affiliate Marketing Portal',
    description: 'A dedicated portal for an affiliate marketing campaign, featuring dynamic promotional content, region-specific links, and user engagement elements.',
    tags: ['Next.js', 'Marketing', 'UI/UX'],
    link: '/affiliate-marketing-manager',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'marketing analytics dashboard'
  }
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
        duration: "2025 May – 2025 July",
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

const certifications = [
  { title: "EF SET English Certificate (C1 Advanced)", issuer: "EF SET", date: "Sep 2024", id: null, skills: null },
  { title: "Teacher Of English To Speakers Of Other Languages (TEFL)", issuer: "Teacher Record", date: "Sep 2023", id: "TR2672252278", skills: null },
  { title: "Automate Cybersecurity Tasks with Python", issuer: "Google", date: "Aug 2023", id: "C7XRV7CQNCQM", skills: "PEP 8 style guide" },
  { title: "Assets, Threats, and Vulnerabilities", issuer: "Google", date: "Aug 2023", id: "VX5TA2Q2S67K", skills: null },
  { title: "Connect and Protect: Networks and Network Security", issuer: "Google", date: "Aug 2023", id: "QTMMW72GVFNR", skills: null },
  { title: "Google Cybersecurity", issuer: "Google", date: "Aug 2023", id: "ZQRFL5JFN79Z", skills: "SQL, SIEM, IDS, Linux, Python" },
  { title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM", date: "Aug 2023", id: "ZQRFL5JFN79Z", skills: null },
  { title: "Introduction to Cloud Computing", issuer: "IBM", date: "Aug 2023", id: "6V7R3J56LE33", skills: null },
  { title: "Key Technologies for Business", issuer: "IBM", date: "Aug 2023", id: "ED6HPWDG6QVB", skills: null },
  { title: "Play It Safe: Manage Security Risks", issuer: "Google", date: "Aug 2023", id: "SM23C5AREJRM", skills: null },
  { title: "Put It to Work: Prepare for Cybersecurity Jobs", issuer: "Google", date: "Aug 2023", id: "LSZUYQUMHPP8", skills: null },
  { title: "Sound the Alarm: Detection and Response", issuer: "Google", date: "Aug 2023", id: "DBENMJKEDA46", skills: null },
  { title: "Tools of the Trade: Linux and SQL", issuer: "Google", date: "Aug 2023", id: "PMN4CB7GLMC7", skills: null },
  { title: "Cybersecurity Compliance Framework & System Administration", issuer: "IBM", date: "Jun 2022", id: "SARK6MHGJE2W", skills: null },
  { title: "Cybersecurity Roles, Processes & Operating System Security", issuer: "IBM", date: "Jun 2022", id: "9SSFKD6DLP7N", skills: null },
  { title: "IT Fundamentals for Cybersecurity", issuer: "IBM", date: "Jun 2022", id: "BDSXYEGVZUWK", skills: "Networking, DB vulnerabilities, Cybersecurity, OS Security, Cyber Attacks" },
  { title: "Introduction to Cybersecurity Tools & Cyber Attacks", issuer: "Coursera", date: "Jun 2022", id: null, skills: null },
  { title: "Network Security & Database Vulnerabilities", issuer: "IBM", date: "Jun 2022", id: "NTDBPW657286", skills: null },
  { title: "Foundations of Digital Marketing and E-commerce", issuer: "Google", date: "May 2022", id: "F7MG9YAXM94Y", skills: null },
  { title: "Foundations of Project Management", issuer: "Google", date: "May 2022", id: "KBKA6QSQRLGV", skills: null },
  { title: "Crash Course on Python", issuer: "Google", date: "Feb 2022", id: "739MZ344RHQ2", skills: null },
  { title: "Exploratory Data Analysis for Machine Learning", issuer: "IBM", date: "Feb 2022", id: "65JUNKQNLLNE", skills: null },
  { title: "Foundations of User Experience (UX) Design", issuer: "Google", date: "Feb 2022", id: "LQUUB69CBRJU", skills: null },
  { title: "Foundations: Data, Data, Everywhere", issuer: "Google", date: "Feb 2022", id: "J5KRN8LFPNPK", skills: null },
  { title: "Introduction to Cybersecurity Tools & Cyber Attacks", issuer: "IBM", date: "Feb 2022", id: "RJR6MQHGE65M", skills: null },
  { title: "C++ (Basic) Certificate", issuer: "HackerRank", date: "Sep 2020", id: "DEA4F08FE541", skills: null },
  { title: "Python (Basic) Certificate", issuer: "HackerRank", date: "Aug 2020", id: "6E56080D33F3", skills: null },
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
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <a href="mailto:musondasalim@gmail.com"><TranslatedText text="Get in Touch" /></a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#projects"><TranslatedText text="View My Work" /></Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-t">
          <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="About Me"/></h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
              <Image
                src="https://drive.google.com/uc?id=1SEG-a3e_1xHx0-P7gD6MUysCSt6kg96U"
                alt="About Muzo"
                width={300}
                height={400}
                data-ai-hint="professional portrait"
                className="rounded-lg shadow-xl object-cover"
              />
              <div className="text-lg text-muted-foreground space-y-4">
                  <p><TranslatedText text="I am a versatile and experienced professional with a Master's degree in Informatics and a passion for technology. My journey has taken me through system administration, software engineering, and cutting-edge AI research."/></p>
                  <p><TranslatedText text="I thrive on solving complex problems, whether it's optimizing IT infrastructure, developing efficient code, or researching novel AI training algorithms for Spiking Neural Networks. I possess strong analytical and communication skills, allowing me to convey technical ideas clearly and work effectively in collaborative environments."/></p>
                  <p><TranslatedText text="Driven by a willingness to learn, I am continuously exploring new technologies. I am currently focused on enhancing my skills in full-stack development with Django and leveraging AI to create smarter, more efficient applications."/></p>
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
                <Link href="https://github.com/MS0C54073" target="_blank">
                    <TranslatedText text="Featured Projects" />
                    <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
            </Button>
        </div>
        <div className="space-y-12 max-w-4xl mx-auto">
          {projects.map((project) => (
             <div key={project.title} className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg border bg-card/50 shadow-lg">
                <div className="md:w-1/3">
                     <Link href={project.link} target={project.link === '#' ? '_self' : '_blank'}>
                        <Image 
                            src={project.image} 
                            alt={project.title} 
                            width={400} 
                            height={250} 
                            data-ai-hint={project.imageHint} 
                            className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-auto object-cover"
                        />
                    </Link>
                </div>
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-accent mb-2"><TranslatedText text={project.title} /></h3>
                    <p className="text-muted-foreground mb-4"><TranslatedText text={project.description} /></p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => <Badge key={tag} variant="secondary"><TranslatedText text={tag} /></Badge>)}
                    </div>
                    <Button asChild>
                        <Link href={project.link} target={project.link === '#' ? '_self' : '_blank'}>
                            <TranslatedText text={project.link === '#' ? 'View Details' : 'Visit Project'}/>
                        </Link>
                    </Button>
                </div>
            </div>
          ))}
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

      {/* Certifications Section */}
      <section id="certifications" className="py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12"><TranslatedText text="Licenses & Certifications" /></h2>
        <div className="max-w-3xl mx-auto relative pl-8">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border"></div>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-12 relative">
              <div className="absolute left-[-34px] top-1.5 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              <p className="text-sm text-muted-foreground">Issued {cert.date}</p>
              <h3 className="text-xl font-bold text-accent"><TranslatedText text={cert.title}/></h3>
              <p className="font-semibold text-foreground mb-2"><TranslatedText text={cert.issuer}/></p>
              {cert.id && <p className="text-xs text-muted-foreground">Credential ID: {cert.id}</p>}
              {cert.skills && <p className="text-sm text-muted-foreground mt-1"><b>Skills:</b> <TranslatedText text={cert.skills}/></p>}
            </div>
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
          <SocialIcons className="flex space-x-6 justify-center" />
        </div>
      </section>
    </div>
  );
}
