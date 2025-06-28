'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function MITServicesPage() {
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
          <TranslatedText text="MIT Services" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <Image
            src="https://picsum.photos/800/400"
            data-ai-hint="modern office technology"
            alt="MIT Services Showcase"
            width={800}
            height={400}
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Technology Solutions & Services" />
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            <TranslatedText text="Explore the range of technology services offered by MIT (MuzoInTech). This section showcases a variety of solutions, demonstrating proficiency in modern web technologies, problem-solving capabilities, and a commitment to building efficient and scalable applications." />
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-background/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="Web Development" />
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                <TranslatedText text="Technologies: Next.js, React, TypeScript, Tailwind CSS, Firebase, Genkit (for AI)" />
              </p>
              <p className="text-sm text-foreground">
                <TranslatedText text="Building modern, responsive websites and web applications. This portfolio itself is an example, featuring dark/light mode, real-time AI-powered language translation, and a clean, performant architecture." />
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="Custom Software Solutions" />
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                <TranslatedText text="Technologies: Node.js, Express, MongoDB, React, Redux" />
              </p>
              <p className="text-sm text-foreground">
                <TranslatedText text="Designing and building custom applications tailored to specific business needs. From e-commerce platforms to internal tools, the focus is on creating secure, scalable, and user-friendly software." />
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
         <Button variant="link" asChild>
          <Link href="/">
            <TranslatedText text="Return to Homepage" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}
