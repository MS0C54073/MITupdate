
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text'; // Updated import
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function TeachingExperiencePage() {
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
          <TranslatedText text="Teaching Experience" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <Image
            src="https://placehold.co/800x400.png"
            data-ai-hint="teaching online"
            alt="Teaching Experience Showcase"
            width={800}
            height={400}
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="A Passion for Education" />
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            <TranslatedText text="Musonda Salimu has a strong background in English language instruction, dedicated to fostering student growth and creating engaging learning environments. This section highlights key aspects of this teaching journey." />
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="English Language Instructor (Online & Offline)" />
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                <TranslatedText text="Various Platforms & Institutions | 2018 - Present" />
              </p>
              <p className="text-sm text-foreground mb-3">
                <TranslatedText text="Delivered comprehensive English language lessons to diverse age groups and proficiency levels. Specialized in conversational English, grammar, vocabulary building, and exam preparation (e.g., IELTS, TOEFL)." />
              </p>
              <h4 className="text-md font-semibold text-foreground mb-1"><TranslatedText text="Key Responsibilities & Achievements:" /></h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><TranslatedText text="Developed and implemented customized lesson plans tailored to individual student needs and learning styles." /></li>
                <li><TranslatedText text="Utilized a variety of teaching methodologies and interactive materials to enhance student engagement and comprehension." /></li>
                <li><TranslatedText text="Provided constructive feedback and assessments to track student progress and identify areas for improvement." /></li>
                <li><TranslatedText text="Successfully prepared students for international English proficiency tests with high pass rates." /></li>
                <li><TranslatedText text="Cultivated a positive and supportive classroom atmosphere, encouraging active participation." /></li>
                <li><TranslatedText text="Adapted quickly to online teaching tools and platforms, ensuring seamless learning experiences during transitions." /></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="Curriculum Development Assistance" />
              </h3>
              <p className="text-sm text-foreground">
                <TranslatedText text="Contributed to the development and refinement of English language learning materials and curriculum for beginner to intermediate levels. Focused on creating practical and relevant content for real-world communication." />
              </p>
            </div>
          </div>
           <h3 className="text-2xl font-semibold text-foreground mb-3 mt-6">
            <TranslatedText text="Teaching Philosophy" />
          </h3>
          <p className="text-muted-foreground">
            <TranslatedText text="Belief in a student-centered approach, where learning is an interactive and collaborative process. Passionate about making language learning enjoyable and accessible, empowering students to achieve their communication goals." />
          </p>
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
