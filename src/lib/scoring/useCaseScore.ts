import type { Product } from '~/lib/schema/product';
import { deriveKeyboardFactors, deriveMonitorFactors, deriveMouseFactors } from './deriveMetrics';

/**
 * Step 2 of the Product Intelligence Framework (README mục 9):
 *   Derived Metrics ──> Assessment ──> Context Score
 *
 * Context Score = weighted sum of the named factors from deriveMetrics.ts.
 * Every weight set below is exported and sums to 1.0 — nothing here is a
 * hidden multiplier (README mục 11: "Thuật toán trọng số công khai thay vì
 * thuật toán hộp đen"). To retune a use case, edit its weight object; to add
 * a new factor, add it in deriveMetrics.ts first, then reference it here.
 */

export interface UseCaseScores {
  programming: number;
  gaming: number;
  office: number;
  design: number;
}

function weightedScore(factors: Record<string, number>, weights: Record<string, number>): number {
  const sum = Object.entries(weights).reduce((total, [key, weight]) => total + (factors[key] ?? 0) * weight, 0);
  // Round to 1 decimal — scores are for humans to scan/compare, not to imply
  // more precision than the underlying spec sheet actually supports.
  return Math.round(sum * 10) / 10;
}

// ---- Monitor: Text Clarity, Screen Area, Eye Care, USB-C (README mục 9's
// own worked example for Programming names exactly these four factors). ----

const MONITOR_WEIGHTS: Record<keyof UseCaseScores, Record<string, number>> = {
  programming: { textClarity: 0.4, screenArea: 0.2, eyeCare: 0.2, usbConnectivity: 0.2 },
  gaming: { refreshResponsiveness: 0.6, screenArea: 0.25, textClarity: 0.15 },
  office: { screenArea: 0.35, eyeCare: 0.3, usbConnectivity: 0.2, textClarity: 0.15 },
  design: { colorAccuracy: 0.5, textClarity: 0.3, screenArea: 0.2 },
};

// ---- Keyboard: comfort/customizability matter most for daily typing; ----
// ---- gaming leans on connectivity latency instead.                   ----

const KEYBOARD_WEIGHTS: Record<keyof UseCaseScores, Record<string, number>> = {
  programming: { typingComfort: 0.45, customizability: 0.3, layoutSpaceEfficiency: 0.25 },
  gaming: { gamingResponsiveness: 0.55, typingComfort: 0.25, customizability: 0.2 },
  office: { typingComfort: 0.45, layoutSpaceEfficiency: 0.4, customizability: 0.15 },
  // Keyboards have no strong design-specific spec (unlike monitor color
  // accuracy or mouse precision) — weighted toward a tidy, personalizable
  // desk instead, which is the closest honest proxy we have.
  design: { typingComfort: 0.35, customizability: 0.3, layoutSpaceEfficiency: 0.35 },
};

// ---- Mouse: precision for gaming/design, comfort + productivity ----
// ---- features for all-day programming/office use.                ----

const MOUSE_WEIGHTS: Record<keyof UseCaseScores, Record<string, number>> = {
  programming: { comfort: 0.35, productivityFeatures: 0.35, latency: 0.3 },
  gaming: { precision: 0.5, latency: 0.3, comfort: 0.2 },
  office: { comfort: 0.35, productivityFeatures: 0.35, latency: 0.3 },
  design: { precision: 0.4, comfort: 0.35, productivityFeatures: 0.25 },
};

function scoreAllUseCases(
  factors: Record<string, number>,
  weights: Record<keyof UseCaseScores, Record<string, number>>
): UseCaseScores {
  return {
    programming: weightedScore(factors, weights.programming),
    gaming: weightedScore(factors, weights.gaming),
    office: weightedScore(factors, weights.office),
    design: weightedScore(factors, weights.design),
  };
}

/** Compute the four Context Scores (README mục 8 "Use Cases") for a product. */
export function computeUseCaseScores(product: Product): UseCaseScores {
  switch (product.category) {
    case 'monitor':
      return scoreAllUseCases(deriveMonitorFactors(product.specifications), MONITOR_WEIGHTS);
    case 'keyboard':
      return scoreAllUseCases(deriveKeyboardFactors(product.specifications), KEYBOARD_WEIGHTS);
    case 'mouse':
      return scoreAllUseCases(deriveMouseFactors(product.specifications), MOUSE_WEIGHTS);
  }
}
