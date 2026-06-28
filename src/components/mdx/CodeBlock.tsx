import { cn } from '@/lib/utils';
import React from 'react';

interface CodeBlockProps {
  language?: string;
  filename?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({
  language,
  filename,
  children,
  className,
}: CodeBlockProps) {
  return (
    <div className={cn('my-6 overflow-hidden rounded-lg border', className)}>
      {(filename || language) && (
        <div className="bg-muted/50 text-muted-foreground flex items-center gap-2 border-b px-4 py-2 text-xs">
          {filename && (
            <span className="font-mono font-medium">{filename}</span>
          )}
          {language && !filename && (
            <span className="font-mono uppercase">{language}</span>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm">{children}</pre>
    </div>
  );
}
