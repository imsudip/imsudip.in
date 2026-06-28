import { cn } from '@/lib/utils';
import React from 'react';

interface SpoilerProps {
  summary?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Spoiler({
  summary = 'Click to reveal',
  children,
  className,
}: SpoilerProps) {
  return (
    <details
      className={cn(
        'my-4 rounded-lg border p-3 [&[open]>summary]:mb-2',
        className,
      )}
    >
      <summary className="cursor-pointer font-medium select-none">
        {summary}
      </summary>
      <div className="text-sm leading-6">{children}</div>
    </details>
  );
}
