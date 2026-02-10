import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Check} from 'lucide-react';
import {cn} from '@/lib/utils';

interface PricingTierCardProps {
  name: string;
  description: string;
  cta: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
}

export function PricingTierCard({
  name,
  description,
  cta,
  features,
  badge,
  highlighted = false,
}: PricingTierCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-8 flex flex-col h-full',
        highlighted
          ? 'border-brand-600 border-2 shadow-lg relative'
          : 'border-border'
      )}
    >
      {badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 hover:bg-brand-600 text-white">
          {badge}
        </Badge>
      )}
      <h3 className="text-heading mb-2">{name}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-brand-600 mt-0.5 shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        className="w-full"
        variant={highlighted ? 'default' : 'outline'}
      >
        <Link href="/contact">{cta}</Link>
      </Button>
    </div>
  );
}
