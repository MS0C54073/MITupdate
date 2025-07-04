
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gift, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { SocialIcons } from '@/components/social-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ZambiaFlagIcon, RussiaFlagIcon } from '@/components/flag-icons';
import { useState, useEffect, useRef, useCallback } from 'react';
import '@/app/ai.css';

export default function AffiliateMarketingManagerPage() {
    const images = [
    { src: "https://drive.google.com/uc?id=1qKILVi6oOCuQBHevbYkvr1NS3s7sPDja", alt: "Affiliate Marketing Image 1", hint: "sports betting" },
    { src: "https://drive.google.com/uc?id=1AjQ6wGLABvwQKUMVz-e0nVU5yO5YgWUJ", alt: "Affiliate Marketing Image 2", hint: "soccer players" },
    { src: "https://drive.google.com/uc?id=1NLnTM6Xc8MZqnS_XSPKOpqxmBz6CkPNJ", alt: "Affiliate Marketing Image 4", hint: "casino chips" },
    { src: "https://drive.google.com/uc?id=1HFP3VmUoINFAZTyA-zbIi6-Hom7yYMms", alt: "Affiliate Marketing Image 5", hint: "online game" },
    { src: "https://drive.google.com/uc?id=1exU5AKqGy7F3VIp92yRpVckMCuWOb8CT", alt: "Affiliate Marketing Image 6", hint: "sports odds" },
    { src: "https://drive.google.com/uc?id=1p4Es14i71zDIWsmav4Tw75p46a9undzc", alt: "Affiliate Marketing Image 7", hint: "betting app" },
    { src: "https://drive.google.com/uc?id=1-h46xg2ZrgOlmcMdZKK-Q3uMCSfOx3sV", alt: "Affiliate Marketing Image 8", hint: "soccer ball" },
    { src: "https://drive.google.com/uc?id=1R__srceNSMgx5ncLeQSWesA5V5FwkU4b", alt: "Affiliate Marketing Image 9", hint: "winning bet" },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkArrows = useCallback(() => {
      const container = scrollContainerRef.current;
      if (container) {
          const { scrollLeft, scrollWidth, clientWidth } = container;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
  }, []);

  useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
          const timer = setTimeout(() => checkArrows(), 100);
          container.addEventListener('scroll', checkArrows);
          window.addEventListener('resize', checkArrows);
          return () => {
              clearTimeout(timer);
              container.removeEventListener('scroll', checkArrows);
              window.removeEventListener('resize', checkArrows);
          };
      }
  }, [checkArrows]);

  const handleScroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
          const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
          const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
          scrollContainerRef.current.scrollTo({
              left: newScrollLeft,
              behavior: 'smooth',
          });
      }
  };
  
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
          <div className="relative group mb-6">
            {canScrollLeft && (
                <Button
                variant="outline"
                size="icon"
                className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleScroll('left')}
                aria-label="Scroll left"
                >
                <ChevronLeft className="h-6 w-6" />
                </Button>
            )}
            <div className="portfolio-rotation" ref={scrollContainerRef}>
                {images.map((image, index) => (
                    <div key={index} className="portfolio-item">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            data-ai-hint={image.hint}
                            width={320}
                            height={240}
                            className="w-full h-60 rounded-lg shadow-lg object-cover"
                        />
                    </div>
                ))}
            </div>
            {canScrollRight && (
                <Button
                variant="outline"
                size="icon"
                className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleScroll('right')}
                aria-label="Scroll right"
                >
                <ChevronRight className="h-6 w-6" />
                </Button>
            )}
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
            <div 
              className="relative p-6 rounded-lg border-2 border-dashed border-primary shadow-lg space-y-4 text-center overflow-hidden"
              style={{ backgroundImage: 'url(https://drive.google.com/uc?id=1MB8-p6xPYA7fTzC4gpdBdudNiF5MbtLY)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 -z-10"></div>

                <h4 className="font-bold text-2xl text-primary-foreground">
                    <TranslatedText text="🔥 Club World Cup 25 Action!"/>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 max-w-5xl mx-auto">
                     <Image
                        src="https://drive.google.com/uc?id=1b4zUNiRzCQizrBGJUSg62duUbFMyw3Fa"
                        alt="Betwinner Offer 1"
                        data-ai-hint="sports betting"
                        width={400}
                        height={200}
                        className="rounded-lg mx-auto shadow-md w-full object-cover"
                      />
                      <Image
                        src="https://drive.google.com/uc?id=1b4zUNiRzCQizrBGJUSg62duUbFMyw3Fa"
                        alt="Betwinner Offer 2"
                        data-ai-hint="soccer match"
                        width={400}
                        height={200}
                        className="rounded-lg mx-auto shadow-md w-full object-cover"
                      />
                      <Image
                        src="https://drive.google.com/uc?id=1b4zUNiRzCQizrBGJUSg62duUbFMyw3Fa"
                        alt="Betwinner Offer 3"
                        data-ai-hint="stadium lights"
                        width={400}
                        height={200}
                        className="rounded-lg mx-auto shadow-md w-full object-cover"
                      />
                </div>

                <div className="text-left mx-auto max-w-lg space-y-4 text-primary-foreground">
                  <p className="text-center font-bold text-lg"><TranslatedText text="⚽ BW | ELSE | 201 ⚽" /></p>
                  <h5 className="font-bold text-xl text-center text-accent"><TranslatedText text="🎯 BET OF THE DAY 🎯" /></h5>
                  <p className="text-center font-semibold text-lg"><TranslatedText text="🌍 Palmeiras vs. Chelsea | Club World Cup (QF) 🌍" /></p>
                  <p className="text-center font-bold text-lg text-primary"><TranslatedText text="🔮 Prediction: Total Goals Under 2.5 @ 1.7 🔮" /></p>

                  <div className="space-y-2 text-sm text-primary-foreground/90">
                      <h6 className="font-semibold text-md text-primary-foreground"><TranslatedText text="📊 ANALYSIS:" /></h6>
                      <p><TranslatedText text="🛡️ Defensive Strength: Both teams boast rock-solid defenses—Chelsea’s structured backline + Palmeiras’ disciplined low block." /></p>
                      <p><TranslatedText text="📉 Recent Trends: Chelsea’s last 3 matches saw Under 2.5 goals, while Palmeiras kept 4 clean sheets in their past 5 games." /></p>
                      <p><TranslatedText text="⚡ Stakes: High-pressure knockout = fewer risks, more caution." /></p>
                  </div>

                  <div className="space-y-2 text-sm text-primary-foreground/90">
                      <h6 className="font-semibold text-md text-primary-foreground"><TranslatedText text="🔑 KEY FACTORS:" /></h6>
                      <p><TranslatedText text="✅ Chelsea’s midfield control (Enzo Fernández, Caicedo) stifles opponent attacks." /></p>
                      <p><TranslatedText text="✅ Palmeiras relies on counters—lack a clinical finisher." /></p>
                      <p><TranslatedText text="✅ Slow tempo expected with tactical fouls + set-piece battles." /></p>
                  </div>
                  
                  <p className="font-bold text-md text-center bg-highlight p-2 rounded-md text-foreground"><TranslatedText text="📢 Verdict: UNDER 2.5 GOALS (1.7) is the smart, data-backed pick! 🔥" /></p>
                </div>

                <div className="p-4 bg-background/20 backdrop-blur-sm rounded-lg text-center mt-4 space-y-2">
                    <p className="text-lg text-primary-foreground font-semibold flex items-center justify-center gap-2">
                        <Gift className="h-5 w-5 text-primary" />
                        <TranslatedText text="200% BONUS up to $300 on 1st deposit!"/>
                    </p>
                    <div className="text-lg text-primary-foreground flex items-center justify-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        <TranslatedText text="Use PROMOCODE BWZED for:"/>
                    </div>
                     <div className="flex flex-col sm:flex-row justify-center items-center gap-2 pt-2">
                        <Button asChild size="sm" className="font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                           <a href="https://tinyurl.com/5xd8rb5e" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                             <ZambiaFlagIcon className="h-4 w-6" />
                             <span>Zambia</span>
                           </a>
                         </Button>
                         <Button asChild size="sm" className="font-bold">
                           <a href="https://tinyurl.com/2j9e6ndd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                             <RussiaFlagIcon className="h-4 w-6" />
                             <span>Russia</span>
                           </a>
                         </Button>
                    </div>
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
             
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-6">
                <Button asChild size="lg" className="w-full sm:w-auto font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="https://tinyurl.com/5xd8rb5e" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ZambiaFlagIcon className="h-6 w-9" />
                    <span>BWZED (Zambia)</span>
                  </a>
                </Button>
                <Button asChild size="lg" className="w-full sm:w-auto font-bold">
                  <a href="https://tinyurl.com/2j9e6ndd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <RussiaFlagIcon className="h-6 w-9" />
                    <span>BWZED (Russia)</span>
                  </a>
                </Button>
              </div>
              
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

    

    
