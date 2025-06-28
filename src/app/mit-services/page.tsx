
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit, Globe, Smartphone, Server, Network, Shield } from 'lucide-react';
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
            <TranslatedText text="Comprehensive Technology Solutions" />
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            <TranslatedText text="MuzoInTech (MIT) offers a wide spectrum of IT services designed to empower your business. From initial consultation to development and deployment, we provide end-to-end solutions to meet your unique technological needs." />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Consultation */}
            <div className="p-6 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <BrainCircuit className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="AI Consultation" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Leverage the power of Artificial Intelligence. We provide expert guidance on integrating AI solutions, like Genkit-powered agents and translation services, to automate processes and enhance user experience." />
              </p>
            </div>
            {/* Web Development */}
            <div className="p-6 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Globe className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Web Development" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Building modern, responsive, and high-performance websites using technologies like Next.js, React, and TypeScript. We focus on creating seamless user experiences with clean, scalable code." />
              </p>
            </div>
            {/* App Development */}
            <div className="p-6 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Smartphone className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="App Development" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Creating custom mobile applications for iOS and Android. Our focus is on user-centric design, robust functionality, and delivering a native-like performance for your target audience." />
              </p>
            </div>
            {/* System Development */}
            <div className="p-6 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Server className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="System Development" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Designing and building custom software systems tailored to your specific business needs. From internal tools to complex platforms, we ensure security, scalability, and efficiency." />
              </p>
            </div>
            {/* Networking */}
            <div className="p-6 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Network className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Networking" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Providing solutions for robust and secure network infrastructure. We cover network design, implementation, and management to ensure reliable connectivity for your operations." />
              </p>
            </div>
            {/* Cybersecurity */}
            <div className="p-6 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Cybersecurity" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Protecting your digital assets with comprehensive cybersecurity services. We offer threat analysis, security audits, and implementation of protective measures to safeguard your systems." />
              </p>
            </div>
          </div>
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
