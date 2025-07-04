
import { Github, Linkedin, Youtube } from 'lucide-react';
import { WhatsappIcon, TelegramIcon, CourseraIcon } from '@/components/icons';

export function SocialIcons({ className }: { className?: string }) {
  const iconWrapperClasses = "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110";
  const iconClasses = "h-5 w-5";

  return (
    <div className={className}>
      <a
        href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconWrapperClasses} bg-[#0077B5] hover:bg-[#005582]`}
        aria-label="LinkedIn"
      >
        <Linkedin className={`${iconClasses} text-white`} />
      </a>
      <a
        href="https://github.com/MS0C54073"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconWrapperClasses} bg-foreground hover:bg-muted-foreground`}
        aria-label="GitHub"
      >
        <Github className={`${iconClasses} text-background`} />
      </a>
      <a
        href="https://www.youtube.com/@musondasalimu2986"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconWrapperClasses} bg-[#FF0000] hover:bg-[#CC0000]`}
        aria-label="YouTube"
      >
        <Youtube className={`${iconClasses} text-white`} />
      </a>
      <a
        href="https://wa.me/79014213578"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconWrapperClasses} bg-[#25D366] hover:bg-[#1EAE54]`}
        aria-label="Whatsapp"
      >
        <WhatsappIcon className={`${iconClasses} text-white`} />
      </a>
      <a
        href="https://t.me/MuzoSalim"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconWrapperClasses} bg-[#229ED9] hover:bg-[#1A87B8]`}
        aria-label="Telegram"
      >
        <TelegramIcon className={`${iconClasses} text-white`} />
      </a>
      <a
        href="https://tinyurl.com/a7pw8s3a"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconWrapperClasses} bg-[#2AABEE] hover:bg-[#1A87B8]`}
        aria-label="Telegram Channel"
      >
        <TelegramIcon className={`${iconClasses} text-white`} />
      </a>
      <a
        href="https://www.coursera.org/user/d5bf15915278f56a6f96c3b5195c6d11"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconWrapperClasses} bg-[#0056d2] hover:bg-[#003b8f]`}
        aria-label="Coursera"
      >
        <CourseraIcon className={`${iconClasses} text-white`} />
      </a>
    </div>
  );
}
