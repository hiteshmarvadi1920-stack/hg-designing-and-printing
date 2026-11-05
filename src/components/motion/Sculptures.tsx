/* Reusable abstract "chrome" SVG sculptures. Colors come from CSS variables. */
type P = { className?: string; id: string };

function ChromeDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--porcelain)" />
        <stop offset="0.25" stopColor="var(--silver)" />
        <stop offset="0.45" stopColor="var(--obsidian)" />
        <stop offset="0.6" stopColor="var(--smoke)" />
        <stop offset="0.8" stopColor="var(--silver)" />
        <stop offset="1" stopColor="var(--porcelain)" />
      </linearGradient>
      <linearGradient id={`${id}-d`} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--smoke)" />
        <stop offset="0.5" stopColor="var(--obsidian)" />
        <stop offset="1" stopColor="var(--silver)" />
      </linearGradient>
    </defs>
  );
}

export function Ribbon({ className, id }: P) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <ChromeDefs id={id} />
      <path d="M80 420 C 140 120, 320 80, 380 220 S 560 480, 500 300 C 470 200, 300 360, 200 470 C 140 540, 60 520, 80 420Z" fill={`url(#${id}-c)`} />
      <path d="M120 400 C 180 200, 300 160, 350 260 S 470 420, 470 320" fill="none" stroke={`url(#${id}-d)`} strokeWidth="26" strokeLinecap="round" opacity="0.85" />
      <path d="M200 470 C 260 380, 340 330, 420 360" fill="none" stroke="var(--porcelain)" strokeWidth="3" opacity="0.6" />
    </svg>
  );
}

export function Ring({ className, id }: P) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <ChromeDefs id={id} />
      <ellipse cx="200" cy="200" rx="170" ry="120" fill="none" stroke={`url(#${id}-c)`} strokeWidth="44" transform="rotate(-24 200 200)" />
      <ellipse cx="200" cy="200" rx="170" ry="120" fill="none" stroke="var(--porcelain)" strokeWidth="2" opacity="0.5" transform="rotate(-24 200 200)" />
    </svg>
  );
}

export function Loop({ className, id }: P) {
  return (
    <svg viewBox="0 0 500 300" className={className} aria-hidden="true">
      <ChromeDefs id={id} />
      <path d="M40 150 C 40 40, 200 40, 250 150 S 460 260, 460 150 S 300 40, 250 150 S 40 260, 40 150Z" fill="none" stroke={`url(#${id}-d)`} strokeWidth="34" strokeLinejoin="round" />
    </svg>
  );
}

export function Shard({ className, id }: P) {
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      <ChromeDefs id={id} />
      <polygon points="150,10 290,120 210,290 40,250 10,90" fill={`url(#${id}-c)`} />
      <polygon points="150,10 210,290 40,250" fill={`url(#${id}-d)`} opacity="0.6" />
    </svg>
  );
}
