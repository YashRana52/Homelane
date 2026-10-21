/**
 * Mock pricing engine.
 *
 * Deterministic: the same selections always produce the same number, which is
 * what makes a calculator feel trustworthy rather than random. Real quoting
 * happens on a backend this project does not have, so the rates below are
 * plausible Indian market figures rather than a live price list — every
 * surface that shows them carries an asterisk.
 */

export type LineItem = {
  id: string;
  label: string;
  /** What drives the number, e.g. "18 running feet × ₹1,850". */
  detail?: string;
  amount: number;
};

export type Estimate = {
  lineItems: LineItem[];
  subtotal: number;
  /** Quoted as a band, because a single rupee figure implies false precision. */
  low: number;
  high: number;
  /** Rate per square foot of carpet area, when an area is known. */
  perSqft?: number;
};

export type PricingInput = {
  /** Running feet of cabinetry, or carpet area for a full home. */
  primaryQuantity: number;
  /** Secondary dimension — height for a wardrobe, depth for a kitchen. */
  secondaryQuantity?: number;
  /** Multiplier for the chosen layout. */
  layoutFactor: number;
  layoutLabel: string;
  /** Base rate per unit for the chosen material. */
  materialRate: number;
  materialLabel: string;
  /** Flat-priced extras, already filtered to the chosen ones. */
  extras: { id: string; label: string; price: number }[];
  /** Carpet area, when the calculator collects one. */
  areaSqft?: number;
  unitLabel: string;
};

/** Spread of the quoted band, either side of the computed subtotal. */
const BAND = 0.08;

export function computeEstimate(input: PricingInput): Estimate {
  const {
    primaryQuantity,
    layoutFactor,
    layoutLabel,
    materialRate,
    materialLabel,
    extras,
    areaSqft,
    unitLabel,
  } = input;

  const cabinetry = Math.round(primaryQuantity * materialRate * layoutFactor);

  const lineItems: LineItem[] = [
    {
      id: 'cabinetry',
      label: `${materialLabel} units — ${layoutLabel}`,
      detail: `${primaryQuantity} ${unitLabel} × ${formatRate(materialRate)}${
        layoutFactor !== 1 ? ` × ${layoutFactor} layout factor` : ''
      }`,
      amount: cabinetry,
    },
    ...extras.map((extra) => ({
      id: extra.id,
      label: extra.label,
      amount: extra.price,
    })),
  ];

  // Design, project management and installation, as a share of the works.
  const service = Math.round(cabinetry * 0.12);
  lineItems.push({
    id: 'service',
    label: 'Design, project management and installation',
    detail: '12% of works',
    amount: service,
  });

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return {
    lineItems,
    subtotal,
    low: roundTo(subtotal * (1 - BAND), 1000),
    high: roundTo(subtotal * (1 + BAND), 1000),
    perSqft: areaSqft && areaSqft > 0 ? Math.round(subtotal / areaSqft) : undefined,
  };
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function formatRate(rate: number): string {
  return `₹${rate.toLocaleString('en-IN')}`;
}
