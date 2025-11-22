export function validateCouponInput(c) {
  if (!c || typeof c !== 'object') {
    throw new Error('coupon object required');

  } 

  if (!c.code || typeof c.code !== 'string') throw new Error('coupon.code required (string)');

  if (!c.discountType || !['FLAT', 'PERCENT'].includes(c.discountType)) {

    throw new Error('discountType must be "FLAT" or "PERCENT"');

  }
  if (typeof c.discountValue !== 'number' || isNaN(c.discountValue)) {

    throw new Error('discountValue must be a number');
  }
  // basic dates validation (optional)
  if (c.startDate && isNaN(new Date(c.startDate).getTime())) throw new Error('startDate invalid');
  
  if (c.endDate && isNaN(new Date(c.endDate).getTime())) throw new Error('endDate invalid');
  // other fields left flexible per assignment
  return true;
}
