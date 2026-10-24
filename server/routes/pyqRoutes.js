import express from 'express';
import { handlePYQSearch } from '../controllers/pyqController.js';

const router = express.Router();

router.post('/search', handlePYQSearch);

export default router;
