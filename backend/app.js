const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;
const MongoDb = process.env.MongoDb;

// middlewares
app.use(express.json());
app.use(morgan('tiny'));

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  richDescription: String,
  countInStock: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// call http://localhost:3000/api/v1/products
app.get(`${api}products`, async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json(productList);
  } catch (err) {
    res.status(500).json({
      error: err,
      ok: false,
    });
  }
});

app.post(`${api}products`, (req, res) => {
  const { name, richDescription, countInStock, image } = req.body;
  const product = new Product({
    name,
    richDescription,
    countInStock: +countInStock,
    image,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        ok: false,
      });
    });
});

app.delete(`${api}products`, (req, res) => {
  const id = req.body.id;
  Product.deleteOne({ _id: id })
    .then((deletedProduct) => {
      res.status(201).json(deletedProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        ok: false,
      });
    });
});

app.put(`${api}products`, (req, res) => {
  const { id, name, richDescription, countInStock, image } = req.body;
  Product.updateOne(
    { _id: id },
    {
      name,
      richDescription,
      countInStock: +countInStock,
      image,
    }
  )
    .then((updatedProduct) => {
      res.status(201).json(updatedProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        ok: false,
      });
    });
});

app.get('/', (req, res) => {
  res.send('API');
});

async function start() {
  try {
    await mongoose.connect(MongoDb);
    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
  } catch (error) {
    console.log(error);
  }
}

start();
