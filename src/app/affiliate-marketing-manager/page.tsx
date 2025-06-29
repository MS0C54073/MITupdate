'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text'; // Updated import
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Clock, Trophy, Swords } from 'lucide-react';
import Image from 'next/image';
import { SocialIcons } from '@/components/social-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ZambiaFlagIcon, RussiaFlagIcon } from '@/components/flag-icons';

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
          <div className="flex justify-center mb-6">
            <Image
              src="https://drive.google.com/uc?export=view&id=1zXu6UN8XztuTdFNCRIPMi9Tn5gDzkBbZ"
              alt="Affiliate Marketing Showcase"
              width={250}
              height={250}
              className="rounded-full shadow-lg border-4 border-primary object-cover"
            />
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Expert Affiliate Marketing Management" />
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            <TranslatedText text="Musonda Salimu excels in affiliate marketing by building strategic partnerships, managing data-driven campaigns, and leveraging industry tools to drive growth and maximize ROI." />
          </p>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold text-accent mb-4 text-center">
              <TranslatedText text="Today's Big Game Info" />
            </h3>
            <div className="p-6 bg-background/50 rounded-lg border-2 border-dashed border-primary shadow-lg space-y-4">
              <p className="font-bold text-2xl text-foreground text-center">
                <TranslatedText text="🔥 Exclusive FIFA Club World Cup Offer! 🔥" />
              </p>
              <div className="my-4">
                <Image
                  src="https://drive.google.com/uc?export=view&id=1AfHoEiCMTsO8akNZ0F34WAsKkD8iy4Y-"
                  alt="PSG vs Inter Miami"
                  width={800}
                  height={400}
                  className="rounded-lg mx-auto shadow-md w-full object-cover"
                />
              </div>

              <h4 className="text-lg font-semibold text-center text-primary">
                <TranslatedText text="Bet on PSG vs Inter Miami & Claim 200% Bonus Up to K5200!" />
              </h4>

              <div className="text-left mx-auto max-w-lg space-y-2 text-foreground">
                <div className="flex items-center gap-3">
                  <Swords className="h-5 w-5 text-accent shrink-0" />
                  <span><strong className="font-semibold"><TranslatedText text="Match:" /></strong> <TranslatedText text="Paris Saint-Germain (Home) vs Inter Miami CF" /></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent shrink-0" />
                  <span><strong className="font-semibold"><TranslatedText text="Venue:" /></strong> <TranslatedText text="Mercedes-Benz Stadium" /></span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent shrink-0" />
                  <span><strong className="font-semibold"><TranslatedText text="Date:" /></strong> <TranslatedText text="Sun, 29 June 2025" /></span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent shrink-0" />
                  <span><strong className="font-semibold"><TranslatedText text="Time:" /></strong> <TranslatedText text="16:00 UTC (18:00 Local)" /></span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-accent shrink-0" />
                  <span><strong className="font-semibold"><TranslatedText text="Stage:" /></strong> <TranslatedText text="FIFA Club World Cup 1/8 Final" /></span>
                </div>
              </div>
              
              <div className="text-center font-semibold text-foreground bg-muted p-3 rounded-md">
                <p>
                  <TranslatedText text="💰 Odds:" />{' '}
                  <span className="inline-block mx-1"><TranslatedText text="PSG" /> <span className="font-bold text-primary">(1.25)</span></span>|
                  <span className="inline-block mx-1"><TranslatedText text="Draw" /> <span className="font-bold text-primary">(5.75)</span></span>|
                  <span className="inline-block mx-1"><TranslatedText text="Inter Miami" /> <span className="font-bold text-primary">(15.00)</span></span>
                </p>
              </div>

              <div className="p-4 bg-accent/10 rounded-lg text-center">
                <p className="text-lg text-foreground">
                  <TranslatedText text="🎁 Special Promo: Use code" />{' '}
                  <a
                    href="https://h5lwvwj.top/2bi1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-accent/90 transition-colors"
                  >
                    BWZED
                  </a>{' '}
                  <TranslatedText text="on your first deposit for a 200% bonus boost!" />
                </p>
              </div>
              
              <p className="font-semibold text-xl text-foreground mt-4 text-center">
                <TranslatedText text="⚡ Don't miss this clash of titans—bet now at BetWinner!" />
              </p>
            </div>
          </div>


          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold text-accent mb-4 text-center">
              <TranslatedText text="Special Promotion: BETWINNER" />
            </h3>
            <div className="text-center p-4 bg-background/50 rounded-lg border-2 border-dashed border-primary shadow-lg">
              <p className="font-bold text-lg text-foreground">
                <TranslatedText text="Join BETWINNER now and claim your BONUS! 💎💎" />
              </p>
              <p className="mt-2 text-muted-foreground">👇🏾👇🏾👇🏾</p>
              <p className="my-3 text-2xl font-extrabold text-primary">
                <TranslatedText text="Get a 200% BONUS on your first deposit! 🎉💰" />
              </p>
              <p className="text-lg text-foreground">
                <TranslatedText text="Use Promo Code:" />{' '}
                <a
                  href="https://h5lwvwj.top/2bi1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-accent/90 transition-colors"
                >
                  BWZED
                </a>{' '}
                ✅
              </p>

              <TooltipProvider>
                <div className="flex justify-center items-center gap-8 my-6">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://bw-prm.com/bw-zambia/?s1=BETODDS&id=1FbP" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                        <ZambiaFlagIcon className="h-12 w-18" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p><TranslatedText text="ZAMBIA" /></p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://h5lwvwj.top/2bi1" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                        <RussiaFlagIcon className="h-12 w-18" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p><TranslatedText text="RUSSIA" /></p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>

              <p className="font-semibold text-lg text-foreground">
                <TranslatedText text="🎯 Bet now and win big! 🎯" />
              </p>
            </div>
          </div>
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
