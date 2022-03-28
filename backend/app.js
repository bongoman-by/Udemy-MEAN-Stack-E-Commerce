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

// call http://localhost:3000/api/v1/products
app.get(`${api}products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hare dresser',
    image: 'some_url',
  };
  res.send(product);
});

app.post(`${api}products`, (req, res) => {
  const product = req.body;
  res.send(product);
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
