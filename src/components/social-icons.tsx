
'use client';

import { Github, Linkedin, Youtube } from 'lucide-react';
import { WhatsappIcon, TelegramIcon, CourseraIcon, TryHackMeIcon } from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TranslatedText from '@/app/components/translated-text';


export function SocialIcons({ className }: { className?: string }) {
  const iconWrapperClasses = "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110";
  const iconClasses = "h-5 w-5";

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/', icon: <Linkedin className={`${iconClasses} text-white`} />, bgClass: 'bg-[#0077B5] hover:bg-[#005582]' },
    { name: 'GitHub', href: 'https://github.com/MS0C54073', icon: <Github className={`${iconClasses} text-background`} />, bgClass: 'bg-foreground hover:bg-muted-foreground' },
    { name: 'YouTube', href: 'https://www.youtube.com/@musondasalimu2986', icon: <Youtube className={`${iconClasses} text-white`} />, bgClass: 'bg-[#FF0000] hover:bg-[#CC0000]' },
    { name: 'Whatsapp', href: 'https://wa.me/79014213578', icon: <WhatsappIcon className={`${iconClasses} text-white`} />, bgClass: 'bg-[#25D366] hover:bg-[#1EAE54]' },
    { name: 'Telegram', href: 'https://t.me/MuzoSalim', icon: <TelegramIcon className={`${iconClasses} text-white`} />, bgClass: 'bg-[#229ED9] hover:bg-[#1A87B8]' },
    { name: 'Coursera', href: 'https://www.coursera.org/user/d5bf15915278f56a6f96c3b5195c6d11', icon: <CourseraIcon className={`${iconClasses} text-white`} />, bgClass: 'bg-[#0056d2] hover:bg-[#003b8f]' },
    { name: 'TryHackMe', href: 'https://tryhackme.com/p/MuzoSali', icon: <TryHackMeIcon className={`${iconClasses} text-white`} />, bgClass: 'bg-[#881414] hover:bg-[#6d1010]' },
  ];

  return (
    <TooltipProvider>
      <div className={className}>
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={100}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconWrapperClasses} ${link.bgClass}`}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p><TranslatedText text={link.name} /></p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
