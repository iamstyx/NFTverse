import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nftRoutes from './routes/nft.routes.js';
import profileRoutes from './routes/profile.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/nfts', nftRoutes);
app.use('/api/profiles', profileRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NFT Marketplace API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});