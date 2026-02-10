'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {Card, CardContent} from '@/components/ui/card';
import {Link} from '@/i18n/navigation';
import {calculateROI, type SchedulingMethod, type ROIResults} from '@/lib/roi-calculator';
import {Clock, TrendingUp, DollarSign, Zap} from 'lucide-react';

export function ROICalculator() {
  const t = useTranslations('ROICalculator');

  const [ordersPerWeek, setOrdersPerWeek] = useState<string>('');
  const [schedulingHours, setSchedulingHours] = useState<string>('');
  const [resources, setResources] = useState<string>('');
  const [currentMethod, setCurrentMethod] = useState<SchedulingMethod | ''>('');
  const [results, setResults] = useState<ROIResults | null>(null);

  const isValid =
    ordersPerWeek !== '' &&
    schedulingHours !== '' &&
    resources !== '' &&
    currentMethod !== '' &&
    Number(ordersPerWeek) > 0 &&
    Number(schedulingHours) > 0 &&
    Number(resources) > 0;

  function handleCalculate() {
    if (!isValid) return;
    const method = currentMethod as SchedulingMethod;
    const roi = calculateROI({
      ordersPerWeek: Number(ordersPerWeek),
      schedulingHoursPerWeek: Number(schedulingHours),
      numberOfResources: Number(resources),
      currentMethod: method,
    });
    setResults(roi);
  }

  function handleReset() {
    setOrdersPerWeek('');
    setSchedulingHours('');
    setResources('');
    setCurrentMethod('');
    setResults(null);
  }

  const methods: SchedulingMethod[] = ['excel', 'whiteboard', 'software', 'none'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input form */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orders per week */}
            <div className="space-y-2">
              <Label htmlFor="ordersPerWeek">{t('inputs.ordersPerWeek')}</Label>
              <Input
                id="ordersPerWeek"
                type="number"
                min={1}
                max={9999}
                placeholder="e.g. 50"
                value={ordersPerWeek}
                onChange={(e) => setOrdersPerWeek(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">{t('inputs.ordersPerWeekHelp')}</p>
            </div>

            {/* Scheduling hours */}
            <div className="space-y-2">
              <Label htmlFor="schedulingHours">{t('inputs.schedulingHours')}</Label>
              <Input
                id="schedulingHours"
                type="number"
                min={0.5}
                max={80}
                step={0.5}
                placeholder="e.g. 10"
                value={schedulingHours}
                onChange={(e) => setSchedulingHours(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">{t('inputs.schedulingHoursHelp')}</p>
            </div>

            {/* Number of resources */}
            <div className="space-y-2">
              <Label htmlFor="resources">{t('inputs.resources')}</Label>
              <Input
                id="resources"
                type="number"
                min={1}
                max={9999}
                placeholder="e.g. 20"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">{t('inputs.resourcesHelp')}</p>
            </div>

            {/* Current method */}
            <div className="space-y-2">
              <Label htmlFor="currentMethod">{t('inputs.currentMethod')}</Label>
              <Select
                value={currentMethod}
                onValueChange={(val) => setCurrentMethod(val as SchedulingMethod)}
              >
                <SelectTrigger id="currentMethod">
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {t(`inputs.methods.${method}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">{t('inputs.currentMethodHelp')}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button onClick={handleCalculate} disabled={!isValid} size="lg">
              {t('calculate')}
            </Button>
            {results && (
              <Button onClick={handleReset} variant="outline" size="lg">
                {t('reset')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="mt-8 space-y-8">
          <h2 className="text-heading text-center">{t('results.title')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Hours saved per week */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{t('results.hoursSavedWeek')}</p>
                <p className="text-display font-bold text-brand-600">
                  {results.hoursSavedPerWeekMin}-{results.hoursSavedPerWeekMax}
                </p>
                <p className="text-sm text-muted-foreground">{t('results.perWeek')}</p>
              </CardContent>
            </Card>

            {/* Hours saved per year */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{t('results.hoursSavedYear')}</p>
                <p className="text-display font-bold text-brand-600">
                  {results.hoursSavedPerYearMin}-{results.hoursSavedPerYearMax}
                </p>
                <p className="text-sm text-muted-foreground">{t('results.perYear')}</p>
              </CardContent>
            </Card>

            {/* Cost savings */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{t('results.costSavingsYear')}</p>
                <p className="text-display font-bold text-brand-600">
                  EUR {results.costSavingsPerYearMin.toLocaleString()}-{results.costSavingsPerYearMax.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{t('results.perYear')}</p>
              </CardContent>
            </Card>

            {/* Speed improvement */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <Zap className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{t('results.speedImprovement')}</p>
                <p className="text-display font-bold text-brand-600">
                  {results.speedImprovementMin}-{results.speedImprovementMax}x
                </p>
                <p className="text-sm text-muted-foreground">{t('results.fasterSuffix')}</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground text-center italic">
            {t('results.disclaimer')}
          </p>

          {/* Methodology accordion */}
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            <AccordionItem value="methodology">
              <AccordionTrigger>{t('methodology.title')}</AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground">
                <p>{t('methodology.description')}</p>
                <p>{t('methodology.conservative')}</p>
                <p>{t('methodology.factors')}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* CTA */}
          <Card className="bg-brand-50 border-brand-200">
            <CardContent className="pt-6 text-center">
              <h3 className="text-subheading mb-2">{t('cta.title')}</h3>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">{t('cta.description')}</p>
              <Button asChild size="lg">
                <Link href="/contact">{t('cta.button')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
