import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import youtubeRoutes from './routes/youtubeRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import pyqRoutes from './routes/pyqRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve .env.local and .env from server directory reliably regardless of launch directory
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.GEMINI_API_KEY) {
  console.error('\x1b[31m[OmniStudy AI Server Error]: GEMINI_API_KEY is not defined in .env.local! Please set GEMINI_API_KEY in server/.env.local (refer to .env.example).\x1b[0m');
} else {
  console.log('\x1b[32m[OmniStudy AI Server]: GEMINI_API_KEY successfully loaded from .env.local.\x1b[0m');
}

process.on('uncaughtException', (err) => {
  console.error('[OmniStudy AI Server] Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[OmniStudy AI Server] Unhandled Rejection:', reason);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Connect Database
connectDB();

// API Routes
app.use('/api/youtube', youtubeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/pyq', pyqRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'OmniStudy AI Backend',
    timestamp: new Date().toISOString()
  });
});

// Root welcome & automatic redirect to frontend port 3000
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
  <head>
    <title>OmniStudy AI</title>
    <meta http-equiv="refresh" content="0;url=http://localhost:3000" />
    <style>
      body { font-family: system-ui, sans-serif; background: #0B0F17; color: #F8FAFC; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
      .card { background: #131B2E; padding: 2.5rem; border-radius: 1.5rem; border: 1px solid #23314F; text-align: center; max-width: 480px; }
      a { color: #3B82F6; font-weight: bold; text-decoration: none; }
      .btn { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #2563EB; color: white; border-radius: 0.75rem; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>🚀 OmniStudy AI Server is Running</h2>
      <p>Redirecting to client application at port 3000...</p>
      <a class="btn" href="http://localhost:3000">Open OmniStudy AI (Port 3000)</a>
    </div>
  </body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`🚀 OmniStudy AI Server running on http://localhost:${PORT}`);
});
