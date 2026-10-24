import mongoose from 'mongoose';

// Disable Mongoose global command buffering so operations NEVER hang or time out when DB is disconnected
mongoose.set('bufferCommands', false);

let isConnected = false;

export const isMongoConnected = () => isConnected && mongoose.connection.readyState === 1;

export const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/omnistudy';
    // Clean potential angle brackets left over from placeholders
    if (uri.includes('<') || uri.includes('>')) {
      uri = uri.replace(/<([^>]+)>/g, '$1');
    }
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`MongoDB Warning: ${error.message}. Running with In-Memory Mock Store.`);
    return false;
  }
};
