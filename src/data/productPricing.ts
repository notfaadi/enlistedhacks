export type ProductPlanId = 'weekly' | 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  /** Secondary line under the label (e.g. "7 days"). */
  subtitle?: string;
  priceUsd: number;
  priceNote: string;
  badge?: 'popular';
}

const cloudDmaPlans: ProductPlan[] = [
  { id: 'weekly', label: '1 Week', subtitle: '7 days', priceUsd: 15, priceNote: 'USD · 7 days' },
  {
    id: 'monthly',
    label: '1 Month',
    subtitle: '30 days',
    priceUsd: 35,
    priceNote: 'USD · 30 days',
    badge: 'popular',
  },
  { id: 'lifetime', label: 'Lifetime', subtitle: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time' },
];

const standardPlans: ProductPlan[] = [
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / month' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time' },
];

const ugcPlans: ProductPlan[] = [
  { id: 'onetime', label: 'One-time access', priceUsd: 50, priceNote: 'USD · one-time' },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'ugc') return ugcPlans;
  if (productSlug === 'cloud-dma') return cloudDmaPlans;
  return standardPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd.toFixed(2)}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}
