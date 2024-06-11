//backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://real-estate-listings-seven.vercel.app', 'https://a1ce-2402-3a80-401c-61ff-cfbe-f5f4-cb9d-8007.ngrok-free.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
