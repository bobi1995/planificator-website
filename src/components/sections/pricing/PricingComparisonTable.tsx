import {getTranslations} from 'next-intl/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Check, X} from 'lucide-react';

const CATEGORIES = [
  { key: 'scheduling', count: 9 },
  { key: 'resources', count: 6 },
  { key: 'operations', count: 4 },
  { key: 'admin', count: 2 },
  { key: 'support', count: 5 },
] as const;

export async function PricingComparisonTable() {
  const t = await getTranslations('PricingPage.comparison');

  function renderCell(value: unknown) {
    if (value === true) return <Check className="h-5 w-5 text-brand-600 mx-auto" />;
    if (value === false) return <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />;
    return <span className="text-sm font-medium">{String(value)}</span>;
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-heading md:text-display text-center mb-12">
          {t('title')}
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]"></TableHead>
                <TableHead className="text-center">{t('starter')}</TableHead>
                <TableHead className="text-center font-bold text-brand-600">{t('professional')}</TableHead>
                <TableHead className="text-center">{t('enterprise')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CATEGORIES.map(({key: category, count}) => (
                <>
                  <TableRow key={`${category}-header`} className="bg-muted/50">
                    <TableCell colSpan={4} className="font-semibold">
                      {t(`categories.${category}.title`)}
                    </TableCell>
                  </TableRow>
                  {Array.from({length: count}, (_, i) => {
                    const key = `categories.${category}.features.${i}` as const;
                    return (
                      <TableRow key={`${category}-${i}`}>
                        <TableCell>{t(`${key}.name`)}</TableCell>
                        <TableCell className="text-center">
                          {renderCell(t.raw(`${key}.starter`))}
                        </TableCell>
                        <TableCell className="text-center">
                          {renderCell(t.raw(`${key}.professional`))}
                        </TableCell>
                        <TableCell className="text-center">
                          {renderCell(t.raw(`${key}.enterprise`))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
