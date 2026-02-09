import {getTranslations} from 'next-intl/server';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

/**
 * Social Proof section — company logos and testimonial cards.
 *
 * Renders a "Trusted by" logo grid (6 company names as styled text)
 * followed by 3 testimonial cards with quote, attribution, and
 * avatar with initials fallback.
 *
 * Async server component using next-intl getTranslations.
 */
export async function SocialProof() {
  const t = await getTranslations('SocialProof');

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Company logo grid */}
        <div className="text-center mb-16">
          <p className="text-label uppercase tracking-wider text-muted-foreground mb-8">
            {t('trustedBy')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="text-lg font-semibold text-muted-foreground/50"
              >
                {t(`companies.${i}`)}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <blockquote className="text-foreground mb-6">
                &ldquo;{t(`testimonials.${i}.quote`)}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-brand-100 text-brand-700 text-sm font-semibold">
                    {t(`testimonials.${i}.name`)
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">
                    {t(`testimonials.${i}.name`)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t(`testimonials.${i}.title`)},{' '}
                    {t(`testimonials.${i}.company`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
