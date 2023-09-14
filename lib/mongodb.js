// lib/mongodb.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectMongoDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB connection disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to application termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

module.exports = { connectMongoDB };
