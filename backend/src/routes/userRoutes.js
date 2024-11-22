import express from 'express';
import { getBalance, registerProducer, unregisterProducer } from '../controllers/userController.js';

const router = express.Router();

router.get('/balance/:address', getBalance);
router.post('/register-producer', registerProducer);
router.post('/unregister-producer', unregisterProducer);

export default router;
