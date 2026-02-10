import {getTranslations} from 'next-intl/server';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

export async function TeamSection() {
  const t = await getTranslations('AboutPage.team');

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading md:text-display">
            {t('title')}
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="bg-brand-100 text-brand-700 text-xl font-semibold">
                  {t(`members.${i}.name`)
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">
                {t(`members.${i}.name`)}
              </h3>
              <p className="text-brand-600 text-sm font-medium mb-2">
                {t(`members.${i}.role`)}
              </p>
              <p className="text-muted-foreground text-sm">
                {t(`members.${i}.bio`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
