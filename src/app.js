import express from 'express';
import cors from 'cors';
import couponRoutes from './routes/couponRoutes.js';
import { loadSeedCoupons } from './database/seeds.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/coupons', couponRoutes);

// health
app.get('/', (req, res) => res.json({ status: 'ok', service: 'coupon-management' }));

// load seed data
loadSeedCoupons();

export default app;
