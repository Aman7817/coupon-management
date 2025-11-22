import express from 'express';
import {
  createCoupon,
  listCoupons,
  getBestCoupon,
  resetStore,
  RedeemCoupon
} from '../controllers/couponController.js';

const router = express.Router();

/**
 * POST /api/v1/coupons/create
 * body: coupon object
 */
router.post('/create', createCoupon);

/**
 * GET /api/v1/coupons
 * list all coupons (debug)
 */
router.get('/', listCoupons);

/**
 * POST /api/v1/coupons/best
 * body: { user: {...}, cart: {...} }
 */
router.post('/best', getBestCoupon);

/**
 * POST /api/v1/coupons/reset
 * resets in-memory store (for testing)
 */
router.post('/reset', resetStore);
/**
 * POST /api/v1/coupons/redeem
 * body: { userId, couponCode }
 */
router.post('/redeem', RedeemCoupon);

export default router;
