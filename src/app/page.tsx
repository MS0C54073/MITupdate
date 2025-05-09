
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Youtube } from 'lucide-react';

// Custom Icons
import { WhatsappIcon, TelegramIcon } from '@/components/icons';
import './ai.css';
import { useTranslated } from './translator';
import { useState, useEffect } from 'react';


// This component ensures that useTranslated is only called on the client-side.
const TranslatedText = ({ text }: { text: string }) => {
  const translatedText = useTranslated(text);
  return <>{translatedText}</>;
};

export default function Home() {
  // State to manage client-side rendering for AI background
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      {/* AI Background Effect - Render only on client */}
      {isClient && (
        <div className="ai-background">
          <div className="neural-nodes">
            {[...Array(10)].map((_, i) => (
              <div
                key={`node-${i}`}
                className="node"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className="data-stream">
            {[...Array(30)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          <div className="circuit-traces">
            {[...Array(5)].map((_, i) => (
              <div
                key={`trace-${i}`}
                className="trace"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200}px`,
                  height: '2px',
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      {/* Profile Section */}
      <section className="mb-12 relative z-10">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-8 p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
          <Image
            src="https://picsum.photos/200"
            data-ai-hint="profile portrait"
            alt="Muzo's Profile Picture"
            width={200}
            height={200}
            className="rounded-full shadow-lg border-4 border-primary"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 text-primary"><TranslatedText text="Musonda Salimu (Muzo)"/></h1>
            <p className="text-muted-foreground mb-4">
              <TranslatedText text="Tech Enthusiast, English Teacher, Affiliate Marketer, and Music Lover"/>
            </p>
            <p className="text-foreground">
              <TranslatedText text="Passionate about leveraging technology for education and creating engaging content."/>
              {' '}
              <TranslatedText text="Exploring the intersections of tech, teaching, marketing, and music."/>
            </p>
            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6"/>
              </a>
              <a
                href="https://github.com/MS0C54073"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6"/>
              </a>
              <a
                href="https://www.youtube.com/@musondasalimu2986"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6"/>
              </a>
              <a
                href="https://wa.me/79014213578"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="Whatsapp"
              >
                <WhatsappIcon className="h-6 w-6"/>
              </a>
              <a
                href="https://t.me/MuzoSalim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-6 w-6"/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section  className="relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Portfolio Showcase"/></h2>
        <div className="portfolio-rotation">
          {/* Software Engineering */}
          <Link href="/software-engineering" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/600/400?random=se"
                data-ai-hint="software development"
                alt="Software Engineering"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Software Engineering"/></h3>
              <p className="text-muted-foreground">
                <TranslatedText text="Brief description of the tech project. Mention technologies used and outcomes."/>
              </p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Learn More"/>
              </div>
            </a>
          </Link>

          {/* Teaching Experience */}
          <Link href="/teaching-experience" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/600/400?random=te"
                data-ai-hint="education classroom"
                alt="Teaching Experience"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Teaching Experience"/></h3>
              <p className="text-muted-foreground">
                <TranslatedText text="Brief description of the teaching experience. Highlight subjects taught and achievements."/>
              </p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Learn More"/>
              </div>
            </a>
          </Link>

          {/* Affiliate Marketing Project */}
          <Link href="/affiliate-marketing-manager" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/600/400?random=am"
                data-ai-hint="marketing analytics"
                alt="Affiliate Marketing Project"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Affiliate Marketing Manager"/>
              </h3>
              <p className="text-muted-foreground">
                <TranslatedText text="Brief description of the affiliate marketing project. Include strategies and results."/>
              </p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Learn More"/>
              </div>
            </a>
          </Link>

          {/* Hobbies */}
          <Link href="/hobbies" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/607/400?random=4"
                data-ai-hint="creative hobbies"
                alt="Hobbies"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Hobbies"/></h3>
              <p className="text-muted-foreground"><TranslatedText text="Brief description of the music track or project."/></p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Explore More"/>
              </div>
            </a>
          </Link>
        </div>
      </section>
       {/* Leave a comment section */}
       <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Leave a comment"/></h2>
         <div className="max-w-xl mx-auto p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
         <form>
            <div className="mb-4">
              <label htmlFor="comment-name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:"/></label>
              <input type="text" id="comment-name" className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary" />
            </div>
              <div className="mb-4">
                <label htmlFor="comment-email" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Email:"/></label>
                <input type="email" id="comment-email" className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
              </div>
                <div className="mb-6">
                  <label htmlFor="comment-text" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Comment:"/></label>
                  <textarea id="comment-text" rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"></textarea>
                </div>
                <div className="flex items-center justify-end">
                  <button className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors" type="button">
                  <TranslatedText text="Post Comment"/>
                  </button>
                </div>
              </form>
          </div>
      </section>

       {/* Leave an order section */}
       <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Leave an order"/></h2>
         <div className="max-w-xl mx-auto p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
         <form>
            <div className="mb-4">
              <label htmlFor="order-name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:"/></label>
              <input type="text" id="order-name" className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
            </div>
              <div className="mb-4">
                <label htmlFor="order-email" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Email:"/></label>
                <input type="email" id="order-email" className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
              </div>
               <div className="mb-4">
                <label htmlFor="order-phone" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Phone:"/></label>
                <input type="tel" id="order-phone" className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
              </div>
               <div className="mb-4">
                <label htmlFor="order-attachment" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Attach File:"/></label>
                <input type="file" id="order-attachment" className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 focus:ring-2 focus:ring-primary"/>
              </div>
                <div className="mb-6">
                  <label htmlFor="order-details" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Order Details:"/></label>
                  <textarea id="order-details" rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"></textarea>
                </div>
                <div className="flex items-center justify-end">
                  <button className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors" type="button">
                  <TranslatedText text="Place Order"/>
                  </button>
                </div>
              </form>
          </div>
      </section>

      {/* Contact Me Section */}
      <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Contact Me"/></h2>
        <div className="max-w-xl mx-auto text-center p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
        <p className="text-foreground mb-4">
          <TranslatedText text="I'm always open to new opportunities and collaborations. Feel free to reach out through any of the following channels:"/>
        </p>
        <div className="flex space-x-6 justify-center">
          <a
            href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-8 w-8"/>
          </a>
          <a
            href="https://github.com/MS0C54073"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-8 w-8"/>
          </a>
          <a
            href="https://www.youtube.com/@musondasalimu2986"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="YouTube Channel"
          >
            <Youtube className="h-8 w-8"/>
          </a>
          <a
            href="https://wa.me/79014213578"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="WhatsApp"
          >
            <WhatsappIcon className="h-8 w-8"/>
          </a>
          <a
            href="https://t.me/MuzoSalim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="Telegram"
          >
            <TelegramIcon className="h-8 w-8"/>
          </a>
        </div>
        </div>
      </section>
    </div>
  );
}

