# 🎟️ Coupon Management — Assignment (Software Developer Role)

A clean, lightweight Node.js + Express service that implements:

✔ Coupon creation  
✔ Eligibility rules  
✔ Best-coupon selection logic  
✔ Usage-limit per user  
✔ Redeem endpoint  
✔ Optional seed coupons  
✔ Fully working deployed demo  

Project follows all requirements exactly as mentioned in the assignment.

---

## 📦 Project Overview

This service allows:

- Creating coupons with rules  
- Storing coupons in an in-memory store (no DB needed)  
- Checking the best coupon for a user & cart  
- Enforcing per-user usage limits  
- Redeeming coupons  
- Testing via Postman  

---

## 🛠 Tech Stack

- **Node.js (ES Modules)**
- **Express.js**
- **uuid** for IDs
- **In-memory storage**
- No database used (assignment guideline)

---

## 📁 Folder Structure

src/
├── app.js
├── routes/
│ └── couponRoutes.js
├── controllers/
│ └── couponController.js
├── services/
│ └── couponService.js
├── utils/
│ ├── validators.js
│ ├── discountCalculator.js
│ └── cartUtils.js
├── database/
│ ├── store.js
│ └── seeds.js
screenshots/
├── create-coupon.jpg
├── list-coupons.jpg
├── best-coupon.jpg
├── redeem-coupon.jpg
└── health-check.jpg


---

## ▶️ How to Run

### **Requirements**
Node.js 18+

### **Steps**
```bash
npm install
npm run dev   # or npm start


Server runs at:
http://localhost:4000

Deployed version (Render):
https://coupon-management-857x.onrender.com

📡 API Documentation
1️⃣ Create Coupon

POST /api/coupons/create

Example request:

{
  "code": "WELCOME100",
  "description": "Flat ₹100 off",
  "discountType": "FLAT",
  "discountValue": 100,
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "usageLimitPerUser": 1,
  "eligibility": {
    "allowedUserTiers": ["NEW"],
    "minCartValue": 500,
    "applicableCategories": ["electronics"]
  }
}

2️⃣ List Coupons

GET /api/coupons

3️⃣ Best Coupon

POST /api/coupons/best

4️⃣ Redeem Coupon

POST /api/coupons/redeem

Body:

{ "userId": "u123", "couponCode": "WELCOME100" }

5️⃣ Reset Store (for testing)

POST /api/coupons/reset

🌱 Auto-Loaded Seed Coupons
Code	Description
WELCOME100	Flat 100 off
NEWUSER10	10% off (max ₹150)
ELECTRO5	5% off electronics
FASHION50	Flat 50 off (min 2 items)
🔍 Duplicate Handling

Coupon codes are case-insensitive
WELCOME100 == welcome100

Duplicate → HTTP 409 Conflict

📉 Usage-Limit Logic

best API checks usage

redeem API increments usage

Stored as:

store.userUsage["userId:couponCode"]

📸 Postman Screenshots
1️⃣ Create Coupon

2️⃣ List Coupons

3️⃣ Best Coupon

4️⃣ Redeem Coupon

5️⃣ Health Check

🤖 AI Usage Note

I used ChatGPT for:

Structuring modules

Eligibility & discount logic

Designing service/controller separation

Improving validation logic

Writing README and documentation

Prompts were focused on implementing clean Node.js logic according to assignment rules.