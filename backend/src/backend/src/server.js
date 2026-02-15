import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools-hub';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic Routes (will be expanded)
app.get('/', (req, res) => {
    res.json({ 
                 message: 'AI Tools Hub API',
          version: '1.0.0',
          status: 'running'
    });
});

// Tools Routes (placeholder)
app.get('/api/tools', (req, res) => {
    res.json({ 
                 message: 'Get all tools',
          data: []
    });
});

// News Routes (placeholder)
app.get('/api/news', (req, res) => {
    res.json({ 
                 message: 'Get latest AI news',
          data: []
    });
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
                 status: 'healthy',
          timestamp: new Date().toISOString()
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ 
                             error: err.message,
          message: 'Internal Server Error'
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ 
                             error: 'Not Found',
          message: 'This endpoint does not exist'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 AI Tools Hub API running on http://localhost:${PORT}`);
    console.log(`📊 MongoDB: ${MONGODB_URI}`);
});
