import { cn } from '@/lib/utils';
import { AlertTriangle, Info, Lightbulb, OctagonAlert } from 'lucide-react';
import React from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

const calloutConfig: Record<
  CalloutType,
  { icon: React.ElementType; className: string }
> = {
  info: {
    icon: Info,
    className:
      'border-blue-500/30 bg-blue-500/10 text-blue-950 dark:text-blue-100',
  },
  warning: {
    icon: AlertTriangle,
    className:
      'border-yellow-500/30 bg-yellow-500/10 text-yellow-950 dark:text-yellow-100',
  },
  tip: {
    icon: Lightbulb,
    className:
      'border-green-500/30 bg-green-500/10 text-green-950 dark:text-green-100',
  },
  danger: {
    icon: OctagonAlert,
    className: 'border-red-500/30 bg-red-500/10 text-red-950 dark:text-red-100',
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Callout({
  type = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type] ?? calloutConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'my-6 flex gap-3 rounded-lg border p-4',
        config.className,
        className,
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-sm leading-6 [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
