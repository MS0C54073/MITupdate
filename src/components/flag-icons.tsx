
import * as React from 'react';

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
