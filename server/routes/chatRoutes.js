import express from 'express';
import { handleDoubtQuery, handleTimestampTutorQuery, handleGetTranscriptSnippet } from '../controllers/chatController.js';

const router = express.Router();

router.post('/doubt', handleDoubtQuery);
router.post('/timestamp-tutor', handleTimestampTutorQuery);
router.get('/transcript-snippet', handleGetTranscriptSnippet);

export default router;
