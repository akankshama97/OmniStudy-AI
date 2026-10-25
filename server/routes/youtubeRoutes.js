import express from 'express';
import { processVideo, getSavedNotes, getNoteById, translateNote, clearAllNotes, deleteNote, exportNoteToPdf } from '../controllers/youtubeController.js';

const router = express.Router();

router.post('/process', processVideo);
router.post('/translate', translateNote);
router.post('/export-pdf', exportNoteToPdf);
router.get('/notes', getSavedNotes);
router.delete('/notes', clearAllNotes);
router.get('/note/:videoId', getNoteById);
router.delete('/note/:id', deleteNote);

export default router;
