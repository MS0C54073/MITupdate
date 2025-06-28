
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text'; // Updated import
import { Button } from '@/components/ui/button';
import { ArrowLeft, Music2, Gamepad2, Film } from 'lucide-react';
import Image from 'next/image';
import { SocialIcons } from '@/app/components/social-icons';

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
          <Image
            src="https://picsum.photos/800/400"
            data-ai-hint="creative technology"
            alt="Hobbies Showcase"
            width={800}
            height={400}
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Beyond Work: Passions & Pastimes" />
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            <TranslatedText text="Exploring personal interests and hobbies is crucial for a well-rounded life. This section offers a glimpse into Musonda Salimu's activities outside of professional pursuits, highlighting a love for music, gaming, and film." />
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Music2 className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Music Lover" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Passionate about various music genres, from classical to electronic. Enjoys discovering new artists, attending concerts, and occasionally dabbling in music creation tools." />
              </p>
              <Button variant="link" className="mt-3 text-accent">
                <TranslatedText text="Explore Playlists (Example)" />
              </Button>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Gamepad2 className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Gaming Enthusiast" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Enjoys immersive storytelling and strategic challenges in video games. Favorite genres include RPGs, strategy games, and indie titles." />
              </p>
               <Button variant="link" className="mt-3 text-accent">
                <TranslatedText text="Favorite Games (Example)" />
              </Button>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border flex flex-col items-center text-center">
              <Film className="h-12 w-12 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Film Buff" />
              </h3>
              <p className="text-sm text-muted-foreground">
                <TranslatedText text="Appreciates the art of filmmaking and storytelling through cinema. Enjoys a wide range of movies, from critically acclaimed dramas to blockbuster action films." />
              </p>
               <Button variant="link" className="mt-3 text-accent">
                <TranslatedText text="Movie Watchlist (Example)" />
              </Button>
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
