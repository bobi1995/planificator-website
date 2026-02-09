'use client';

import {ReactCompareSlider, ReactCompareSliderHandle} from 'react-compare-slider';
import {m, LazyMotion, domAnimation, useReducedMotion} from 'motion/react';
import {MetricCard} from './MetricCard';

interface Metric {
  label: string;
  before: string;
  after: string;
  icon: React.ReactNode;
}

interface ComparisonSliderProps {
  beforeLabel: string;
  afterLabel: string;
  metrics: Metric[];
}

const handleButtonStyle = {
  backdropFilter: undefined,
  background: 'oklch(0.546 0.245 262.881)',
  border: 0,
  color: '#fff',
};

export function ComparisonSlider({
  beforeLabel,
  afterLabel,
  metrics,
}: ComparisonSliderProps) {
  const shouldReduceMotion = useReducedMotion();

  const beforeContent = (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <h3 className="text-label text-red-500 uppercase tracking-wider mb-6 font-semibold">
        {beforeLabel}
      </h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            value={metric.before}
            label={metric.label}
            icon={metric.icon}
            variant="before"
          />
        ))}
      </div>
    </div>
  );

  const afterContent = (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <h3 className="text-label text-brand-600 uppercase tracking-wider mb-6 font-semibold">
        {afterLabel}
      </h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            value={metric.after}
            label={metric.label}
            icon={metric.icon}
            variant="after"
          />
        ))}
      </div>
    </div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={shouldReduceMotion ? false : {opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        {/* Desktop: vertical divider (landscape) */}
        <div className="hidden md:block">
          <ReactCompareSlider
            itemOne={beforeContent}
            itemTwo={afterContent}
            defaultPosition={50}
            handle={
              <ReactCompareSliderHandle
                buttonStyle={handleButtonStyle}
              />
            }
          />
        </div>

        {/* Mobile: horizontal divider (portrait) */}
        <div className="block md:hidden">
          <ReactCompareSlider
            itemOne={beforeContent}
            itemTwo={afterContent}
            portrait
            defaultPosition={50}
            handle={
              <ReactCompareSliderHandle
                buttonStyle={handleButtonStyle}
              />
            }
          />
        </div>
      </m.div>
    </LazyMotion>
  );
}
