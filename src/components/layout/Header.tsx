'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {usePathname} from '@/i18n/navigation';
import {Link} from '@/i18n/navigation';
import {Logo} from '@/components/brand/Logo';
import {Button} from '@/components/ui/button';
import {LanguageSwitcher} from '@/components/layout/LanguageSwitcher';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useAnalytics} from '@/lib/use-analytics';

const navLinks = [
  {href: '/features', key: 'features'},
  {href: '/use-cases', key: 'useCases'},
  {href: '/pricing', key: 'pricing'},
  {href: '/about', key: 'about'},
  {href: '/blog', key: 'blog'},
  {href: '/contact', key: 'contact'},
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const plausible = useAnalytics();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Logo size="sm" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map(({href, key}) => (
            <Link
              key={key}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground',
                isActive(href)
                  ? 'text-brand-600 font-semibold'
                  : 'text-muted-foreground'
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Desktop right: language switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild>
            <Link href="/contact" onClick={() => plausible('Demo Request Click', {props: {location: 'header'}})}>{t('requestDemo')}</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
              {navLinks.map(({href, key}) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={cn(
                    'text-lg font-medium',
                    isActive(href) && 'text-brand-600'
                  )}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <LanguageSwitcher />
            </div>
            <div className="mt-4">
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => { setMobileOpen(false); plausible('Demo Request Click', {props: {location: 'header-mobile'}}); }}>
                  {t('requestDemo')}
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
