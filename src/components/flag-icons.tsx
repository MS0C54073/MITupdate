
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
