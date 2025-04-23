
import Image from 'next/image';
import {Github, Linkedin, Youtube} from 'lucide-react';

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
            <h1 className="text-3xl font-bold mb-2 text-primary">Musonda Salimu (Muzo)</h1>
            <p className="text-muted-foreground mb-4">
              Tech Enthusiast, English Teacher, Affiliate Marketer, and Music Lover
            </p>
            <p className="text-foreground">
              Passionate about leveraging technology for education and creating engaging content.
              Exploring the intersections of tech, teaching, marketing, and music.
            </p>
            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://linkedin.com/in/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <Linkedin className="h-6 w-6"/>
              </a>
              <a
                href="https://github.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <Github className="h-6 w-6"/>
              </a>
              <a
                href="https://youtube.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
              >
                <Youtube className="h-6 w-6"/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-primary">Portfolio Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tech Project */}
          <div className="rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/601/400"
              alt="Tech Project"
              width={604}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2">Tech Project Title</h3>
            <p className="text-muted-foreground">
              Brief description of the tech project. Mention technologies used and outcomes.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Teaching Experience */}
          <div className="rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/602/400"
              alt="Teaching Experience"
              width={605}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2">Teaching Experience Title</h3>
            <p className="text-muted-foreground">
              Brief description of the teaching experience. Highlight subjects taught and achievements.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Affiliate Marketing Project */}
          <div className="rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/603/400"
              alt="Affiliate Marketing Project"
              width={606}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Affiliate Marketing Manager
            </h3>
            <p className="text-muted-foreground">
              Brief description of the affiliate marketing project. Include strategies and results.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Music Showcase */}
          <div className="rounded-lg border shadow-md p-4 hover:shadow-lg hover:animate-shake transition-shadow">
            <Image
              src="https://picsum.photos/604/400"
              alt="Hobbies"
              width={607}
              height={400}
              className="rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2">Hobbies</h3>
            <p className="text-muted-foreground">Brief description of the music track or project.</p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-red-600 hover:animate-pulse transition-colors"
            >
              Listen Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

