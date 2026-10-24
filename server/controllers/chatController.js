import { solveStudentDoubt, solveTimestampTutorQuery } from '../services/geminiService.js';
import { getTranscriptSnippet, extractVideoId } from '../services/transcriptService.js';

export const handleDoubtQuery = async (req, res) => {
  try {
    const { question, videoContext, language = 'Hinglish', imageBase64, imageMimeType, timestamp, transcriptSnippet } = req.body;

    if (!question && !imageBase64 && !timestamp) {
      return res.status(400).json({ error: 'Question text, timestamp, or an image upload is required.' });
    }

    // If timestamp is provided, route directly to the timestamp tutor logic
    if (timestamp) {
      const vTitle = typeof videoContext === 'string' ? videoContext : videoContext?.title || 'YouTube Lecture';
      let snippet = transcriptSnippet || '';

      if (!snippet && (videoContext?.videoId || req.body.videoId || req.body.videoUrl)) {
        const targetId = videoContext?.videoId || req.body.videoId || req.body.videoUrl;
        const autoSnippet = await getTranscriptSnippet(targetId, timestamp);
        snippet = autoSnippet.snippet;
      }

      const answer = await solveTimestampTutorQuery({
        videoTitle: vTitle,
        timestamp,
        transcriptSnippet: snippet,
        studentDoubt: question,
        language
      });

      return res.json({
        success: true,
        answer,
        timestamp,
        transcriptSnippet: snippet,
        language
      });
    }

    const answer = await solveStudentDoubt(question, videoContext, language, imageBase64, imageMimeType);

    return res.json({
      success: true,
      answer,
      language
    });
  } catch (error) {
    console.error('Error solving doubt:', error);
    return res.status(500).json({
      error: error.message || 'Failed to solve doubt. Please try again.'
    });
  }
};

/**
 * Endpoint for Timestamp AI Tutor
 * POST /api/chat/timestamp-tutor
 */
export const handleTimestampTutorQuery = async (req, res) => {
  try {
    const {
      videoTitle = 'YouTube Lecture',
      timestamp = '00:00',
      transcriptSnippet = '',
      studentDoubt = '',
      language = 'Hinglish',
      videoId = null,
      videoUrl = null
    } = req.body;

    let finalSnippet = transcriptSnippet;
    let finalTitle = videoTitle;

    // If snippet wasn't passed directly, attempt automatic retrieval if videoId/videoUrl is present
    const id = videoId || (videoUrl ? extractVideoId(videoUrl) : null);
    if (!finalSnippet && id) {
      try {
        const fetched = await getTranscriptSnippet(id, timestamp);
        finalSnippet = fetched.snippet;
        if (!finalTitle || finalTitle === 'YouTube Lecture') {
          finalTitle = fetched.videoTitle || finalTitle;
        }
      } catch (err) {
        console.warn('Auto transcript snippet fetch warning:', err.message);
      }
    }

    const answer = await solveTimestampTutorQuery({
      videoTitle: finalTitle,
      timestamp,
      transcriptSnippet: finalSnippet,
      studentDoubt,
      language
    });

    return res.json({
      success: true,
      answer,
      videoTitle: finalTitle,
      timestamp,
      transcriptSnippet: finalSnippet,
      language
    });
  } catch (error) {
    console.error('Error in timestamp tutor query:', error);
    return res.status(500).json({
      error: error.message || 'Failed to solve timestamp doubt. Please try again.'
    });
  }
};

/**
 * Endpoint to fetch transcript snippet around a specific timestamp
 * GET /api/chat/transcript-snippet?videoId=...&timestamp=...
 */
export const handleGetTranscriptSnippet = async (req, res) => {
  try {
    const { videoId, videoUrl, timestamp = '00:00', windowSeconds = 90 } = req.query;
    const target = videoId || videoUrl;

    if (!target) {
      return res.status(400).json({ error: 'videoId or videoUrl query parameter is required.' });
    }

    const result = await getTranscriptSnippet(target, timestamp, parseInt(windowSeconds, 10) || 90);

    return res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching transcript snippet:', error);
    return res.status(500).json({
      error: error.message || 'Failed to fetch transcript snippet.'
    });
  }
};

