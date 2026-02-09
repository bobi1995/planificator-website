'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguageSwitcher');

  function switchLocale(newLocale: string) {
    router.replace(pathname, {locale: newLocale});
  }

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          disabled={loc === locale}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            loc === locale
              ? 'bg-primary text-primary-foreground font-semibold cursor-default'
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
