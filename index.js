// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');


const app = express();

// ---------- Middlewares ----------
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Log every request (for debugging)
app.use((req, res, next) => {
  console.log('REQUEST PATH:', req.method, req.url);
  next();
});

// ---------- Routes ----------
app.use('/api', healthRoutes);
app.use('/products', productRoutes);  // e.g. GET /products, POST /products/add
app.use('/users', userRoutes);       // e.g. POST /users/signup, /users/login

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AgriConnect backend running' });
});

// Optional: JSON 404 fallback
app.use((req, res) => {
  console.log('No route matched:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

// ---------- MongoDB Connection & Server Start ----------
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });