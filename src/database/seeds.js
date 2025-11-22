import store from './store.js';
import { v4 as uuidv4 } from 'uuid';

export function loadSeedCoupons() {
  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  store.coupons = [
    {
      id: uuidv4(),
      code: "WELCOME100",
      description: "Flat ₹100 off for new users",
      discountType: "FLAT",
      discountValue: 100,
      startDate: now.toISOString(),
      endDate: nextMonth.toISOString(),
      usageLimitPerUser: 1,
      eligibility: {
        allowedUserTiers: ["NEW"],
        firstOrderOnly: true
      }
    },
    {
      id: uuidv4(),
      code: "NEWUSER10",
      description: "10% off for new users (max ₹150)",
      discountType: "PERCENT",
      discountValue: 10,
      maxDiscountAmount: 150,
      startDate: now.toISOString(),
      endDate: nextMonth.toISOString(),
      eligibility: {
        allowedUserTiers: ["NEW", "REGULAR"],
        minCartValue: 500
      }
    },
    {
      id: uuidv4(),
      code: "ELECTRO5",
      description: "5% off on electronics",
      discountType: "PERCENT",
      discountValue: 5,
      maxDiscountAmount: 200,
      startDate: now.toISOString(),
      endDate: nextMonth.toISOString(),
      eligibility: {
        applicableCategories: ["electronics"]
      }
    },
    {
      id: uuidv4(),
      code: "FASHION50",
      description: "Flat ₹50 off on fashion items",
      discountType: "FLAT",
      discountValue: 50,
      startDate: now.toISOString(),
      endDate: nextMonth.toISOString(),
      eligibility: {
        applicableCategories: ["fashion"],
        minItemsCount: 2
      }
    }
  ];
}
