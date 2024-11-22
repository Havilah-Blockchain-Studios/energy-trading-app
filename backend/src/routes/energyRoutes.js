import express from 'express';
import { buyEnergy, sellEnergy } from '../controllers/energyController.js';

const router = express.Router();

router.post('/buy', buyEnergy);
router.post('/sell', sellEnergy);

export default router;
