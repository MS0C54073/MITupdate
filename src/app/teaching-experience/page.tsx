
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Briefcase, GraduationCap, Star, Award, Languages } from 'lucide-react';
import Image from 'next/image';
import { SocialIcons } from '@/app/components/social-icons';


const ExperienceItem = ({ title, company, duration, details, link }: { title: string, company: string, duration: string, details: string[], link?: string }) => (
  <div className="p-4 bg-background/50 rounded-lg border mb-4 shadow-md">
    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2">
      <div className="mb-2 sm:mb-0">
        <h3 className="text-lg font-semibold text-accent"><TranslatedText text={title} /></h3>
        <p className="text-md font-medium text-foreground"><TranslatedText text={company} /></p>
        {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{link}</a>}
      </div>
      <p className="text-sm text-muted-foreground text-left sm:text-right shrink-0 sm:ml-4">{duration}</p>
    </div>
    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
      {details.map((d, i) => <li key={i}><TranslatedText text={d} /></li>)}
    </ul>
  </div>
);


export default function WorkAndEducationPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to Home" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold text-primary">
          <TranslatedText text="Work & Education" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <Image
            src="https://placehold.co/800x400.png"
            data-ai-hint="professional workspace"
            alt="Work and Education Showcase"
            width={800}
            height={400}
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <p className="text-muted-foreground mb-10 text-lg">
            <TranslatedText text="An experienced English teacher with a background in IT (MSc Informatics). Teaches practical language skills and tutors Python/Unity programming. Former System Administrator and Affiliate Marketing Manager with interests in cybersecurity, finance, and AI. Currently enhancing skills in Django web development and AI agent tools (n8n, Dialogflow, Suvvy AI). Passionate about blending education and technology for impactful learning." />
          </p>

          {/* Professional Experience Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-4 flex items-center"><Briefcase className="mr-3 h-7 w-7 text-primary" /> <TranslatedText text="Professional Experience" /></h2>
            <ExperienceItem 
              title="Software Engineer for AI Training Data"
              company="Outlier AI"
              link="https://outlier.ai/"
              duration="Aug 2024 – Jan 2025"
              details={[
                "Evaluated AI-generated code quality and provided human-readable summaries.",
                "Solved coding problems with functional and efficient solutions.",
                "Wrote robust test cases to confirm code effectiveness."
              ]}
            />
             <ExperienceItem 
              title="Affiliate Marketing Manager"
              company="Betwinner"
              duration="Aug 2021 – Aug 2024"
              details={[
                "Identified new client opportunities.",
                "Established and maintained strong client relationships through regular contact.",
                "Established communication channels to ensure all affiliates and partners had access to marketing tools, and developed bespoke marketing materials when required."
              ]}
            />
             <ExperienceItem 
              title="AI Training Methods Researcher (Internship)"
              company="Novosibirsk State Technical University"
              link="https://en.nstu.ru/"
              duration="Jun 2022 – May 2024"
              details={[
                "Tested new training algorithms specifically for Spiking Neural Networks (SNNs).",
                "Conducted experiments to evaluate the performance of various SNN training approaches.",
                "Managed and preprocessed datasets for training and evaluating SNN models.",
                "Reviewed and summarized current literature on SNN training techniques and presented findings.",
                "Documented research processes and contributed to reports and publications on SNNs."
              ]}
            />
            <ExperienceItem 
              title="System Administrator"
              company="Pensions and Insurance Authority, Zambia"
              link="https://www.pia.org.zm/"
              duration="May 2022 – Oct 2022"
              details={[
                "Maintained and set up computer systems, network servers, and virtualization.",
                "Installed and updated components and software, diagnosed and troubleshooted issues.",
                "Provided technical documentation, performed data backups, and supported helpdesk services.",
                "Managed capacity, storage planning, and database performance."
              ]}
            />
            <ExperienceItem 
              title="Customer Care Associate"
              company="Airtel Zambia"
              link="https://www.airtel.co.zm/"
              duration="Aug 2015 – Oct 2016"
              details={[
                "Provided information about products, services, and offers.",
                "Handled incoming and outgoing calls, understanding customer needs and resolving inquiries."
              ]}
            />
          </div>

          {/* Teaching & Tutoring Section */}
           <div className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-4 flex items-center"><Star className="mr-3 h-7 w-7 text-primary" /> <TranslatedText text="Teaching & Tutoring" /></h2>
              <ExperienceItem 
                title="Programming & English Tutor"
                company="Freelance"
                duration="Ongoing"
                details={[
                  "Programming Teacher (Roblox Studio / Python / Unity / Figma): Conducting online programming lessons and creating educational materials for various platforms in English.",
                  "Teacher of Specialized English: Business English, English for IT, Aviation English, etc., considering individual student needs and monitoring progress.",
                  "Online English Tutor: Conducting lessons for adults, teenagers, and children with personalized learning plans."
                ]}
              />
               <ExperienceItem 
                title="English Teacher"
                company="EF Education First, Center of Modern English (CME), OXFORD Linguistic Centre, FillCamp"
                duration="Various Contracts"
                details={[
                  "Taught English to children and teenagers, organizing extracurricular activities.",
                  "Worked with online systems, provided feedback, and assessed students using UFirst programs.",
                  "Planned lessons, developed methodologies, and employed a client-oriented approach.",
                  "Organized children's leisure and education for summer programs, ensuring a safe environment.",
                  "Conducted group classes using provided materials and methods."
                ]}
              />
          </div>

          {/* Education Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-4 flex items-center"><GraduationCap className="mr-3 h-7 w-7 text-primary" /> <TranslatedText text="Education" /></h2>
            <ul className="space-y-3">
              <li className="text-md text-muted-foreground"><span className="font-semibold text-foreground"><TranslatedText text="Master's, International Finance (2026):"/></span> <TranslatedText text="Financial University under the Government of the Russian Federation, Moscow"/></li>
              <li className="text-md text-muted-foreground"><span className="font-semibold text-foreground"><TranslatedText text="Computer Science and Engineering (2024):"/></span> <TranslatedText text="Novosibirsk State Technical University, Novosibirsk"/></li>
              <li className="text-md text-muted-foreground"><span className="font-semibold text-foreground"><TranslatedText text="Technology Entrepreneurship and Innovation Management (2023):"/></span> <TranslatedText text="Novosibirsk State Technical University, Novosibirsk"/></li>
              <li className="text-md text-muted-foreground"><span className="font-semibold text-foreground"><TranslatedText text="Management in the Digital Economy (2023):"/></span> <TranslatedText text="Novosibirsk State Technical University, Novosibirsk"/></li>
              <li className="text-md text-muted-foreground"><span className="font-semibold text-foreground"><TranslatedText text="Management of High-Tech Programs and Projects (2023):"/></span> <TranslatedText text="Pskov State University"/></li>
              <li className="text-md text-muted-foreground"><span className="font-semibold text-foreground"><TranslatedText text="Software and Administration of Information Systems (2021):"/></span> <TranslatedText text="Kursk State University, Kursk"/></li>
            </ul>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Certifications Section */}
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4 flex items-center"><Award className="mr-3 h-7 w-7 text-primary" /> <TranslatedText text="Certifications & Courses" /></h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><TranslatedText text="Google Cybersecurity (2023)"/></li>
                <li><TranslatedText text="Teach English Now! Foundational Principles (Arizona State University, 2023)"/></li>
                <li><TranslatedText text="Teacher Of English To Speakers Of Other Languages (TEFL, 2023)"/></li>
                <li><TranslatedText text="EF SET Certificate (2024)"/></li>
                <li><TranslatedText text="IT Fundamentals for Cybersecurity (IBM, 2022)"/></li>
                <li><TranslatedText text="Foundations of Digital Marketing and E-commerce (Google, 2022)"/></li>
                <li><TranslatedText text="Foundations of Project Management (Google, 2022)"/></li>
              </ul>
            </div>

            {/* Skills Section */}
            <div>
                <h2 className="text-3xl font-semibold text-foreground mb-4 flex items-center"><Languages className="mr-3 h-7 w-7 text-primary" /> <TranslatedText text="Skills" /></h2>
                <h4 className="font-semibold text-foreground"><TranslatedText text="Languages"/></h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li><TranslatedText text="English: Native"/></li>
                  <li><TranslatedText text="Russian: B1 - Intermediate"/></li>
                </ul>
                <h4 className="font-semibold text-foreground"><TranslatedText text="Technical Skills"/></h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><TranslatedText text="Python"/></li>
                  <li><TranslatedText text="Django Framework"/></li>
                  <li><TranslatedText text="Mathematical Programming"/></li>
                  <li><TranslatedText text="General Information Technology"/></li>
                  <li><TranslatedText text="Advanced PC User"/></li>
                </ul>
            </div>
          </div>
        </section>
      </main>
       <footer className="text-center py-6 border-t border-border">
         <div className="flex flex-col items-center gap-4">
            <SocialIcons className="flex space-x-4 justify-center" />
            <Button variant="link" asChild>
            <Link href="/">
                <TranslatedText text="Return to Homepage" />
            </Link>
            </Button>
         </div>
      </footer>
    </div>
  );
}
