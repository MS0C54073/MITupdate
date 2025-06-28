
import { Github, Linkedin, Youtube } from 'lucide-react';
import { WhatsappIcon, TelegramIcon } from '@/components/icons';

export function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a
        href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-highlight transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-6 w-6" />
      </a>
      <a
        href="https://github.com/MS0C54073"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-highlight transition-colors"
        aria-label="GitHub"
      >
        <Github className="h-6 w-6" />
      </a>
      <a
        href="https://www.youtube.com/@musondasalimu2986"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-highlight transition-colors"
        aria-label="YouTube"
      >
        <Youtube className="h-6 w-6" />
      </a>
      <a
        href="https://wa.me/79014213578"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-highlight transition-colors"
        aria-label="Whatsapp"
      >
        <WhatsappIcon className="h-6 w-6" />
      </a>
      <a
        href="https://t.me/MuzoSalim"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-highlight transition-colors"
        aria-label="Telegram"
      >
        <TelegramIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
