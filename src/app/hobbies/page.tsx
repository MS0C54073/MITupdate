
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Music2, Gamepad2, Film, Camera, Headphones, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { SocialIcons } from '@/components/social-icons';

export default function HobbiesPage() {
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
          <TranslatedText text="Hobbies & Interests" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <div className="flex justify-center mb-6">
            <Image
              src="https://placehold.co/250x250.png"
              alt="Hobbies Showcase"
              data-ai-hint="hobby collection"
              width={250}
              height={250}
              className="rounded-full shadow-lg border-4 border-primary object-cover"
            />
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Beyond Work: Passions & Pastimes" />
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            <TranslatedText text="Exploring personal interests and hobbies is crucial for a well-rounded life. This section offers a glimpse into my activities outside of professional pursuits, showcasing a love for technology, creativity, and continuous learning." />
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Gamepad2 className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Gaming Enthusiast" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Adept at gaming on PS, Xbox, and PC. Enjoys a variety of genres, with a particular love for FC25." />
              </p>
            </div>
             <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Music2 className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Music Creator" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Passionate about creating music, from composing original pieces to rapping." />
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Camera className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Photography" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Capturing moments and telling stories through the lens of a camera." />
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Headphones className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Audio Books & Podcasts" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Constantly learning and exploring new ideas through engaging audio books and insightful podcasts." />
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Film className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Film & Documentaries" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="An avid viewer of films and documentaries, appreciating the art of storytelling and learning about new subjects." />
              </p>
            </div>
             <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Lightbulb className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Tech Insights" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Dedicated to staying on the cutting edge by reading about new tech information and trends." />
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-8 text-center">
            <TranslatedText text="These hobbies provide a source of inspiration, relaxation, and continuous learning." />
          </p>
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
