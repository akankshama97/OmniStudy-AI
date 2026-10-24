import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { isMongoConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../data');
const usersFile = path.resolve(dataDir, 'users.json');

const JWT_SECRET = process.env.JWT_SECRET || 'omnistudy_secret_key_2024';
const JWT_EXPIRES = '7d';

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  try { fs.mkdirSync(dataDir, { recursive: true }); } catch (e) {}
}

function loadLocalUsers() {
  try {
    if (fs.existsSync(usersFile)) {
      const data = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
      const map = new Map();
      for (const u of data) {
        map.set(u.id, u);
      }
      return map;
    }
  } catch (e) {}
  return new Map();
}

function saveLocalUsers(map) {
  try {
    const list = Array.from(map.values());
    fs.writeFileSync(usersFile, JSON.stringify(list, null, 2), 'utf8');
  } catch (e) {}
}

const memoryUsers = loadLocalUsers();
let memoryUserIdCounter = memoryUsers.size + 1;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Try MongoDB if connected
    if (isMongoConnected()) {
      try {
        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) return res.status(400).json({ error: 'Email already registered. Please login.' });
        const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
        const token = generateToken(user._id.toString());
        return res.status(201).json({
          success: true,
          token,
          user: { id: user._id, name: user.name, email: user.email }
        });
      } catch (dbErr) {
        console.warn('MongoDB register error, using resilient store:', dbErr.message);
      }
    }

    // Resilient local store fallback
    for (const [, u] of memoryUsers) {
      if (u.email === normalizedEmail) return res.status(400).json({ error: 'Email already registered. Please login.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const id = `user_${memoryUserIdCounter++}_${Date.now().toString(36)}`;
    const user = { id, name: name.trim(), email: normalizedEmail, password: hashedPassword };
    memoryUsers.set(id, user);
    saveLocalUsers(memoryUsers);

    const token = generateToken(id);
    return res.status(201).json({
      success: true,
      token,
      user: { id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('[OmniStudy Auth] Register error:', err);
    return res.status(500).json({ error: err.message || 'Registration failed.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Try MongoDB if connected
    if (isMongoConnected()) {
      try {
        const user = await User.findOne({ email: normalizedEmail });
        if (user) {
          const isMatch = await user.comparePassword(password);
          if (!isMatch) return res.status(401).json({ error: 'Invalid email or password.' });
          const token = generateToken(user._id.toString());
          return res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
          });
        }
      } catch (dbErr) {
        console.warn('MongoDB login error, checking resilient store:', dbErr.message);
      }
    }

    // Check resilient local store
    let found = null;
    for (const [, u] of memoryUsers) {
      if (u.email === normalizedEmail) { found = u; break; }
    }
    if (!found) return res.status(401).json({ error: 'Invalid email or password.' });
    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password.' });
    const token = generateToken(found.id);
    return res.json({
      success: true,
      token,
      user: { id: found.id, name: found.name, email: found.email }
    });
  } catch (err) {
    console.error('[OmniStudy Auth] Login error:', err);
    return res.status(500).json({ error: err.message || 'Login failed.' });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // If decoded.id is a valid MongoDB ObjectId and Mongo is connected
    if (isMongoConnected() && mongoose.Types.ObjectId.isValid(decoded.id)) {
      try {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          return res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
        }
      } catch (dbErr) {
        if (dbErr.name !== 'CastError') {
          console.warn('MongoDB getMe error, checking resilient store:', dbErr.message);
        }
      }
    }

    // Check resilient local memory store (for user_... string IDs)
    const user = memoryUsers.get(decoded.id);
    if (user) {
      return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    }

    // Secondary scan across memory store if id or email matches
    for (const [, u] of memoryUsers) {
      if (u.id === decoded.id || u.email === decoded.id) {
        return res.json({ success: true, user: { id: u.id, name: u.name, email: u.email } });
      }
    }

    return res.status(404).json({ error: 'User not found.' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
