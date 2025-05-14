import type { SVGProps } from 'react';
import Link from 'next/link';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="AR/MR ROI Deep Dive Home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-accent"
        {...props}
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span className="text-xl font-semibold text-foreground">AR/MR ROI</span>
    </Link>
  );
}
