
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text'; // Updated import
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { SocialIcons } from '@/components/social-icons';

export default function SoftwareEngineeringPage() {
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
          <TranslatedText text="Software Engineering" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <Image
            src="https://placehold.co/800x400.png"
            alt="Software Engineering Project Showcase"
            width={800}
            height={400}
            data-ai-hint="software code"
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Project Highlights" />
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            <TranslatedText text="Dive into the technical details of MIT's software engineering endeavors. This section showcases a variety of projects, demonstrating proficiency in modern web technologies, problem-solving capabilities, and a commitment to building efficient and scalable solutions." />
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-background/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="Portfolio Website (This Project)" />
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                <TranslatedText text="Technologies: Next.js, React, TypeScript, Tailwind CSS, Firebase, Genkit (for AI Translation)" />
              </p>
              <p className="text-sm text-foreground">
                <TranslatedText text="Developed a personal portfolio website showcasing skills and projects. Implemented features like dark/light mode, real-time AI-powered language translation, and responsive design. Leveraged server components and server actions for optimal performance." />
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="E-commerce Platform MVP" />
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                <TranslatedText text="Technologies: Node.js, Express, MongoDB, React, Redux" />
              </p>
              <p className="text-sm text-foreground">
                <TranslatedText text="Designed and built a minimum viable product for an e-commerce platform. Features included product listings, user authentication, shopping cart functionality, and a basic admin panel for managing inventory. Focused on RESTful API design and secure payment gateway integration concepts." />
              </p>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-3">
            <TranslatedText text="Skills & Expertise" />
          </h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li><TranslatedText text="Frontend: React, Next.js, Vue.js, HTML5, CSS3, JavaScript (ES6+), TypeScript" /></li>
            <li><TranslatedText text="Backend: Node.js, Express.js, Python (Flask/Django basics)" /></li>
            <li><TranslatedText text="Databases: Firebase Firestore, MongoDB, PostgreSQL (basics)" /></li>
            <li><TranslatedText text="Tools & Platforms: Git, Docker, Google Cloud Platform, Firebase, Vercel, Netlify" /></li>
            <li><TranslatedText text="Others: Agile Methodologies, RESTful APIs, UI/UX Principles, AI Integration (Genkit)" /></li>
          </ul>
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
