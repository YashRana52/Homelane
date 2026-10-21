/**
 * Indian-format currency helpers.
 *
 * Interior pricing is always quoted in the lakh system, so 526000 must read
 * as "5,26,000" and not "526,000". Intl with the en-IN locale does the
 * grouping correctly.
 */

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** 526000 → "₹5,26,000" */
export function formatINR(amount: number): string {
  return inr.format(amount);
}

/** 526000 → "5,26,000" (no symbol, for use beside a separate ₹ glyph) */
export function formatIndianNumber(amount: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

/**
 * Compact lakh/crore form for headline prices.
 * 357000 → "₹3.57 L"   ·   12500000 → "₹1.25 Cr"
 */
export function formatLakh(amount: number): string {
  if (amount >= 10_000_000) {
    return `₹${(amount / 10_000_000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100_000) {
    return `₹${(amount / 100_000).toFixed(2).replace(/\.00$/, '')} L`;
  }
  return formatINR(amount);
}

/** 55000 → "55,000+" for stat strips. */
export function formatStat(value: number): string {
  if (value >= 100_000) {
    const lakhs = value / 100_000;
    return `${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)} Lakh+`;
  }
  return `${formatIndianNumber(value)}+`;
}

/**
 * Monthly EMI at a flat rate, used for the "EMIs as low as ₹3,300/month"
 * line on design cards and the estimate result.
 */
export function estimateEMI(principal: number, months = 24, annualRatePct = 12): number {
  const r = annualRatePct / 100 / 12;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(emi / 100) * 100;
}
