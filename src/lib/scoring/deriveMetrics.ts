import type { KeyboardProduct, MonitorProduct, MouseProduct } from '~/lib/schema/product';

/**
 * Step 1 of the Product Intelligence Framework (README mục 9):
 *   Raw Specification ──> Derived Metrics ──> Assessment ──> Context Score
 *
 * This file does "Derived Metrics ──> Assessment": it turns raw spec values
 * into named 0–10 factor scores. Each factor is a small, named, independently
 * readable number — never a hidden intermediate — so the weighted formulas in
 * `useCaseScore.ts` stay auditable end to end (README mục 11: "Deterministic
 * Matching", no black-box scoring).
 */

/** Clamp `value` to [0, 10] after linearly mapping [min, max] -> [0, 10]. */
function normalize(value: number, min: number, max: number): number {
  const ratio = (value - min) / (max - min);
  return Math.max(0, Math.min(10, ratio * 10));
}

// ---- Monitor ---------------------------------------------------------

export interface MonitorFactors {
  // Index signature so this satisfies Record<string, number> for
  // weightedScore() in useCaseScore.ts, while keeping named properties below
  // for readability/autocomplete at the derive call sites.
  [factor: string]: number;
  /** PPI-based: how crisp text renders (README mục 9's own worked example). */
  textClarity: number;
  /** Diagonal size: multitasking / real-estate. */
  screenArea: number;
  /** Refresh rate: motion smoothness for gaming. */
  refreshResponsiveness: number;
  /** Best available color gamut coverage (DCI-P3 preferred, falls back to sRGB). */
  colorAccuracy: number;
  /** USB-C + Power Delivery: single-cable laptop docking. */
  usbConnectivity: number;
  /** Flicker-free + low blue light: comfort over long sessions. */
  eyeCare: number;
}

export function deriveMonitorFactors(specs: MonitorProduct['specifications']): MonitorFactors {
  const ppi = Math.sqrt(specs.resolution.width ** 2 + specs.resolution.height ** 2) / specs.sizeInches;

  const gamutPercent = specs.colorGamutPercent?.dciP3 ?? specs.colorGamutPercent?.srgb ?? 0;

  const usbConnectivity = !specs.usbC.present ? 0 : (specs.usbC.powerDeliveryWatts ?? 0) >= 60 ? 10 : 6;

  const eyeCare = (specs.eyeCare?.flickerFree ? 5 : 0) + (specs.eyeCare?.lowBlueLight ? 5 : 0);

  return {
    textClarity: normalize(ppi, 60, 120),
    screenArea: normalize(specs.sizeInches, 21, 34),
    refreshResponsiveness: normalize(specs.refreshRateHz, 60, 240),
    colorAccuracy: normalize(gamutPercent, 60, 100),
    usbConnectivity,
    eyeCare,
  };
}

// ---- Keyboard ----------------------------------------------------------

export interface KeyboardFactors {
  [factor: string]: number;
  /** Switch feel + wrist support + split/tenting. */
  typingComfort: number;
  /** Smaller layout = more free desk space. */
  layoutSpaceEfficiency: number;
  /** Wired/2.4GHz beats Bluetooth-only for perceived input latency. */
  gamingResponsiveness: number;
  /** Hot-swap sockets = tune/replace switches without soldering. */
  customizability: number;
}

const KEYBOARD_LAYOUT_SPACE_SCORE: Record<KeyboardProduct['specifications']['layout'], number> = {
  '60%': 10,
  '65%': 9,
  '75%': 8,
  Alice: 7,
  Split: 5,
  TKL: 6,
  'Full-size': 3,
};

export function deriveKeyboardFactors(specs: KeyboardProduct['specifications']): KeyboardFactors {
  const switchComfortBase = specs.switchType === 'membrane' ? 1 : 4;
  const typingComfort =
    switchComfortBase +
    (specs.ergonomics?.wristRestIncluded ? 3 : 0) +
    (specs.ergonomics?.splitDesign || specs.ergonomics?.tentable ? 3 : 0);

  const gamingResponsiveness = specs.connectivity.includes('USB-C wired')
    ? 10
    : specs.connectivity.includes('2.4GHz wireless')
      ? 8
      : 5;

  return {
    typingComfort: Math.min(10, typingComfort),
    layoutSpaceEfficiency: KEYBOARD_LAYOUT_SPACE_SCORE[specs.layout],
    gamingResponsiveness,
    customizability: specs.hotSwappable ? 10 : 4,
  };
}

// ---- Mouse ---------------------------------------------------------------

export interface MouseFactors {
  [factor: string]: number;
  /** DPI headroom for precise cursor control. */
  precision: number;
  /** Lighter = more comfortable to hold/move over long sessions. */
  comfort: number;
  /** Best available connectivity option's perceived input latency. */
  latency: number;
  /** Count of documented productivity features (gestures, app switching...). */
  productivityFeatures: number;
}

export function deriveMouseFactors(specs: MouseProduct['specifications']): MouseFactors {
  const latency = specs.connectivity.includes('wired') ? 10 : specs.connectivity.includes('2.4GHz wireless') ? 9 : 6;

  return {
    // Ceiling at 12000, not the 20000+ competitive-gaming DPI ceiling: this
    // catalog targets productivity/creator mice, where meaningful
    // differentiation happens well below esports-tier DPI.
    precision: normalize(specs.dpiMax, 800, 12000),
    comfort: normalize(120 - specs.weightGrams, 0, 60),
    latency,
    productivityFeatures: normalize(specs.productivityFeatures?.length ?? 0, 0, 4),
  };
}
