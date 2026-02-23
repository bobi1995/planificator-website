import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-brand-600 mb-4">404</p>
        <h1 className="text-display mb-4">{t('title')}</h1>
        <p className="text-body-lg text-muted-foreground mb-8 max-w-md mx-auto">
          {t('description')}
        </p>
        <Button asChild size="lg">
          <Link href="/">{t('backHome')}</Link>
        </Button>
      </div>
    </section>
  );
}
