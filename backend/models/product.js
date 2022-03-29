const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: String,
  richDescription: String,
  countInStock: Number,
  image: String,
});

module.exports = model('Product', productSchema);
