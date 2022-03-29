const { Router } = require('express');
const Product = require('../models/product');

const router = Router();
const api = process.env.API_URL;

// call http://localhost:3000/api/v1/products

router.get(`${api}products`, async (req, res) => {
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

router.post(`${api}products`, (req, res) => {
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

router.delete(`${api}products`, (req, res) => {
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

router.put(`${api}products`, (req, res) => {
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

module.exports = router;
