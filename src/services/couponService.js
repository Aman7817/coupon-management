import { v4 as uuidv4 } from 'uuid';
import store from '../database/store.js';
import { validateCouponInput } from '../utils/validators.js';
import { calculateDiscount } from '../utils/discountCalculator.js';
import { computeCartValue, totalItemsCount, categoriesInCart } from '../utils/cartUtils.js';




/**
 * addCoupon - adds coupon to in-memory store
 * Rejects duplicate 'code' (case-insensitive).
 */
export function redeemCoupon(userId, couponCode) {
  if (!userId || !couponCode) {
    const err = new Error("userId and couponCode are required.");
    err.code = "INVALID_INPUT";
    throw err;
  }

  const userKey = `${userId}:${couponCode}`;
  store.userUsage[userKey] = (store.userUsage[userKey] || 0) + 1;

  return {
    message: "Coupon redeemed successfully",
    usageCount: store.userUsage[userKey]
  };
}


export function addCoupon(coupon) {
  validateCouponInput(coupon);

  const code = coupon.code.trim();
  // duplicate check (case-insensitive)
  const exists = store.coupons.find(c => c.code.toLowerCase() === code.toLowerCase());
  if (exists) {
    const err = new Error(`Coupon with code '${code}' already exists.`);
    err.code = 'DUPLICATE';
    throw err;
  }

  const now = new Date().toISOString();
  const newCoupon = {
    id: uuidv4(),
    ...coupon,
    code,
    createdAt: now
  };
  store.coupons.push(newCoupon);
  return newCoupon;
}

export function getAllCoupons() {
  return store.coupons;
}

/**
 * findBestCoupon - main logic:
 * - evaluates eligibility
 * - calculates discount
 * - picks best by rule
 */
export function findBestCoupon(user, cart) {
  const now = new Date();
  const cartValue = computeCartValue(cart);
  const itemsCount = totalItemsCount(cart);
  const categories = categoriesInCart(cart);

  const eligibleWithDiscount = [];

  for (const coupon of store.coupons) {
    // date check
    const start = coupon.startDate ? new Date(coupon.startDate) : null;
    const end = coupon.endDate ? new Date(coupon.endDate) : null;
    if (start && now < start) continue;
    if (end && now > end) continue;

    // usageLimitPerUser check
    if (coupon.usageLimitPerUser != null) {
      const userKey = `${user.userId}:${coupon.code}`;
      const used = store.userUsage[userKey] || 0;
      if (used >= coupon.usageLimitPerUser) continue;
    }

    // eligibility checks
    const elig = coupon.eligibility || {};

    // user-based checks
    if (elig.allowedUserTiers && elig.allowedUserTiers.length > 0) {
      if (!elig.allowedUserTiers.includes(user.userTier)) continue;
    }
    if (elig.minLifetimeSpend != null) {
      if ((user.lifetimeSpend || 0) < elig.minLifetimeSpend) continue;
    }
    if (elig.minOrdersPlaced != null) {
      if ((user.ordersPlaced || 0) < elig.minOrdersPlaced) continue;
    }
    if (elig.firstOrderOnly === true) {
      if ((user.ordersPlaced || 0) > 0) continue;
    }
    if (elig.allowedCountries && elig.allowedCountries.length > 0) {
      if (!elig.allowedCountries.includes(user.country)) continue;
    }

    // cart-based checks
    if (elig.minCartValue != null) {
      if (cartValue < elig.minCartValue) continue;
    }
    if (elig.minItemsCount != null) {
      if (itemsCount < elig.minItemsCount) continue;
    }
    if (elig.excludedCategories && elig.excludedCategories.length > 0) {
      const hasExcluded = categories.some(cat => elig.excludedCategories.includes(cat));
      if (hasExcluded) continue;
    }
    if (elig.applicableCategories && elig.applicableCategories.length > 0) {
      const hasApplicable = categories.some(cat => elig.applicableCategories.includes(cat));
      if (!hasApplicable) continue;
    }

    // If reached here, it's eligible — compute discount
    const discount = calculateDiscount(coupon, cartValue);

    if (discount <= 0) continue;

    eligibleWithDiscount.push({
      coupon,
      discount
    });
  }

  if (eligibleWithDiscount.length === 0) {
    return { bestCoupon: null, discount: 0, cartValue };
  }

  // pick best: highest discount, then earliest endDate, then lexicographically smaller code
  eligibleWithDiscount.sort((a, b) => {
    if (b.discount !== a.discount) return b.discount - a.discount;
    const aEnd = a.coupon.endDate ? new Date(a.coupon.endDate) : new Date(8640000000000000);
    const bEnd = b.coupon.endDate ? new Date(b.coupon.endDate) : new Date(8640000000000000);
    if (aEnd.getTime() !== bEnd.getTime()) return aEnd - bEnd;
    return a.coupon.code.localeCompare(b.coupon.code);
  });

  const winner = eligibleWithDiscount[0];

  // NOTE: we DO NOT increment usage here automatically; assignment doesn't require persistent usage updates on best-call.
  // If you'd like to mark usage upon "redeem", implement a redeem API that increments store.userUsage.

  return {
    bestCoupon: winner.coupon,
    discount: Number(winner.discount.toFixed(2)),
    cartValue
  };
}

/**
 * For testing: reset store
 */
export function resetAll() {
  store.coupons.length = 0;
  store.userUsage = {};
}
