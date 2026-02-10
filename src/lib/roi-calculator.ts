export type SchedulingMethod = 'excel' | 'whiteboard' | 'software' | 'none';

export interface ROIInputs {
  ordersPerWeek: number;
  schedulingHoursPerWeek: number;
  numberOfResources: number;
  currentMethod: SchedulingMethod;
}

export interface ROIResults {
  hoursSavedPerWeekMin: number;
  hoursSavedPerWeekMax: number;
  hoursSavedPerYearMin: number;
  hoursSavedPerYearMax: number;
  costSavingsPerYearMin: number;
  costSavingsPerYearMax: number;
  speedImprovementMin: number;
  speedImprovementMax: number;
}

// Efficiency gain ranges by current scheduling method
const EFFICIENCY_GAINS: Record<SchedulingMethod, [number, number]> = {
  excel: [0.60, 0.75],
  whiteboard: [0.70, 0.85],
  software: [0.40, 0.55],
  none: [0.75, 0.90],
};

// Complexity modifier based on number of production resources
function getComplexityModifier(resources: number): number {
  if (resources <= 10) return 0.85;
  if (resources <= 50) return 1.0;
  return 1.1; // 51+
}

// Volume modifier based on orders per week
function getVolumeModifier(orders: number): number {
  if (orders <= 50) return 0.9;
  if (orders <= 150) return 1.0;
  if (orders <= 300) return 1.05;
  return 1.1; // 300+
}

const WORKING_WEEKS_PER_YEAR = 50;
const DEFAULT_HOURLY_RATE_EUR = 35;

/**
 * Calculate estimated ROI from switching to Planifactor.
 *
 * Design principles:
 * - Returns RANGES, not single numbers
 * - Caps weekly savings at 80% of input hours (never claim 100% elimination)
 * - Caps speed improvement at 10x
 * - Uses conservative multipliers throughout
 */
export function calculateROI(inputs: ROIInputs): ROIResults {
  const { ordersPerWeek, schedulingHoursPerWeek, numberOfResources, currentMethod } = inputs;

  const [gainMin, gainMax] = EFFICIENCY_GAINS[currentMethod];
  const complexityMod = getComplexityModifier(numberOfResources);
  const volumeMod = getVolumeModifier(ordersPerWeek);

  // Raw hours saved per week
  let rawMin = schedulingHoursPerWeek * gainMin * complexityMod * volumeMod;
  let rawMax = schedulingHoursPerWeek * gainMax * complexityMod * volumeMod;

  // Cap at 80% of input hours (never claim total elimination)
  const cap = schedulingHoursPerWeek * 0.8;
  rawMin = Math.min(rawMin, cap);
  rawMax = Math.min(rawMax, cap);

  // Round to 1 decimal
  const hoursSavedPerWeekMin = Math.round(rawMin * 10) / 10;
  const hoursSavedPerWeekMax = Math.round(rawMax * 10) / 10;

  // Annual projection (50 working weeks)
  const hoursSavedPerYearMin = Math.round(hoursSavedPerWeekMin * WORKING_WEEKS_PER_YEAR);
  const hoursSavedPerYearMax = Math.round(hoursSavedPerWeekMax * WORKING_WEEKS_PER_YEAR);

  // Cost savings
  const costSavingsPerYearMin = hoursSavedPerYearMin * DEFAULT_HOURLY_RATE_EUR;
  const costSavingsPerYearMax = hoursSavedPerYearMax * DEFAULT_HOURLY_RATE_EUR;

  // Speed improvement factor: how many times faster
  // If you saved 75% of time, you're ~4x faster (1 / (1 - 0.75))
  // Cap at 10x
  const effectiveGainMin = Math.min(rawMin / schedulingHoursPerWeek, 0.8);
  const effectiveGainMax = Math.min(rawMax / schedulingHoursPerWeek, 0.8);
  const speedImprovementMin = Math.min(
    Math.round((1 / (1 - effectiveGainMin)) * 10) / 10,
    10
  );
  const speedImprovementMax = Math.min(
    Math.round((1 / (1 - effectiveGainMax)) * 10) / 10,
    10
  );

  return {
    hoursSavedPerWeekMin,
    hoursSavedPerWeekMax,
    hoursSavedPerYearMin,
    hoursSavedPerYearMax,
    costSavingsPerYearMin,
    costSavingsPerYearMax,
    speedImprovementMin,
    speedImprovementMax,
  };
}
