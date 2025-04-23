'use client';

import Image from 'next/image';
import {Github, Linkedin, Youtube} from 'lucide-react';

// Custom Icons
import { WhatsappIcon, TelegramIcon } from '@/components/icons';
import './ai.css';
import { useTranslated } from './translator';
import { useState, useEffect } from 'react';

const TranslatedText = ({ text }: { text: string }) => {
  const translatedText = useTranslated(text);
  return <>{translatedText}</>;
};

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      {/* Profile Section */}
      <section className="mb-12">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <Image
            src="https://picsum.photos/200/200"
            alt="Muzo's Profile Picture"
            width={200}
            height={200}
            className="rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary"><TranslatedText text="Musonda Salimu (Muzo)"/></h1>
            <p className="text-muted-foreground mb-4">
              <TranslatedText text="Tech Enthusiast, English Teacher, Affiliate Marketer, and Music Lover"/>
            </p>
            <p className="text-foreground">
              <TranslatedText text="Passionate about leveraging technology for education and creating engaging content."/>
              <TranslatedText text="Exploring the intersections of tech, teaching, marketing, and music."/>
            </p>
            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <Linkedin className="h-6 w-6"/>
              </a>
              <a
                href="https://github.com/MS0C54073"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <Github className="h-6 w-6"/>
              </a>
              <a
                href="https://www.youtube.com/@musondasalimu2986"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <Youtube className="h-6 w-6"/>
              </a>
              <a
                href="https://wa.me/79014213578"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <WhatsappIcon className="h-6 w-6"/>
              </a>
              <a
                href="https://t.me/MuzoSalim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <TelegramIcon className="h-6 w-6"/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-primary"><TranslatedText text="Portfolio Showcase"/></h2>
        <div className="portfolio-rotation">
          {/* Software Engineering */}
          <div className="portfolio-item rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/601/400"
              alt="Software Engineering - Teaching Related"
              width={604}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Software Engineering"/></h3>
            <p className="text-muted-foreground">
              <TranslatedText text="Brief description of the tech project. Mention technologies used and outcomes."/>
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              <TranslatedText text="Learn More"/>
            </a>
          </div>

          {/* Teaching Experience */}
          <div className="portfolio-item rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/602/400"
              alt="Teaching Experience"
              width={605}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Teaching Experience"/></h3>
            <p className="text-muted-foreground">
              <TranslatedText text="Brief description of the teaching experience. Highlight subjects taught and achievements."/>
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              <TranslatedText text="Learn More"/>
            </a>
          </div>

          {/* Affiliate Marketing Project */}
          <div className="portfolio-item rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/603/400"
              alt="Affiliate Marketing Project"
              width={606}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              <TranslatedText text="Affiliate Marketing Manager"/>
            </h3>
            <p className="text-muted-foreground">
              <TranslatedText text="Brief description of the affiliate marketing project. Include strategies and results."/>
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              <TranslatedText text="Learn More"/>
            </a>
          </div>

          {/* Hobbies */}
          <div className="portfolio-item rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/604/400"
              alt="Hobbies"
              width={607}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Hobbies"/></h3>
            <p className="text-muted-foreground"><TranslatedText text="Brief description of the music track or project."/></p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              <TranslatedText text="Listen Now"/>
            </a>
          </div>
        </div>
      </section>
       {/* Leave a comment section */}
       <section className="mt-12 py-8 border-t border-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary"><TranslatedText text="Leave a comment"/></h2>
         <div>
         <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:"/></label>
              <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Email:"/></label>
                <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Comment:"/></label>
                  <textarea id="comment" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-accent hover:bg-red-600 text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  <TranslatedText text="Post Comment"/>
                  </button>
                </div>
              </form>
          </div>
      </section>

       {/* Leave an order section */}
       <section className="mt-12 py-8 border-t border-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary"><TranslatedText text="Leave an order"/></h2>
         <div>
         <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:"/></label>
              <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Email:"/></label>
                <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
               <div className="mb-4">
                <label htmlFor="phone" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Phone:"/></label>
                <input type="phone" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
               <div className="mb-4">
                <label htmlFor="attachment" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Attach File:"/></label>
                <input type="file" id="attachment" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Order Details:"/></label>
                  <textarea id="comment" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-accent hover:bg-red-600 text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  <TranslatedText text="Place Order"/>
                  </button>
                </div>
              </form>
          </div>
      </section>

      {/* Contact Me Section */}
      <section className="mt-12 py-8 border-t border-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary"><TranslatedText text="Contact Me"/></h2>
        <p className="text-foreground mb-4">
          <TranslatedText text="I'm always open to new opportunities and collaborations. Feel free to reach out through any of the following channels:"/>
        </p>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
          >
            <Linkedin className="h-6 w-6"/>
          </a>
          <a
            href="https://github.com/MS0C54073"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
          >
            <Github className="h-6 w-6"/>
          </a>
          <a
            href="https://www.youtube.com/@musondasalimu2986"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
          >
            <Youtube className="h-6 w-6"/>
          </a>
          <a
            href="https://wa.me/79014213578"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
          >
            <WhatsappIcon className="h-6 w-6"/>
          </a>
          <a
            href="https://t.me/MuzoSalim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
          >
            <TelegramIcon className="h-6 w-6"/>
          </a>
        </div>
      </section>
    </div>
  );
}

