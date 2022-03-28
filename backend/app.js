const express = require('express');
const app = express();

require('dotenv/config');

const api = process.env.API_URL;

app.get('/', (req, res) => {
  res.send('API');
});

// call http://localhost:3000/api/v1/products
app.get(`${api}products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hare dresser',
    image: 'some_url',
  };
  res.send(product);
});

app.listen(3000, () => {
  console.log('server is working!');
});
