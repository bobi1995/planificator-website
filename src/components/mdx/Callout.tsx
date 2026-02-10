import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'tip';

const calloutStyles: Record<CalloutType, string> = {
  info: 'border-brand-300 bg-brand-50 text-brand-900',
  warning: 'border-yellow-300 bg-yellow-50 text-yellow-900',
  tip: 'border-green-300 bg-green-50 text-green-900',
};

const calloutLabels: Record<CalloutType, string> = {
  info: 'Info',
  warning: 'Warning',
  tip: 'Tip',
};

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
  title?: string;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 rounded-lg border-l-4 p-4 not-prose',
        calloutStyles[type]
      )}
    >
      <p className="mb-1 text-sm font-semibold">{title || calloutLabels[type]}</p>
      <div className="text-sm">{children}</div>
    </div>
  );
}
