
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text'; // Updated import
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function AffiliateMarketingManagerPage() {
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
          <TranslatedText text="Affiliate Marketing Manager" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <Image
            src="https://placehold.co/800x400.png"
            data-ai-hint="business handshake"
            alt="Affiliate Marketing Showcase"
            width={800}
            height={400}
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Driving Growth Through Partnerships" />
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            <TranslatedText text="As an Affiliate Marketing Manager, Musonda Salimu focuses on building and nurturing strategic partnerships to drive sales, increase brand visibility, and expand market reach. This involves a data-driven approach to optimizing campaigns and maximizing ROI." />
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="Strategy & Campaign Management" />
              </h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><TranslatedText text="Developing and executing comprehensive affiliate marketing strategies aligned with overall business objectives." /></li>
                <li><TranslatedText text="Identifying and recruiting new affiliates and partners through various channels." /></li>
                <li><TranslatedText text="Negotiating terms, commission structures, and contracts with affiliates." /></li>
                <li><TranslatedText text="Managing day-to-day affiliate program operations, including onboarding, communication, and support." /></li>
                <li><TranslatedText text="Monitoring campaign performance, analyzing key metrics (clicks, conversions, EPC, AOV), and providing regular reports." /></li>
                <li><TranslatedText text="Optimizing campaigns for improved performance by A/B testing creatives, landing pages, and promotional offers." /></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="Relationship Building & Tools" />
              </h3>
               <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><TranslatedText text="Building and maintaining strong relationships with key affiliates and affiliate networks." /></li>
                <li><TranslatedText text="Providing affiliates with necessary marketing materials, tools, and training to promote products/services effectively." /></li>
                <li><TranslatedText text="Staying updated with industry trends, competitor activities, and new affiliate marketing technologies." /></li>
                <li><TranslatedText text="Experience with affiliate tracking platforms (e.g., Impact, ShareASale, CJ Affiliate) and analytics tools (e.g., Google Analytics)." /></li>
              </ul>
            </div>
             <div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                <TranslatedText text="Example Project: Tech Gadget Niche" />
              </h3>
              <p className="text-sm text-foreground">
                <TranslatedText text="Managed an affiliate program for a new line of tech gadgets. Successfully recruited over 50 active affiliates within the first 6 months, resulting in a 25% increase in online sales attributed to the affiliate channel. Implemented a tiered commission structure to incentivize top performers." />
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
