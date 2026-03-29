import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Task } from './models/Task.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

// --- SERVERLESS MONGODB CONNECTION MANAGER ---
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is missing in Vercel Dashboard!');
  }
  
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ Connected to MongoDB natively inside Serverless logic.');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    throw err;
  }
};

// --- API ROUTES ---
app.get('/api/tasks', async (req, res) => {
  try {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("GET Route Error:", error);
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    await connectDB();
    const { title, image } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = new Task({ title, image });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("POST Route Error:", error);
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("DELETE Route Error:", error);
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

// VERCEL SERVERLESS ARCHITECTURE
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local dev server running on http://localhost:${PORT}`);
  });
}

export default app;
