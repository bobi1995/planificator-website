import {cn} from '@/lib/utils';

interface MetricCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  variant: 'before' | 'after';
}

export function MetricCard({value, label, icon, variant}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4 text-center',
        variant === 'before'
          ? 'bg-red-50 border-red-200'
          : 'bg-brand-50 border-brand-200'
      )}
    >
      <div
        className={cn(
          'mx-auto mb-2 [&>svg]:h-8 [&>svg]:w-8',
          variant === 'before' ? 'text-red-400' : 'text-brand-600'
        )}
      >
        {icon}
      </div>
      <div
        className={cn(
          'text-2xl md:text-3xl font-bold',
          variant === 'before' ? 'text-red-600' : 'text-brand-700'
        )}
      >
        {value}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
