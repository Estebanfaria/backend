const express = require('express');
const app = express();
const ProductManager = require('./productManager');

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    const { limit } = req.query;
  
    try {
      const products = await productManager.getProducts();
      const result = limit ? products.slice(0, limit) : products;
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
  
    try {
      const product = await productManager.getProductById(Number(pid));
      if (product) {
        res.json(product);
      } else {
        res.status(404).send(`Product with id ${pid} not found`);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080');
  })