import { searchExamPYQs } from '../services/geminiService.js';

export const handlePYQSearch = async (req, res) => {
  try {
    const { topic, examOrUniversity, language = 'Hinglish' } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic or Subject is required.' });
    }

    const pyqData = await searchExamPYQs(topic, examOrUniversity, language);

    return res.json({
      success: true,
      data: pyqData
    });
  } catch (error) {
    console.error('Error searching PYQs:', error);
    return res.status(500).json({
      error: error.message || 'Failed to search PYQs and formulas.'
    });
  }
};
