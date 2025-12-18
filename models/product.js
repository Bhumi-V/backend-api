// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true },
    price:    { type: Number, required: true },
    quantity: { type: Number, required: true },

    description: { type: String },
    imageUrl:    { type: String },

    category: { type: String, required: true },

    // seller who posted this product (User document)
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);



