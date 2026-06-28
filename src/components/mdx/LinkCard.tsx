import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import React from 'react';

interface LinkCardProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function LinkCard({
  url,
  title,
  description,
  className,
  children,
}: LinkCardProps) {
  const desc = description ?? (typeof children === 'string' ? children : '');

  if (!url) return null;

  let domain = url;
  try {
    domain = new URL(url).hostname.replace('www.', '');
  } catch {
    // keep raw url
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'hover:bg-muted/50 my-6 flex flex-col gap-1 rounded-lg border p-4 transition-colors',
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="font-semibold">{title ?? domain}</span>
        <ExternalLink className="text-muted-foreground size-3.5" />
      </div>
      {desc && <p className="text-muted-foreground text-sm">{desc}</p>}
      <span className="text-muted-foreground text-xs">{domain}</span>
    </a>
  );
}
