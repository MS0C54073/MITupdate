
import * as React from 'react';

export function ZambiaFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 24"
      {...props}
      className="rounded-sm"
    >
      <path fill="#198a00" d="M0 0h36v24H0z" />
      <path fill="#de2110" d="M24 18h4v6h-4z" />
      <path fill="#000" d="M28 18h4v6h-4z" />
      <path fill="#ff6d00" d="M32 18h4v6h-4z" />
      <path
        fill="#ff6d00"
        d="M30 13.5l-1.8-1.35-1.05.2-1.35-1.35h-.6l-1.35 1.35-.9-.2-1.8 1.35.9 1.95 1.8-1.35 1.35 1.8 1.35-1.8 1.8 1.35z"
      />
    </svg>
  );
}

export function RussiaFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 6"
      {...props}
      className="rounded-sm"
    >
      <path fill="#fff" d="M0 0h9v3H0z" />
      <path fill="#d52b1e" d="M0 3h9v3H0z" />
      <path fill="#0039a6" d="M0 2h9v2H0z" />
    </svg>
  );
}

export function UnitedKingdomFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props} className="rounded-sm">
      <clipPath id="uk-flag-clip"><path d="M0 0v30h60V0z"/></clipPath>
      <path d="M0 0v30h60V0z" fill="#00247d"/>
      <path d="M0 0L60 30m-60 0L60 0" stroke="#fff" strokeWidth="6" clipPath="url(#uk-flag-clip)"/>
      <path d="M0 0L60 30m-60 0L60 0" stroke="#cf142b" strokeWidth="4" clipPath="url(#uk-flag-clip)"/>
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" clipPath="url(#uk-flag-clip)"/>
      <path d="M30 0v30M0 15h60" stroke="#cf142b" strokeWidth="6" clipPath="url(#uk-flag-clip)"/>
    </svg>
  );
}

export function FranceFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" {...props} className="rounded-sm">
      <path fill="#0055A4" d="M0 0h1v2H0z"/>
      <path fill="#FFFFFF" d="M1 0h1v2H1z"/>
      <path fill="#EF4135" d="M2 0h1v2H2z"/>
    </svg>
  );
}

export function SpainFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" {...props} className="rounded-sm">
      <path fill="#C60B1E" d="M0 0h3v.5H0zM0 1.5h3V2H0z"/>
      <path fill="#FFC400" d="M0 .5h3v1H0z"/>
    </svg>
  );
}

function Star(props: any) {
    return <path fill="#ffde00" d="M0-1l.294.904H1.236L.472.472l.294.904L0 .8l-.766.576.294-.904L-1.236-.196H-.294z" {...props} />
}

export function ChinaFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" {...props} className="rounded-sm">
      <path fill="#de2910" d="M0 0h36v24H0z"/>
      <g transform="translate(6,6) scale(3)">
        <Star />
      </g>
      <g transform="translate(12,2.4) scale(1)" >
        <Star />
      </g>
      <g transform="translate(14.4,4.8) scale(1)">
        <Star />
      </g>
      <g transform="translate(14.4,8.4) scale(1)">
        <Star />
      </g>
      <g transform="translate(12,10.8) scale(1)">
        <Star />
      </g>
    </svg>
  );
}

export function SaudiArabiaFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" {...props} className="rounded-sm">
      <path fill="#006c35" d="M0 0h36v24H0z"/>
      <rect x="5" y="16" width="26" height="2" fill="#fff" />
      <rect x="5" y="15" width="2" height="4" fill="#fff" />
    </svg>
  );
}
