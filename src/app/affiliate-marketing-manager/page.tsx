
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text'; // Updated import
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Gift, Swords, Trophy } from 'lucide-react';
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
              alt="Club World Cup Promotion"
              width={250}
              height={250}
              className="rounded-full shadow-lg border-4 border-primary object-cover"
            />
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Expert Affiliate Marketing Management" />
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            <TranslatedText text="Triple your chances to win! 🚀 Join Betwinner now and get a massive 200% welcome bonus up to $300 on your first deposit. Use promo code BWZED to activate your BONUS. Enjoy the best odds, instant payouts, and 24/7 support. Need help activating your bonus? Click our social icons below to contact our admin for fast assistance. Don't miss out—sign up today and start your winning streak! 🎯" />
          </p>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold text-accent mb-4 text-center">
                <TranslatedText text="Today's Big Game Info" />
            </h3>
            <div className="p-6 bg-background/50 rounded-lg border-2 border-dashed border-primary shadow-lg space-y-4 text-center">
                <h4 className="font-bold text-2xl text-foreground">
                    <TranslatedText text="🔥 Club World Cup 25 Action!"/>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 max-w-5xl mx-auto">
                     <Image
                        src="https://drive.google.com/uc?export=view&id=1CQ8-t2ejOZR450cZq0lwq394HgJ6zHaa"
                        alt="Betwinner Offer 1"
                        width={400}
                        height={200}
                        className="rounded-lg mx-auto shadow-md w-full object-cover"
                      />
                      <Image
                        src="https://drive.google.com/uc?export=view&id=13IA5TdCwTAbiCqLK36slEyl7798aG0o0"
                        alt="Betwinner Offer 2"
                        width={400}
                        height={200}
                        className="rounded-lg mx-auto shadow-md w-full object-cover"
                      />
                      <Image
                        src="https://drive.google.com/uc?export=view&id=1AfHoEiCMTsO8akNZ0F34WAsKkD8iy4Y-"
                        alt="Betwinner Offer 3"
                        width={400}
                        height={200}
                        className="rounded-lg mx-auto shadow-md w-full object-cover"
                      />
                </div>

                <div className="text-left mx-auto max-w-xs space-y-2 text-foreground">
                     <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent shrink-0"/> <span><TranslatedText text="29.06 – PSG"/> <Swords className="inline h-4 w-4" /> <TranslatedText text="Inter Miami | 18:00"/></span></p>
                     <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent shrink-0"/> <span><TranslatedText text="30.06 – Inter"/> <Swords className="inline h-4 w-4" /> <TranslatedText text="Fluminense | 21:00"/></span></p>
                     <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent shrink-0"/> <span><TranslatedText text="01.07 – Real Madrid"/> <Swords className="inline h-4 w-4" /> <TranslatedText text="Juventus | 21:00"/></span></p>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg text-center mt-4 space-y-2">
                    <p className="text-lg text-foreground font-semibold flex items-center justify-center gap-2">
                        <Gift className="h-5 w-5 text-primary" />
                        <TranslatedText text="200% BONUS up to $300 on 1st deposit!"/>
                    </p>
                    <p className="text-lg text-foreground flex items-center justify-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        <TranslatedText text="Use PROMOCODE:"/>{' '}
                        <a
                            href="https://h5lwvwj.top/2bi1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-accent/90 transition-colors"
                        >
                            BWZED
                        </a>
                    </p>
                </div>
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
