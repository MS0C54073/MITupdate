import * as React from 'react';

export function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.83 3.08 1.32 4.79 1.32h.01c5.46 0 9.91-4.45 9.91-9.91C22.01 6.45 17.56 2 12.04 2zM17.29 15.3c-.28-.14-1.65-.81-1.91-.9-.26-.09-.45-.14-.64.14-.19.28-.72.9-.88 1.08-.16.18-.32.21-.6.06-.28-.15-1.18-.43-2.25-1.39-1.07-.96-1.59-1.7-1.78-1.98-.19-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.47.09-.19.04-.35-.02-.5-0.06-.14-.64-1.54-.87-2.1-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.54-.01s-.45.06-.69.31c-.24.24-.92.9-1.12 2.18-.2 1.28.61 2.53.7 2.7.09.18 1.75 2.67 4.24 3.73.59.25 1.05.4 1.41.51.59.18 1.13.16 1.56.1.48-.07 1.65-.68 1.88-1.36.24-.68.24-1.26.16-1.36-.07-.09-.26-.14-.54-.28z"/>
    </svg>
  );
}

export function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  );
}

export function MuzoInTechLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MuzoInTech Logo"
    >
      <rect width="100" height="100" rx="15" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        dy=".1em"
        fill="hsl(var(--primary-foreground))"
        fontSize="40"
        fontFamily="monospace, sans-serif"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        MIT
      </text>
    </svg>
  );
}
