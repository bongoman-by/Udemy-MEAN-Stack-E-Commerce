const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const productRoutes = require('./routes/product');

const PORT = process.env.PORT || 3000;
const MongoDb = process.env.MongoDb;

// middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(productRoutes);

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
