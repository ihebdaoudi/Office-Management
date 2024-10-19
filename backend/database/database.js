const mongoose = require('mongoose');
require('dotenv').config()

const connectionString = process.env.MONGODB_URL


mongoose.connect(connectionString)
.then(() => console.log('MongoDB connected successfully!'))
.catch((error) => console.error('MongoDB connection error:', error));