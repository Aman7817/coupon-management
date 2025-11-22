# Coupon Management (Assignment)

Assignment Name: Coupon Management
Role: Software Developer
A lightweight, cleanly structured HTTP service that supports creating coupons, evaluating eligibility rules, and returning the best coupon for a given user + cart context. Designed according to assignment requirements using in-memory persistence, Node.js, and Express.




# Project Overview

This project implements a simple REST API for an e-commerce coupon system.
The service allows you to:

Create coupons with eligibility rules

Store coupons in-memory (no database required)

Determine the best applicable coupon for a user and cart

Enforce usageLimitPerUser

Redeem coupons (optional but implemented)

🛠️ Tech Stack

Node.js (ES Modules)

Express.js

In-memory store (plain JS objects)

uuid (unique coupon IDs)

No external DB is used as per assignment guidelines.

📁 Folder Structure
src/
 ├── app.js
 ├── routes/
 │    └── couponRoutes.js
 ├── controllers/
 │    └── couponController.js
 ├── services/
 │    └── couponService.js
 ├── utils/
 │    ├── validators.js
 │    ├── discountCalculator.js
 │    └── cartUtils.js
 ├── database/
 │    ├── store.js
 │    └── seeds.js   ← optional seed coupons

▶️ How to Run
Prerequisites

Node.js 18+

Steps
npm install
npm run dev     # or npm start


Server starts on: http://localhost:4000

📡 APIs
1️⃣ Create Coupon

POST /api/coupons/create

Request Body Example
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

Responses

✔ 201 Created — coupon added

❌ 409 Conflict — duplicate coupon code

❌ 400 Bad Request — invalid fields

2️⃣ List All Coupons

GET /api/coupons
Returns all coupons in memory (for debugging/review testing).

3️⃣ Get Best Coupon

POST /api/coupons/best

Request
{
  "user": {
    "userId": "u123",
    "userTier": "NEW",
    "country": "IN",
    "lifetimeSpend": 1200,
    "ordersPlaced": 0
  },
  "cart": {
    "items": [
      { "productId": "p1", "category": "electronics", "unitPrice": 1500, "quantity": 1 }
    ]
  }
}

Response Example
{
  "success": true,
  "result": {
    "bestCoupon": { ... },
    "discount": 100,
    "cartValue": 1500
  }
}


If no coupon applies:

{
  "success": true,
  "result": {
    "bestCoupon": null,
    "discount": 0,
    "cartValue": 1500
  }
}

4️⃣ Redeem Coupon (Usage Counter)

POST /api/coupons/redeem

Marks a coupon as used by a user.

Example
{
  "userId": "u123",
  "couponCode": "WELCOME100"
}


Usage is stored in-memory inside store.userUsage.

5️⃣ Reset Store (Testing Utility)

POST /api/coupons/reset

Clears all coupons + user usage.

🔍 Duplicate Handling

Coupon codes are treated as case-insensitive:
WELCOME100 == welcome100

Duplicate creation → HTTP 409 Conflict

🧮 Usage Counting

best API checks usage count against usageLimitPerUser

redeem API increments usage count

Data stored in-memory as:

userUsage["userId:couponCode"] = count

🌱 Seed Coupons (Optional but added)

To help the reviewer quickly test the system, 4 coupons auto-load at startup:

WELCOME100 (flat 100 off, new users, first order only)

NEWUSER10 (10% off, max 150)

ELECTRO5 (electronics only)

FASHION50 (flat 50 on fashion, min 2 items)

🧪 Testing

Use:

Postman

Thunder Client

curl

All API examples are included above.

🤖 AI Usage Note

I used ChatGPT for:

Structuring project

Designing eligibility logic

Writing discount and usage-limit functions

Improving controller/service separation

Generating README

Prompts used focused on:
"Implement coupon eligibility rules, usageLimitPerUser, and best-coupon selection cleanly in Node.js."