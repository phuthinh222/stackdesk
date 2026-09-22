import { z } from 'astro/zod';

/**
 * Product Data Node — see README.md mục 8 (Kiến trúc Dữ liệu Sản phẩm).
 *
 *   Product Data Node
 *    ├── Identity       (ID, Slug, Name, Brand, SKU)
 *    ├── Category       (Monitor, Keyboard, Mouse)
 *    ├── Specifications (Discriminated Union Schema by Category)
 *    ├── Tags           (#macbook-setup, #budget-under-300, #minimalist)
 *    ├── Use Cases      (Scores: Programming, Gaming, Office, Design)
 *    ├── Editorial      (Verdict, Summary, Pros, Cons, Best For)
 *    ├── Scoring        (Weighted Formula Score)
 *    └── Commerce       (Provider, Type: Affiliate/Direct, Price, Status)
 *
 * Three deliberate deviations from that literal list:
 *
 * 1. Identity's ID/Slug aren't duplicated in frontmatter. The `glob()`
 *    loader in content.config.ts already derives a stable `id` for each
 *    entry from its file path (e.g. `monitors/lg-27gp850`), and that IS
 *    the slug. Repeating it as a frontmatter field would give two sources
 *    of truth that can drift apart.
 *
 * 2. `Use Cases` (Programming/Gaming/Office/Design scores) is NOT authored
 *    here either. README mục 9's own worked example says the Programming
 *    Score is itself "công thức tổng hợp trọng số giữa Text Clarity, Screen
 *    Area, Ergonomics, Connectivity" — i.e. computed from `specifications`,
 *    not typed in by an editor. See `lib/scoring/useCaseScore.ts` for the
 *    public weighted formula (`computeUseCaseScores(product)`).
 *
 * 3. `Scoring` (the overall Weighted Formula Score) is NOT part of this
 *    schema either, for the same reason: it's derived from `specifications`
 *    (via `useCases`), computed by the scoring engine (todo.md Giai đoạn 3,
 *    not built yet), not hand-authored content.
 */

// ---- Category ------------------------------------------------------------

export const PRODUCT_CATEGORIES = ['monitor', 'keyboard', 'mouse'] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// ---- Shared sub-schemas ----------------------------------------------------

/** `#kebab-case` tags, e.g. `#macbook-setup`, `#budget-under-300` (README mục 8). */
const tagSchema = z
  .string()
  .regex(/^#[a-z0-9]+(-[a-z0-9]+)*$/, 'Tags must look like #kebab-case, e.g. #budget-under-300');

const editorialSchema = z.object({
  verdict: z.string(),
  summary: z.string(),
  pros: z.array(z.string()).min(1),
  cons: z.array(z.string()).min(1),
  bestFor: z.array(z.string()).min(1),
});

/**
 * Product images (README mục 5's "Nguồn ảnh sản phẩm" decision, todo.md
 * Giai đoạn 0): sourced, not self-shot. `retailer-hotlink` (default) links
 * directly to a retailer-hosted image URL (e.g. Amazon's product image CDN —
 * permitted under the Amazon Associates program, and needs no local asset
 * pipeline). `press-kit` is available for the rarer case of a downloaded/
 * self-hosted brand press image — point `url` at the local asset path then.
 */
const productImageSchema = z.object({
  url: z.url(),
  alt: z.string(),
  source: z.enum(['retailer-hotlink', 'press-kit']).default('retailer-hotlink'),
});

/** One retailer offer. An array because README mục 7 names several possible
 *  outlets (Amazon, Shopify Store, local dealers) for the same product. */
const commerceOfferSchema = z.object({
  provider: z.string(),
  type: z.enum(['affiliate', 'direct']),
  price: z.number().positive(),
  currency: z.string().default('USD'),
  url: z.url(),
  status: z.enum(['in-stock', 'out-of-stock', 'discontinued']),
});

// ---- Specifications per category (the discriminated union) ---------------

const monitorSpecsSchema = z.object({
  // 'IPS Black' is a distinct, commonly-marketed contrast-enhanced IPS
  // variant (~2000:1 vs ~1000:1 typical IPS) — kept separate from 'IPS'
  // rather than lossy-mapped, since it's a real differentiator. Fast-IPS
  // variants (e.g. "SS IPS") are still just 'IPS' — refreshRateHz already
  // captures the speed signal, no separate contrast characteristic.
  panelType: z.enum(['IPS', 'IPS Black', 'VA', 'TN', 'OLED', 'Mini-LED']),
  sizeInches: z.number().positive(),
  resolution: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
  refreshRateHz: z.number().positive(),
  colorGamutPercent: z
    .object({
      srgb: z.number().min(0).max(100).optional(),
      dciP3: z.number().min(0).max(100).optional(),
    })
    .optional(),
  usbC: z.object({
    present: z.boolean(),
    powerDeliveryWatts: z.number().nonnegative().optional(),
  }),
  /** Built-in KVM switch (swap the same monitor between two host machines). */
  hasKvm: z.boolean().optional(),
  eyeCare: z
    .object({
      flickerFree: z.boolean().optional(),
      lowBlueLight: z.boolean().optional(),
    })
    .optional(),
  ports: z.array(z.string()).optional(),
});

const keyboardSpecsSchema = z.object({
  layout: z.enum(['60%', '65%', '75%', 'TKL', 'Full-size', 'Alice', 'Split']),
  switchType: z.enum(['mechanical', 'optical', 'membrane', 'hall-effect']),
  switchBrand: z.string().optional(),
  hotSwappable: z.boolean(),
  connectivity: z.array(z.enum(['USB-C wired', 'Bluetooth', '2.4GHz wireless'])).min(1),
  backlighting: z.enum(['none', 'single-color', 'RGB']),
  ergonomics: z
    .object({
      splitDesign: z.boolean().optional(),
      tentable: z.boolean().optional(),
      wristRestIncluded: z.boolean().optional(),
    })
    .optional(),
});

const mouseSpecsSchema = z.object({
  sensorType: z.enum(['optical', 'laser']),
  dpiMax: z.number().positive(),
  weightGrams: z.number().positive(),
  gripStyle: z.array(z.enum(['palm', 'claw', 'fingertip'])).min(1),
  connectivity: z.array(z.enum(['wired', '2.4GHz wireless', 'Bluetooth'])).min(1),
  batteryLifeHours: z.number().positive().optional(),
  buttonsCount: z.number().int().positive(),
  productivityFeatures: z.array(z.string()).optional(),
});

// ---- Base fields shared by every category ---------------------------------

const baseProductSchema = z.object({
  identity: z.object({
    name: z.string(),
    brand: z.string(),
    sku: z.string().optional(),
  }),
  tags: z.array(tagSchema).default([]),
  images: z.array(productImageSchema).min(1),
  editorial: editorialSchema,
  commerce: z.array(commerceOfferSchema).min(1),
});

// ---- The discriminated union: category picks the specifications shape ----

export const monitorProductSchema = baseProductSchema.extend({
  category: z.literal('monitor'),
  specifications: monitorSpecsSchema,
});

export const keyboardProductSchema = baseProductSchema.extend({
  category: z.literal('keyboard'),
  specifications: keyboardSpecsSchema,
});

export const mouseProductSchema = baseProductSchema.extend({
  category: z.literal('mouse'),
  specifications: mouseSpecsSchema,
});

export const productSchema = z.discriminatedUnion('category', [
  monitorProductSchema,
  keyboardProductSchema,
  mouseProductSchema,
]);

export type Product = z.infer<typeof productSchema>;
export type MonitorProduct = z.infer<typeof monitorProductSchema>;
export type KeyboardProduct = z.infer<typeof keyboardProductSchema>;
export type MouseProduct = z.infer<typeof mouseProductSchema>;
