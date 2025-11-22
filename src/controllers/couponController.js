import {
  addCoupon,
  getAllCoupons,
  findBestCoupon,
  resetAll
   
} from '../services/couponService.js';

import { redeemCoupon } from '../services/couponService.js';

export async function createCoupon(req, res) {
  try {
    const coupon = req.body;
    const created = addCoupon(coupon);
    return res.status(201).json({ success: true, coupon: created });
  } catch (err) {
    if (err?.code === 'DUPLICATE') {
      return res.status(409).json({ success: false, message: err.message });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
}

export async function listCoupons(req, res) {
  const coupons = getAllCoupons();
  return res.json({ success: true, coupons });
}

export async function getBestCoupon(req, res) {
  try {
    const { user, cart } = req.body;
    if (!user || !cart) {
      return res.status(400).json({ success: false, message: 'user and cart required' });
    }
    const result = findBestCoupon(user, cart);
    return res.json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function resetStore(req, res) {
  resetAll();
  return res.json({ success: true, message: 'store reset' });
}




export async function RedeemCoupon(req, res) {
  try {
    const { userId, couponCode } = req.body;

    if (!userId || !couponCode) {
      return res.status(400).json({
        success: false,
        message: "userId and couponCode are required"
      });
    }

    const result = redeemCoupon(userId, couponCode);
    return res.json({ success: true, result });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      code: err.code || "REDEEM_FAILED"
    });
  }
}
