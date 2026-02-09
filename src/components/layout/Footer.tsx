import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Logo} from '@/components/brand/Logo';
import {LanguageSwitcher} from '@/components/layout/LanguageSwitcher';

const productLinks = [
  {href: '/features', key: 'features'},
  {href: '/use-cases', key: 'useCases'},
  {href: '/pricing', key: 'pricing'},
] as const;

const companyLinks = [
  {href: '/about', key: 'about'},
  {href: '/blog', key: 'blog'},
  {href: '/contact', key: 'contact'},
] as const;

const legalLinks = [
  {href: '/privacy', key: 'privacy'},
  {href: '/terms', key: 'terms'},
] as const;

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="border-t bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <Logo size="sm" />
            <p className="mt-4 text-sm text-muted-foreground">
              {t('tagline')}
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{t('product')}</h3>
            <ul className="space-y-2">
              {productLinks.map(({href, key}) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{t('company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map(({href, key}) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mt-4">
              {legalLinks.map(({href, key}) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{t('contactTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@planifactor.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('email')}
                </a>
              </li>
              <li>
                <a
                  href="tel:+35921234567"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/planifactor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('linkedin')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t('copyright')}</p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
