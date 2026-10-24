import { YoutubeTranscript } from 'youtube-transcript';
import axios from 'axios';

/**
 * Extracts YouTube Video ID from any URL format:
 * - https://www.youtube.com/watch?v=XXXX
 * - https://youtu.be/XXXX
 * - https://www.youtube.com/shorts/XXXX
 * - https://www.youtube.com/watch?v=XXXX&list=PL123&index=2
 * - https://m.youtube.com/watch?v=XXXX
 * - Direct 11-char ID
 */
export function extractVideoId(url) {
  if (!url) return null;
  const cleanUrl = url.trim();

  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  // Regex matching various YouTube URL schemes
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/i;
  const match = cleanUrl.match(regExp);
  if (match && match[1]) {
    return match[1];
  }

  // Fallback query param search
  try {
    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const vParam = parsed.searchParams.get('v');
    if (vParam && vParam.length === 11) {
      return vParam;
    }
  } catch (e) {}

  return null;
}

/**
 * Extracts YouTube Playlist ID from URL formats:
 * - https://www.youtube.com/playlist?list=PLXXXXXX
 * - https://www.youtube.com/watch?v=XXXX&list=PLXXXXXX
 */
export function extractPlaylistId(url) {
  if (!url) return null;
  const cleanUrl = url.trim();

  // If already a playlist ID (e.g. starting with PL, RD, UU, etc.)
  if (/^PL[a-zA-Z0-9_-]{10,}/i.test(cleanUrl)) {
    return cleanUrl;
  }

  const match = cleanUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/i);
  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Fetches Playlist Title, Author, and Videos list from YouTube
 */
export async function fetchPlaylistDetails(playlistId) {
  try {
    const url = `https://www.youtube.com/playlist?list=${playlistId}`;
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 10000
    });
    const html = res.data;

    let playlistTitle = 'YouTube Playlist Subject';
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      playlistTitle = titleMatch[1].replace(/- YouTube.*$/i, '').trim();
    }

    let channelName = 'YouTube Educator';
    const authorMatch = html.match(/"author":"(.*?)"/) || html.match(/"ownerChannelName":"(.*?)"/);
    if (authorMatch && authorMatch[1]) {
      channelName = authorMatch[1];
    }

    // Extract video IDs
    const videoMatches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
    const seen = new Set();
    const videoIds = [];
    for (const m of videoMatches) {
      if (m[1] && !seen.has(m[1])) {
        seen.add(m[1]);
        videoIds.push(m[1]);
      }
    }

    return {
      playlistId,
      playlistTitle: playlistTitle || 'Subject Master Playlist',
      channelName: channelName || 'Educator',
      videoIds: videoIds.slice(0, 15)
    };
  } catch (err) {
    console.warn(`[OmniStudy AI] Playlist metadata warning for ${playlistId}:`, err.message);
    return {
      playlistId,
      playlistTitle: 'Complete Subject Course',
      channelName: 'Knowledge Gate / Gate Smashers',
      videoIds: []
    };
  }
}

/**
 * Parses seconds to MM:SS or HH:MM:SS format
 */
export function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const sec = Math.floor(seconds);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const remM = m % 60;
    return `${h.toString().padStart(2, '0')}:${remM.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * Parses time string (e.g. "01:25" or "1:05:30") to seconds
 */
export function timeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

/**
 * Fetches YouTube video metadata (title, thumbnail, author, description, approximate duration)
 */
export async function getVideoDetails(videoId) {
  let title = `YouTube Lecture (${videoId})`;
  let author = 'YouTube Educator';
  let description = '';
  let durationSec = 0;
  let isPrivate = false;
  let isAgeRestricted = false;

  // 1. oEmbed endpoint
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await axios.get(oembedUrl, { timeout: 8000 });
    if (response.data) {
      title = response.data.title || title;
      author = response.data.author_name || author;
    }
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      isPrivate = true;
    }
  }

  // 2. Scrape watch page for rich metadata & chapter timestamps
  let chapterTimestamps = [];
  try {
    const pageRes = await axios.get(`https://www.youtube.com/watch?v=${videoId}`, {
      timeout: 9000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'
      }
    });
    const html = pageRes.data;

    if (html.includes('This video is private')) isPrivate = true;
    if (html.includes('Sign in to confirm your age') || html.includes('age-restricted')) isAgeRestricted = true;

    // Title
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    if (titleMatch && titleMatch[1]) {
      const clean = titleMatch[1].replace('- YouTube', '').trim();
      if (clean && !clean.toLowerCase().includes('youtube')) title = clean;
    }

    // Description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)
      || html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    if (descMatch && descMatch[1]) {
      description = descMatch[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
    }

    // Approximate duration
    const durMatch = html.match(/"approxDurationMs":"(\d+)"/);
    if (durMatch && durMatch[1]) {
      durationSec = Math.floor(parseInt(durMatch[1], 10) / 1000);
    }

    // Extract chapter timestamps from description (supports [01:24], 01:24 - Topic, etc.)
    const timestampRegex = /(?:\[|\(|•|-|\d+\.)?\s*(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\s*(?:\]|\))?\s*[-–:|]?\s*([^\n\r]+)/gi;
    let tMatch;
    while ((tMatch = timestampRegex.exec(description)) !== null) {
      const timeStr = tMatch[1] ? `${tMatch[1]}:${tMatch[2]}:${tMatch[3]}` : `${tMatch[2]}:${tMatch[3]}`;
      const rawHeading = tMatch[4].trim().replace(/^[-–:|]\s*/, '').trim();
      if (rawHeading && rawHeading.length >= 3 && !/^(http|www|subscribe|like|share)/i.test(rawHeading)) {
        chapterTimestamps.push({
          time: timeStr,
          seconds: timeToSeconds(timeStr),
          title: rawHeading
        });
      }
    }

    // Also attempt parsing official YouTube chapters from ytInitialPlayerResponse JSON
    const playerResponseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
    if (playerResponseMatch && playerResponseMatch[1] && chapterTimestamps.length < 3) {
      try {
        const playerObj = JSON.parse(playerResponseMatch[1]);
        const markers = playerObj?.playerOverlays?.playerOverlayRenderer?.decoratedPlayerBarRenderer?.playerBar?.chapteredPlayerBarRenderer?.chapters;
        if (Array.isArray(markers) && markers.length >= 3) {
          chapterTimestamps = markers.map(m => {
            const r = m?.chapterRenderer;
            const startSec = Math.floor((r?.timeRangeStartMillis || 0) / 1000);
            return {
              time: formatTime(startSec),
              seconds: startSec,
              title: r?.title?.simpleText || 'Lecture Topic'
            };
          });
        }
      } catch (jsonErr) {}
    }
  } catch (pageErr) {}

  return {
    videoId,
    title,
    author,
    description,
    durationSec,
    durationFormatted: formatTime(durationSec),
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    isPrivate,
    isAgeRestricted,
    chapterTimestamps
  };
}

/**
 * Splits raw transcript items into 5-minute (~300 sec) chunks with 30 sec overlap.
 * Captures all board work, equations, and speech across time boundaries strictly.
 */
export function chunkTranscript(items, chunkDurationSec = 300, overlapSec = 30) {
  if (!items || items.length === 0) return [];

  const chunks = [];
  const totalItems = items.length;

  let currentStartIdx = 0;

  while (currentStartIdx < totalItems) {
    const firstItem = items[currentStartIdx];
    let startSec = firstItem.offsetSec || firstItem.offset || 0;
    let targetEndSec = startSec + chunkDurationSec;

    let chunkItems = [];
    let nextStartIdx = totalItems;
    let lastSec = startSec;

    for (let i = currentStartIdx; i < totalItems; i++) {
      const it = items[i];
      const sec = it.offsetSec !== undefined ? it.offsetSec : (it.offset > 10000 ? it.offset / 1000 : it.offset);
      chunkItems.push({ ...it, offsetSec: sec });
      lastSec = sec;

      // Mark the index where next overlapping chunk should start
      if (nextStartIdx === totalItems && sec >= (targetEndSec - overlapSec)) {
        nextStartIdx = i;
      }

      if (sec >= targetEndSec) {
        break;
      }
    }

    // Build timestamped textual representation for Gemini Pro
    let timestampedText = '';
    let lastMarker = -999;
    for (const it of chunkItems) {
      if (it.offsetSec - lastMarker >= 40) {
        timestampedText += `\n[${formatTime(it.offsetSec)}] `;
        lastMarker = it.offsetSec;
      }
      timestampedText += `${it.text} `;
    }

    chunks.push({
      chunkIndex: chunks.length + 1,
      startTime: formatTime(startSec),
      endTime: formatTime(lastSec),
      startSec: Math.floor(startSec),
      endSec: Math.ceil(lastSec),
      text: timestampedText.trim(),
      rawText: chunkItems.map(c => c.text).join(' ')
    });

    if (nextStartIdx <= currentStartIdx || nextStartIdx >= totalItems) {
      break;
    }
    currentStartIdx = nextStartIdx;
  }

  return chunks;
}

function decodeXmlEntities(text) {
  if (!text) return '';
  return text
    .replace(/<text[^>]*>/g, ' ')
    .replace(/<\/text>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .trim();
}

function parseXmlTimedText(xml) {
  if (!xml) return [];
  const regex = /<text\s+start=["']([\d.]+)["']\s+dur=["']([\d.]+)["'][^>]*>(.*?)<\/text>/gi;
  const items = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const offset = parseFloat(match[1]);
    const duration = parseFloat(match[2]);
    const text = decodeXmlEntities(match[3]);
    if (text) {
      items.push({ text, offset, offsetSec: offset, duration });
    }
  }
  return items;
}

async function tryFetchWithLang(videoId, lang) {
  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId, lang ? { lang } : undefined);
    if (items && items.length > 0) {
      return items.map(item => ({
        ...item,
        offsetSec: item.offset > 10000 ? item.offset / 1000 : item.offset
      }));
    }
  } catch (err) {}
  return null;
}

/**
 * Extracts YouTube Playlist ID from URL formats:
 * - https://www.youtube.com/playlist?list=PLXXXXXX
 * - https://www.youtube.com/watch?v=XXXX&list=PLXXXXXX
 */
export function extractPlaylistId(url) {
  if (!url) return null;
  const cleanUrl = url.trim();

  // If already a playlist ID (e.g. starting with PL, RD, UU, etc.)
  if (/^PL[a-zA-Z0-9_-]{10,}/i.test(cleanUrl)) {
    return cleanUrl;
  }

  const match = cleanUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/i);
  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Fetches Playlist Title, Author, and Videos list from YouTube
 */
export async function fetchPlaylistDetails(playlistId) {
  try {
    const url = `https://www.youtube.com/playlist?list=${playlistId}`;
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 10000
    });
    const html = res.data;

    let playlistTitle = 'YouTube Playlist Subject';
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      playlistTitle = titleMatch[1].replace(/- YouTube.*$/i, '').trim();
    }

    let channelName = 'YouTube Educator';
    const authorMatch = html.match(/"author":"(.*?)"/) || html.match(/"ownerChannelName":"(.*?)"/);
    if (authorMatch && authorMatch[1]) {
      channelName = authorMatch[1];
    }

    // Extract video IDs
    const videoMatches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
    const seen = new Set();
    const videoIds = [];
    for (const m of videoMatches) {
      if (m[1] && !seen.has(m[1])) {
        seen.add(m[1]);
        videoIds.push(m[1]);
      }
    }

    return {
      playlistId,
      playlistTitle: playlistTitle || 'Subject Master Playlist',
      channelName: channelName || 'Educator',
      videoIds: videoIds.slice(0, 15)
    };
  } catch (err) {
    console.warn(`[OmniStudy AI] Playlist metadata warning for ${playlistId}:`, err.message);
    return {
      playlistId,
      playlistTitle: 'Complete Subject Course',
      channelName: 'Knowledge Gate / Gate Smashers',
      videoIds: []
    };
  }
}

/**
 * Fetches YouTube captions across all standard and auto-generated language tracks.
 */
export async function getTranscript(videoId, videoDetails = {}) {
  let items = null;

  // Language tracks to try (prioritize Hindi, Indian English, English)
  const langCandidates = ['hi', 'hi-Latn', 'en', 'en-IN', 'en-US', 'en-GB', null];

  for (const lang of langCandidates) {
    items = await tryFetchWithLang(videoId, lang);
    if (items && items.length > 0) break;
  }

  // Scrape HTML for caption tracks if package returned empty
  if (!items || items.length === 0) {
    try {
      const pageRes = await axios.get(`https://www.youtube.com/watch?v=${videoId}`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'
        }
      });
      const html = pageRes.data;
      let tracks = null;

      const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
      if (playerMatch && playerMatch[1]) {
        try {
          const playerResponse = JSON.parse(playerMatch[1]);
          tracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        } catch (e) {}
      }

      if (!tracks) {
        const captionTracksMatch = html.match(/"captionTracks":\s*(\[.*?\])/);
        if (captionTracksMatch && captionTracksMatch[1]) {
          try {
            tracks = JSON.parse(captionTracksMatch[1]);
          } catch (e) {}
        }
      }

      if (tracks && tracks.length > 0) {
        const preferred = tracks.find(t => t.languageCode === 'hi' || t.languageCode === 'hi-Latn')
          || tracks.find(t => t.languageCode === 'en' || t.languageCode === 'en-IN')
          || tracks[0];

        if (preferred && preferred.baseUrl) {
          const captionRes = await axios.get(preferred.baseUrl, { timeout: 8000 });
          const parsed = parseXmlTimedText(captionRes.data);
          if (parsed.length > 0) {
            items = parsed;
          }
        }
      }
    } catch (e) {}
  }

  // If captions found and valid
  if (items && items.length > 0) {
    const fullText = items.map(item => item.text).join(' ');
    let chunks = [];

    // If teacher provided chapter timestamps in description or player, align chunks to chapters!
    if (videoDetails.chapterTimestamps && videoDetails.chapterTimestamps.length >= 3) {
      console.log(`[OmniStudy AI] Aligning chunks to ${videoDetails.chapterTimestamps.length} teacher-defined chapter timestamps.`);
      for (let i = 0; i < videoDetails.chapterTimestamps.length; i++) {
        const cur = videoDetails.chapterTimestamps[i];
        const next = videoDetails.chapterTimestamps[i + 1];
        const endSec = next ? next.seconds : (videoDetails.durationSec || (cur.seconds + 1200));
        const segmentItems = items.filter(it => (it.offsetSec || 0) >= cur.seconds - 15 && (it.offsetSec || 0) <= endSec + 15);
        const segmentText = segmentItems.map(it => it.text).join(' ');

        chunks.push({
          chunkIndex: i + 1,
          chapterTitle: cur.title,
          startTime: cur.time,
          endTime: next ? next.time : formatTime(endSec),
          startSec: cur.seconds,
          endSec: endSec,
          text: `Teacher Chapter Heading: "${cur.title}" [${cur.time} - ${next ? next.time : formatTime(endSec)}]\n${segmentText || cur.title}`
        });
      }
    } else {
      // Dynamic chunk duration: calculates chunk window so we get 8-14 substantive, rich chunks
      // covering 100% of the video duration from 00:00 to the very last second without cutting off!
      const lastItem = items[items.length - 1];
      const totalDurationSec = (lastItem?.offsetSec !== undefined)
        ? lastItem.offsetSec
        : (lastItem?.offset > 10000 ? lastItem.offset / 1000 : (lastItem?.offset || videoDetails.durationSec || 1800));

      const targetChunkCount = totalDurationSec > 7200 ? 12 : totalDurationSec > 3600 ? 10 : 8;
      const chunkDurationSec = Math.max(240, Math.ceil(totalDurationSec / targetChunkCount));
      const overlapSec = Math.min(45, Math.ceil(chunkDurationSec * 0.08));

      chunks = chunkTranscript(items, chunkDurationSec, overlapSec);
    }

    return {
      text: fullText,
      items,
      chunks,
      hasTranscript: true,
      wordCount: fullText.split(/\s+/).length
    };
  }

  // Fallback: No captions found or captions disabled
  console.log(`Video ID ${videoId} has no direct subtitles. Using multimodal syllabus video structure.`);
  const title = videoDetails.title || 'Educational Lecture';
  const author = videoDetails.author || 'YouTube Educator';
  const desc = videoDetails.description || '';

  // If chapter timestamps are available in description, use them as distinct chunks
  let modularChunks = [];
  if (videoDetails.chapterTimestamps && videoDetails.chapterTimestamps.length >= 3) {
    for (let i = 0; i < videoDetails.chapterTimestamps.length; i++) {
      const cur = videoDetails.chapterTimestamps[i];
      const next = videoDetails.chapterTimestamps[i + 1];
      modularChunks.push({
        chunkIndex: i + 1,
        chapterTitle: cur.title,
        startTime: cur.time,
        endTime: next ? next.time : formatTime(cur.seconds + 720),
        startSec: cur.seconds,
        endSec: next ? next.seconds : cur.seconds + 720,
        text: `Teacher Chapter Module: "${cur.title}". Lecture: "${title}". Faculty: ${author}. Context: ${desc.slice(0, 4000)}`
      });
    }
  } else {
    // Generate modular syllabus segments spanning the entire lecture duration from 00:00 to the end
    const totalSec = videoDetails.durationSec || 3600;
    const segmentCount = totalSec > 7200 ? 10 : totalSec > 3600 ? 8 : 6;
    const stepSec = Math.floor(totalSec / segmentCount);
    for (let i = 0; i < segmentCount; i++) {
      const startS = i * stepSec;
      const endS = (i === segmentCount - 1) ? totalSec : (i + 1) * stepSec;
      modularChunks.push({
        chunkIndex: i + 1,
        startTime: formatTime(startS),
        endTime: formatTime(endS),
        startSec: startS,
        endSec: endS,
        text: `Lecture Module ${i + 1} of ${segmentCount} [${formatTime(startS)} - ${formatTime(endS)}]. Lecture: "${title}". Faculty: ${author}. Context: ${desc.slice(0, 4000)}`
      });
    }
  }

  return {
    text: `Lecture: "${title}". Faculty: ${author}. Description: ${desc}`,
    items: [],
    chunks: modularChunks,
    hasTranscript: false,
    wordCount: 0
  };
}

/**
 * Extracts a focused transcript snippet centered around a specific timestamp (e.g., 12:35)
 * Default window is ±90 seconds (180s total window).
 */
export async function getTranscriptSnippet(videoIdOrUrl, timestampStr, windowSeconds = 90) {
  const videoId = extractVideoId(videoIdOrUrl) || videoIdOrUrl;
  const targetSec = timeToSeconds(timestampStr || '00:00');
  const minSec = Math.max(0, targetSec - windowSeconds);
  const maxSec = targetSec + windowSeconds;

  try {
    const videoDetails = await getVideoDetails(videoId);
    const transcriptData = await getTranscript(videoId, videoDetails);

    if (!transcriptData || !transcriptData.items || transcriptData.items.length === 0) {
      if (transcriptData?.chunks && transcriptData.chunks.length > 0) {
        const matchedChunk = transcriptData.chunks.find(c => targetSec >= c.startSec && targetSec <= c.endSec) || transcriptData.chunks[0];
        return {
          videoTitle: videoDetails?.title || `Lecture (${videoId})`,
          timestamp: timestampStr || '00:00',
          snippet: matchedChunk.text || '',
          hasCaptions: false
        };
      }
      return {
        videoTitle: videoDetails?.title || `Lecture (${videoId})`,
        timestamp: timestampStr || '00:00',
        snippet: '',
        hasCaptions: false
      };
    }

    // Filter items inside the [minSec, maxSec] window
    let relevantItems = transcriptData.items.filter(item => {
      const sec = item.offsetSec !== undefined ? item.offsetSec : (item.offset > 10000 ? item.offset / 1000 : item.offset);
      return sec >= minSec && sec <= maxSec;
    });

    if (relevantItems.length === 0) {
      const sorted = [...transcriptData.items].sort((a, b) => {
        const aSec = a.offsetSec || (a.offset > 10000 ? a.offset / 1000 : a.offset);
        const bSec = b.offsetSec || (b.offset > 10000 ? b.offset / 1000 : b.offset);
        return Math.abs(aSec - targetSec) - Math.abs(bSec - targetSec);
      });
      relevantItems = sorted.slice(0, 10).sort((a, b) => {
        const aSec = a.offsetSec || (a.offset > 10000 ? a.offset / 1000 : a.offset);
        const bSec = b.offsetSec || (b.offset > 10000 ? b.offset / 1000 : b.offset);
        return aSec - bSec;
      });
    }

    let formattedSnippet = '';
    let lastMarker = -999;
    for (const item of relevantItems) {
      const sec = item.offsetSec !== undefined ? item.offsetSec : (item.offset > 10000 ? item.offset / 1000 : item.offset);
      if (sec - lastMarker >= 25) {
        formattedSnippet += `\n[${formatTime(sec)}] `;
        lastMarker = sec;
      }
      formattedSnippet += `${item.text} `;
    }

    return {
      videoTitle: videoDetails?.title || `Lecture (${videoId})`,
      timestamp: timestampStr || '00:00',
      snippet: formattedSnippet.trim(),
      hasCaptions: true
    };
  } catch (err) {
    console.warn('[OmniStudy AI] getTranscriptSnippet error:', err.message);
    return {
      videoTitle: 'YouTube Lecture',
      timestamp: timestampStr || '00:00',
      snippet: '',
      hasCaptions: false
    };
  }
}

