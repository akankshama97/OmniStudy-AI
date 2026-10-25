import { Telegraf } from 'telegraf';
import { extractVideoId, getVideoDetails, getTranscript } from './transcriptService.js';
import { generateNotesFromTranscript, solveStudentDoubt } from './geminiService.js';
import { generateNotePdfBuffer } from './pdfService.js';

// Cache user lecture contexts for doubt solving (chatId -> note object)
const userContexts = new Map();

/**
 * Initializes and starts the OmniStudy AI Telegram Bot
 */
export function initTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token || token.trim() === '' || token.includes('your_token_here')) {
    console.log('\x1b[33m[OmniStudy AI Telegram Bot]: TELEGRAM_BOT_TOKEN is not configured in .env.local. Bot will remain idle until token is set.\x1b[0m');
    return null;
  }

  try {
    const bot = new Telegraf(token.trim());

    // ── Start Command ──
    bot.start(async (ctx) => {
      const name = ctx.from?.first_name || 'Student';
      const welcomeMsg = `👋 *Namaste ${name}! Welcome to OmniStudy AI Bot* 🎓\n\n` +
        `Main aapka personal AI study assistant hu. Bas kisi bhi YouTube lecture ka link bhejo:\n\n` +
        `✨ *Main kya kar sakta hu:*\n` +
        `• 📝 *Topper Handwritten-styled PDF Notes*\n` +
        `• ⚡ *Formula Sheet & Cheat Sheets*\n` +
        `• 🎯 *University / Board Exam PYQs*\n` +
        `• 💡 *Hinglish Doubt Solver* (Directly chat karke poocho!)\n\n` +
        `👉 *Abhi try karein:* Kisi bhi lecture ka YouTube link yahan send karein!`;

      await ctx.replyWithMarkdown(welcomeMsg);
    });

    // ── Help Command ──
    bot.help(async (ctx) => {
      await ctx.replyWithMarkdown(
        `📚 *OmniStudy AI Help Guide*\n\n` +
        `1️⃣ *Notes Banane Ke Liye:* YouTube lecture ka link chat mein paste karein.\n` +
        `2️⃣ *Doubt Clear Karne Ke Liye:* Notes aane ke baad apna sawal (Hinglish/Hindi/English) yahan type karein.\n` +
        `3️⃣ *PDF Download:* Bot aapko directly readable PDF document file send karega.\n\n` +
        `Koi problem aane par dubara /start send karein.`
      );
    });

    // ── YouTube Link Handler ──
    bot.hears(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s]+/i, async (ctx) => {
      const url = ctx.message.text.trim();
      const videoId = extractVideoId(url);

      if (!videoId) {
        return ctx.reply('❌ Invalid YouTube link! Please ek valid YouTube video ka link bhejein.');
      }

      await ctx.reply('⏳ *Video analyze ho rahi hai...*\nTranscripts extract karke Toppers Notes aur PYQs generate kar raha hu. Kuch seconds wait karein! 📖', { parse_mode: 'Markdown' });

      try {
        // Step 1: Get Video Details & Transcript
        const details = await getVideoDetails(videoId);
        const videoTitle = details?.title || 'YouTube Lecture';
        const transcript = await getTranscript(videoId, details);

        if (!transcript || transcript.length === 0) {
          return ctx.reply('⚠️ Is video ke captions/transcripts retrieve nahi ho paaye. Please try another educational video.');
        }

        // Step 2: Generate Comprehensive Notes via Gemini
        const notes = await generateNotesFromTranscript(
          transcript,
          videoTitle,
          'Hinglish',
          'Auto-detect',
          true,
          details
        );

        // Store context for subsequent doubts
        userContexts.set(ctx.chat.id, {
          title: videoTitle,
          overview: notes.summary,
          keyConcepts: notes.keyConcepts,
          subject: notes.subject || 'General'
        });

        // Step 3: Render to PDF Buffer
        await ctx.reply('🎨 *Notes generate ho gaye hain!* Ab PDF render ki jaa rahi hai... 🖨️', { parse_mode: 'Markdown' });
        const pdfBuffer = await generateNotePdfBuffer(notes);

        const safeFilename = `${(notes.title || 'OmniStudy_Notes').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40)}.pdf`;

        // Step 4: Send Document to Telegram User
        await ctx.replyWithDocument(
          {
            source: pdfBuffer,
            filename: safeFilename
          },
          {
            caption: `✅ *${notes.title || videoTitle}*\n\n📌 *Summary:*\n${(notes.summary || '').slice(0, 250)}...\n\n💡 *Doubt hai?* Is video se related koi bhi sawal yahan direct Hinglish mein pooch sakte ho! 👇`,
            parse_mode: 'Markdown'
          }
        );

      } catch (err) {
        console.error('[OmniStudy AI Telegram Bot Error]:', err);
        ctx.reply(`❌ Maaf kijiye, notes generate karne mein problem aayi: ${err.message || 'Server error'}. Please ek baar dubara koshish karein.`);
      }
    });

    // ── Doubt Solver (Text Handler for Questions) ──
    bot.on('text', async (ctx) => {
      const text = ctx.message.text.trim();

      // Ignore commands
      if (text.startsWith('/')) return;

      const context = userContexts.get(ctx.chat.id);

      await ctx.sendChatAction('typing');

      try {
        const reply = await solveStudentDoubt(
          text,
          context || { title: 'General Academic Doubt', overview: 'General Study Question' },
          'Hinglish'
        );

        await ctx.reply(reply, {
          reply_to_message_id: ctx.message.message_id
        });
      } catch (err) {
        console.error('[Telegram Bot Doubt Error]:', err);
        ctx.reply('Maaf kijiye, aapka doubt process nahi ho paya. Kripya dubara poochiye.');
      }
    });

    // Launch bot
    bot.launch(() => {
      console.log('\x1b[32m[OmniStudy AI Telegram Bot]: 🤖 Bot successfully connected and listening for messages!\x1b[0m');
    });

    // Graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    return bot;

  } catch (err) {
    console.error('[OmniStudy AI Telegram Bot] Failed to initialize:', err.message);
    return null;
  }
}
