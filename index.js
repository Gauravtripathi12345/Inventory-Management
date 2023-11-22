// const express = require('express');
import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
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