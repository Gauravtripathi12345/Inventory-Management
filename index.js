// const express = require('express');
import express from 'express';
import ProductController from './src/controllers/product.controller.js';

const server = express();

// create an instance of ProductController
const productController = new ProductController();

server.use(express.static('src/views'));
server.get('/', productController.getProducts);
// server.get('/', (req, res) => {
//     return res.send("Welcome to Inventory App");
// });


server.listen(3400, () => {
    console.log("Server is running at 3400");
});