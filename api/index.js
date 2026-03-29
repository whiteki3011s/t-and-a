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

if (!MONGODB_URI) {
  console.error("CRITICAL ERROR: MONGODB_URI is not defined in the environment.");
} else {
  // Connect to MongoDB
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Cinematic Cluster'))
    .catch(err => console.error('❌ Failed to connect to MongoDB', err));
}

// API Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, image } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = new Task({ title, image });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// VERCEL SERVERLESS ARCHITECTURE
// If we are strictly running locally, boot the server normally using app.listen()
// If we are running dynamically on Vercel's global CDN (production), skip the listen block. 
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local dev server running on http://localhost:${PORT}`);
  });
}

// EXPORT THE FRAMEWORK -> This is the magic key that allows Vercel to wrap this file as a global Serverless Function!
export default app;
