// routes/productRoutes.js
const express = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');

const router = express.Router();

console.log('productRoutes.js loaded');


// ===============================
// GET /products
// Public – get all products
// ===============================
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('seller', 'name email');

    res.json(products);
  } catch (err) {
    console.error('Error in GET /products:', err);
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// GET /products/my
// Protected – get products of logged-in user
// ===============================

router.get('/my', auth, async (req, res) => {
  try {
    console.log('GET /products/my hit for user:', req.user);

    const products = await Product.find({
      seller: req.user.id
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ===============================
// POST /products/add
// Protected – add product as logged-in user
// ===============================
// POST /products/add → add product AS logged-in user
// POST /products/add -> add product (AUTH REQUIRED)
router.post('/add', auth, async (req, res) => {
  try {
    const { cropName, price, quantity, description, imageUrl, category } = req.body;

    if (!cropName || !price || !quantity) {
      return res.status(400).json({
        message: 'cropName, price and quantity are required'
      });
    }

    const product = new Product({
      cropName,
      price,
      quantity,
      description,
      imageUrl,
      category,
      seller: req.user.id   // ✅ IMPORTANT FIX
    });

    await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      product
    });

  } catch (err) {
    console.error('Error in POST /products/add:', err);
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// PUT /products/:id
// Protected – update own product
// ===============================
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (err) {
    console.error('Error in PUT /products/:id:', err);
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// DELETE /products/:id
// Protected – delete own product
// ===============================
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await product.deleteOne();

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /products/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;