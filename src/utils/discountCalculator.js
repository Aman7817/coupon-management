export function calculateDiscount(coupon, cartValue) {
  if (!coupon) return 0;
  if (coupon.discountType === 'FLAT') {
    return Math.min(coupon.discountValue, cartValue);
  }
  // PERCENT
  const raw = (coupon.discountValue / 100) * cartValue;
  if (coupon.maxDiscountAmount != null) {
    return Math.min(raw, coupon.maxDiscountAmount);
  }
  return raw;
}
