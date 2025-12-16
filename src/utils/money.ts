export function toCents(value: number): number {
  return Math.trunc(value * 100);
}

export function calcDiscountedCents(
  priceCents: number,
  discount: number
): number {
  return Math.trunc((priceCents * (100 - discount)) / 100);
}

export function formatMoney(cents: number): string {
  if (cents <= 0) return "Free";
  return (cents / 100).toFixed(2) + "$";
}
