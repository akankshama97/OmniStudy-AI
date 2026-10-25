import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const processYouTubeVideo = async (videoUrl, language = 'Hinglish', selectedExam = 'Auto-detect', maxMinutes = null, forceRefresh = true) => {
  const response = await api.post('/youtube/process', {
    videoUrl,
    language,
    selectedExam,
    maxMinutes,
    forceRefresh
  });
  return response.data;
};

export const fetchSavedNotes = async () => {
  const response = await api.get('/youtube/notes');
  return response.data;
};

export const clearAllSavedNotes = async () => {
  const response = await api.delete('/youtube/notes');
  return response.data;
};

export const deleteSavedNote = async (id) => {
  const response = await api.delete(`/youtube/note/${id}`);
  return response.data;
};

export const solveDoubt = async (question, videoContext = null, language = 'Hinglish', imageBase64 = null, imageMimeType = 'image/jpeg') => {
  const response = await api.post('/chat/doubt', {
    question,
    videoContext,
    language,
    imageBase64,
    imageMimeType
  });
  return response.data;
};

export const solveTimestampTutorApi = async ({
  videoTitle,
  timestamp,
  transcriptSnippet,
  studentDoubt,
  language = 'Hinglish',
  videoId = null,
  videoUrl = null
}) => {
  const response = await api.post('/chat/timestamp-tutor', {
    videoTitle,
    timestamp,
    transcriptSnippet,
    studentDoubt,
    language,
    videoId,
    videoUrl
  });
  return response.data;
};

export const fetchTranscriptSnippetApi = async (videoId, timestamp = '00:00', windowSeconds = 90) => {
  const response = await api.get('/chat/transcript-snippet', {
    params: { videoId, timestamp, windowSeconds }
  });
  return response.data;
};

export const searchPYQs = async (topic, examOrUniversity = '', language = 'Hinglish') => {
  const response = await api.post('/pyq/search', {
    topic,
    examOrUniversity,
    language
  });
  return response.data;
};

export const translateNoteApi = async (note, targetLanguage = 'Hindi') => {
  const response = await api.post('/youtube/translate', {
    note,
    targetLanguage
  });
  return response.data;
};
